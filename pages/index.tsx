import { Web3Provider } from "@ethersproject/providers";
import { Companion as PrismaCompanion } from "@prisma/client";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import Button from "../components/button";
import { CheckoutDialog } from "../components/checkoutDialog";
import {
	companionAbi,
	companionAddress,
	priceCustomEth,
	priceEth,
	farmAbi,
	farmAddress,
	shipAddress,
	shipAbi,
} from "../components/contract";
import { ControlPanel } from "../components/controlPanel";
import Editor from "../components/editor";
import { Spinner } from "../components/icons/spinner";
import Marketing from "../components/marketing";
import { MintDialog } from "../components/mintDialog";
import Renderer from "../components/renderer";
import { StakeDialog } from "../components/stakeDialog";
import { colors } from "../data/colors";
import { apiToKeys, colorToKey, keysToCompanion, messageToSign, zeroPad } from "../data/helpers";
import { randomCompanion } from "../data/random";
import { Companion } from "../data/types";
import useLocalStorage from "../hooks/useLocalStorage";

function getLibrary(provider) {
	const library = new Web3Provider(provider);
	return library;
}

const ConnectorNames = {
	Injected: "injected",
	WalletConnect: "walletconnect",
};
const W3Operations = {
	Connect: "connect",
	Disconnect: "disconnect",
};
const wcConnector = new WalletConnectConnector({
	infuraId: "517bf3874a6848e58f99fa38ccf9fce4",
});
const injected = new InjectedConnector({ supportedChainIds: [1, 4] });
const preferredChain = 1;

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function WrapperHome() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Constructor />
		</Web3ReactProvider>
	);
}

function Constructor() {
	/****************************************************************/
	/**************************** STATES ****************************/
	/****************************************************************/
	const router = useRouter();

	// Web 3, contract & operations
	const web3React = useWeb3React();
	const [web3, setWeb3] = useState<Web3>(null);
	const [loaded, setLoaded] = useState(false);
	const [companionContract, setCompanionContract] = useState<Contract>(null);
	const [farmContract, setFarmContract] = useState<Contract>(null);
	const [shipContract, setShipContract] = useState<Contract>(null);
	const [latestOp, setLatestOp] = useLocalStorage("latest_op", "");
	const [latestConnector, setLatestConnector] = useLocalStorage("latest_connector", "");

	// State & minting
	const [customizing, setCustomizing] = useState<boolean>(false);
	const [retrieving, setRetrieving] = useState(false);
	const [showMinter, setShowMinter] = useState(false);
	const [showStaker, setShowStaker] = useState(false);
	const [showCheckout, setShowCheckout] = useState(false);

	const [transacting, setTransacting] = useState(false);
	const [transactingMessage, setTransactingMessage] = useState("Confirm the transfer to continue...");
	const mintTypeState = useState<"custom" | "random">("custom");
	const mintQtyState = useState(1);
	const [mintType, setMintType] = mintTypeState;
	const [mintQty, setMintQty] = mintQtyState;

	// Companion
	const [companion, setCompanion] = useState<Companion>(null);
	const [uneditedCompanion, setUneditedCompanion] = useState<Companion | null>(null);

	// Wallet
	const [ownedCompanions, setOwnedCompanions] = useState<Set<number>>(new Set());
	const [selectedCompanions, setSelectedCompanions] = useState<number[]>([]);
	const [stakedCompanions, setStakedCompanions] = useState<Set<number>>(new Set());
	const [claimable, setClaimable] = useState<number>(0);
	const [coupon, setCoupon] = useState<string>(null);

	// Ref
	const scrollableArea = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setCoupon(Array.isArray(router.query.coupon) ? router.query.coupon[0] : router.query.coupon || "");
	}, [router.query.coupon]);

	/****************************************************************/
	/******************* WEB3 CONTRACT AND WALLET *******************/
	/****************************************************************/
	// Connect to web3 and get contract info
	useEffect(() => {
		if (web3React.active && web3React.chainId === preferredChain) {
			let w3 = new Web3(web3React.library.provider);
			setWeb3(w3);
			if (companionAddress) setCompanionContract(new w3.eth.Contract(companionAbi, companionAddress));
			if (farmAddress) setFarmContract(new w3.eth.Contract(farmAbi, farmAddress));
			if (shipAddress) setShipContract(new w3.eth.Contract(shipAbi, shipAddress));
		} else {
			setCompanionContract(null);
			setFarmContract(null);
			setShipContract(null);
		}
	}, [web3React.active]);

	useEffect(() => {
		if (latestOp == "connect" && latestConnector == "injected") {
			injected
				.isAuthorized()
				.then((isAuthorized) => {
					setLoaded(true);
					if (isAuthorized && !web3React.active && !web3React.error) {
						web3React.activate(injected);
					}
				})
				.catch(() => {
					setLoaded(true);
				});
		} else if (latestOp == "connect" && latestConnector == "walletconnect") {
			web3React.activate(wcConnector);
		}
	}, []);

	const handleConnectInjected = () => {
		setLatestConnector(ConnectorNames.Injected);
		setLatestOp(W3Operations.Connect);
		web3React.activate(injected);
	};
	const handleConnectWalletConnect = () => {
		setLatestConnector(ConnectorNames.WalletConnect);
		setLatestOp(W3Operations.Connect);
		web3React.activate(wcConnector);
	};
	const handleSignOut = () => {
		setLatestOp(W3Operations.Disconnect);
		web3React.deactivate();
	};

	/****************************************************************/
	/****************** STATE MANAGEMENT UTILITIES ******************/
	/****************************************************************/
	const zeroOutCompanions = () => {
		setOwnedCompanions(new Set());
		setStakedCompanions(new Set());
		setClaimable(0);
		setSelectedCompanions([]);
	};
	const handleCustomize = () => {
		setCustomizing(true);
		scrollableArea.current?.scrollTo({ top: 0, behavior: "smooth" });
	};
	const handleExitCustomization = () => {
		if (selectedCompanions.length == 1 && uneditedCompanion) {
			if (confirm("Are you sure you want to discard your changes?")) {
				setCompanion(uneditedCompanion);
				setUneditedCompanion(null);
				setCustomizing(false);
			}
		} else {
			setCustomizing(false);
		}
	};
	const handleRandomize = () => {
		setCompanion(randomCompanion());
		scrollableArea.current?.scrollTo({ top: 0, behavior: "smooth" });
	};
	const handleCleanSlate = () => {
		setUneditedCompanion(null);
	};
	useEffect(() => {
		if (showMinter && selectedCompanions.length) {
			setSelectedCompanions([]);
			setCompanion(randomCompanion());
		}
	}, [showMinter]);

	/****************************************************************/
	/******************* FETCHING FROM BLOCKCHAIN *******************/
	/****************************************************************/
	// Retrieve owned companions
	const retrieveCompanions = (onSuccess?: () => void) => {
		if (!web3React.account || !companionContract) {
			zeroOutCompanions();
			return;
		}
		setRetrieving(true);
		zeroOutCompanions();
		let isRunning = true;
		if (companionContract && companionContract.methods) {
			setTimeout(load, 5000);
			return () => {
				setRetrieving(false);
				isRunning = false;
			};
		} else {
			setRetrieving(false);
		}
		async function load() {
			// In wallet
			const result = await companionContract.methods.balanceOf(web3React.account).call();
			if (result > 0) {
				const tokenIdPromises = [];
				const companionNums = [];
				for (let i = 0; i < result; i++) {
					tokenIdPromises[i] = companionContract.methods.tokenOfOwnerByIndex(web3React.account, i).call();
				}

				const tokenIds = await Promise.all(tokenIdPromises);
				for (let i = 0; i < tokenIds.length; i++) {
					companionNums.push(tokenIds[i]);
				}
				if (!isRunning) {
					return;
				}
				setOwnedCompanions(new Set(companionNums));
				onSuccess?.();
			}

			// In range
			const stakedCompResult = farmContract ? await farmContract.methods.depositsOf(web3React.account).call() : [];
			if (stakedCompResult.length > 0) {
				setStakedCompanions(new Set(stakedCompResult));
			}

			const rewardsResult = farmContract
				? await farmContract.methods.calculateRewards(web3React.account, stakedCompResult).call()
				: [];
			setClaimable(
				rewardsResult.reduce((acc, cur) => {
					return acc + (parseInt(cur.substring(0, cur.length - zeroPad.length)) || 0);
				}, 0)
			);

			setRetrieving(false);
		}
	};
	useEffect(retrieveCompanions, [companionContract, farmContract, web3React.account]);

	/****************************************************************/
	/********************** FETCHING FROM API ***********************/
	/****************************************************************/
	// Handle when a new companion is selected
	const updateSelectedCompanion = () => {
		if (selectedCompanions.length == 1) {
			fetch(`/api/companion/${selectedCompanions[0]}?format=keys`)
				.then((res) => {
					res.json().then((data) => {
						if (data.error) {
							switch (data.error) {
								case "Companion not found":
									if (confirm("It looks like no companion was generated for this token. Generate a random one?")) {
										fillEmpty().then((result) => {
											result.json().then((data) => {
												if (data.error) {
													toast.error(data.error);
												} else {
													setCompanion(keysToCompanion(apiToKeys(data.companion as PrismaCompanion)));
												}
											});
										});
										return;
									} else {
										return toast.error(data.error);
									}
								default:
									return toast.error(data.error);
							}
						}
						const fetchedCompanion = keysToCompanion(data);
						fetchedCompanion.name = `Companion #${selectedCompanions[0]}`;
						setCompanion({ ...fetchedCompanion });
						scrollableArea.current?.scrollTo({ top: 0, behavior: "smooth" });
					});
				})
				.catch((error) => {
					console.error(error);
				});
		} else if (selectedCompanions.length == 0 && !showMinter) {
			setCompanion(randomCompanion());
		} else {
			return;
		}
	};
	const fillEmpty = async () => {
		const signature = await web3.eth.personal.sign(messageToSign + "\n\nGenerate random companion", web3React.account, "test");
		const request = await fetch(`/api/companion/${selectedCompanions[0]}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				type: "fillEmpty",
				signature,
				address: web3React.account,
			}),
		});
		return request;
	};
	useEffect(updateSelectedCompanion, [selectedCompanions]);

	/****************************************************************/
	/************************ WEB3 UTILITIES ************************/
	/****************************************************************/
	const verifyMint = async (hash: string) => {
		try {
			const request = await fetch("/api/mint", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					hash,
					mintType,
					mintQty: mintType === "random" ? mintQty : 1,
					companion,
				}),
			});
			return await request.json();
		} catch (error) {
			toast.error(error);
		}
	};
	const verifySpend = async ({ amount, currHash }: { amount: number; currHash?: string }) => {
		const signature = await web3.eth.personal.sign(
			messageToSign + "\n\nAmount: " + amount + " $CSHIP",
			web3React.account,
			"test"
		);
		setTransactingMessage("Verify that this is you...");
		const request = await fetch(`/api/companion/${selectedCompanions[0]}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				hash: currHash,
				type: "customize",
				companion,
				uneditedCompanion,
				signature,
				coupon,
				address: web3React.account,
			}),
		});
		return request;
	};
	const transactEth = async ({
		from,
		to,
		encodedData,
		value,
		onStart,
		onSuccess,
		onFailure,
	}: {
		from: string;
		to: string;
		encodedData: any;
		value?: string;
		onStart?: (hash: string) => void;
		onSuccess?: (hash: string) => void;
		onFailure?: (error?: any) => void;
	}): Promise<boolean> => {
		try {
			const hash = await web3React.library.provider.request({
				method: "eth_sendTransaction",
				params: [
					{
						from,
						to,
						data: encodedData,
						nonce: (await web3.eth.getTransactionCount(web3React.account, "latest")) + "",
						value: value ? (value.substring(0, 2) === "0x" ? value : "0x" + value) : undefined,
					},
				],
			});
			onStart?.(hash);
			let success = false;
			let time = 0;
			while (!success) {
				const result = await web3.eth.getTransaction(hash);
				success = !!result.blockNumber;
				if (!success) {
					if (time > 300000) {
						// 5 minutes
						onFailure?.("Transaction time out.");
						return false;
					}
					time += 5000;
					await timeout(5000);
				}
			}
			onSuccess?.(hash);
			return true;
		} catch (error) {
			onFailure?.(error);
		}
	};

	/****************************************************************/
	/*********************** WEB3 TRANSACTIONS **********************/
	/****************************************************************/
	const handleMint = async ({ onSuccess }: { onSuccess?: () => void }) => {
		setTransacting(true);

		const wei = parseInt(
			mintType == "custom" ? web3.utils.toWei(priceCustomEth + "", "ether") : web3.utils.toWei(priceEth * mintQty + "", "ether")
		);
		try {
			await transactEth({
				from: web3React.account,
				to: companionAddress,
				encodedData: companionContract.methods.mint(mintType == "custom" ? 1 : mintQty).encodeABI(),
				value: web3.utils.toHex(wei),
				onStart: (hash) => {
					fetch("/api/mint", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							hash,
							mintType,
							mintQty: mintType === "random" ? mintQty : 1,
							companion,
						}),
					});
				},
				onSuccess: (hash) => {
					verifyMint(hash).then(async (result) => {
						setTransacting(false);
						if (result.error) {
							return false;
						} else {
							onSuccess?.();
							retrieveCompanions(async () => {
								await timeout(500);
								setSelectedCompanions([result.companionIds[0]]);
							});
							return true;
						}
					});
				},
				onFailure: () => {
					setTransacting(false);
					toast.error("Transaction failed.");
				},
			});
		} catch (error) {
			setTransacting(false);
			toast.error(error);
		}
	};
	const handleApprove = async (tokenId: number): Promise<boolean> => {
		// Check if already approved
		const approvedAddress = await companionContract.methods.getApproved(tokenId).call();
		if (approvedAddress === farmAddress) {
			return true;
		}
		return await transactEth({
			from: web3React.account,
			to: companionAddress,
			encodedData: companionContract.methods.approve(farmAddress, tokenId).encodeABI(),
		});
	};
	const handleStake = async (tokenIds: number[]): Promise<boolean> => {
		return await transactEth({
			from: web3React.account,
			to: farmAddress,
			encodedData: farmContract.methods.deposit(tokenIds).encodeABI(),
		});
	};
	const handleClaim = async (tokenIds: number[]): Promise<boolean> => {
		return await transactEth({
			from: web3React.account,
			to: farmAddress,
			encodedData: farmContract.methods.withdraw(tokenIds).encodeABI(),
		});
	};
	const handleUnstake = async (tokenIds: number[]): Promise<boolean> => {
		return await transactEth({
			from: web3React.account,
			to: farmAddress,
			encodedData: farmContract.methods.withdraw(tokenIds).encodeABI(),
		});
	};

	const handleSpend = async ({ amount, onSuccess }: { amount: number; onSuccess: (response?: any) => void }) => {
		setTransacting(true);
		if (amount > 0) {
			return await transactEth({
				from: web3React.account,
				to: shipAddress,
				encodedData: shipContract.methods.transfer(farmAddress, web3.utils.toHex(amount + zeroPad)).encodeABI(),
				onSuccess: async (currHash) => {
					const response = await (await verifySpend({ amount, currHash })).json();
					if (response.error) {
						setTransacting(false);
						return toast.error(response.error);
					}
					setCustomizing(false);
					setTransacting(false);
					onSuccess(response);
				},
				onFailure: (error) => {
					setTransacting(false);
					toast.error(error);
				},
			});
		} else {
			const response = await (await verifySpend({ amount })).json();
			if (response.error) {
				setTransacting(false);
				return toast.error(response.error);
			}
			setCustomizing(false);
			setTransacting(false);
			onSuccess(response);
		}
	};

	return (
		<>
			{coupon && !customizing ? (
				<div className="font-mono text-xs z-30 top-0 left-0 right-0 absolute p-2 bg-ui-black-darker text-default-yellow text-center flex justify-center items-center">
					<div className="w-4 h-4"></div>
					<div className="grow text-center">
						Promotion applied: <strong>Free customization of your companion</strong>
					</div>
					<div>
						<Button
							className={`bg-ui-black-default text-default-white w-4 h-4 pl-0 pr-0 pt-0 pb-0 ${
								transacting ? "opacity-20" : ""
							}`}
							onClick={() => {
								if (confirm("Remove coupon from this session?")) setCoupon("");
							}}
						>
							×
						</Button>
					</div>
				</div>
			) : null}
			<div
				ref={scrollableArea}
				className={`
				scroll-smooth lg:snap-y lg:snap-proximity font-mono z-10 fixed inset-0 h-screen w-screen overflow-x-hidden ${
					customizing ? "overflow-y-hidden" : ""
				}`}
			>
				{!customizing ? (
					<div className="fixed z-0 left-1/2 w-full max-w-xl transform -translate-x-1/2 bottom-24 p-2 pt-0 flex flex-col justify-items-stretch gap-1 text-sm">
						<Button
							onClick={() => {
								scrollableArea.current?.scrollTo({
									top: window.innerHeight - 96,
									behavior: "smooth",
								});
							}}
						>
							Learn more
						</Button>
						<Button
							className={`bg-ui-orange-default border-ui-black-default`}
							onClick={() => {
								setShowMinter(true);
							}}
						>
							<span>Mint</span>
						</Button>
					</div>
				) : null}
				{!companion && (
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<div>
							<Button className="text-xs" onClick={() => setCompanion(randomCompanion())}>
								Generate random companion
							</Button>
						</div>
					</div>
				)}
				<div
					className={`
						transition-all
						z-40 fixed flex flex-col 
						max-h-screen
						bottom-0
						lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:p-6 ${coupon && "lg:pt-12"}
						w-full lg:${customizing ? "w-1/3" : "w-1/4"} lg:max-h-full
					`}
				>
					<div
						className={`
							bg-clothing-black text-white 
							lg:rounded-lg 
							overflow-y-scroll hide-scrollbar 
							text-xs relative
						`}
					>
						<div className={`${customizing ? "hidden" : ""}`}>
							<ControlPanel
								isEmpty={!companion}
								account={web3React.account}
								chainId={web3React.chainId}
								claimable={claimable}
								ownedCompanions={ownedCompanions}
								selectedCompanions={selectedCompanions}
								stakedCompanions={stakedCompanions}
								setSelectedCompanions={setSelectedCompanions}
								handleCustomize={handleCustomize}
								handleStake={() => {
									setShowStaker(true);
								}}
								handleRandomize={handleRandomize}
								handleCleanSlate={handleCleanSlate}
								handleConnectInjected={handleConnectInjected}
								handleConnectWalletConnect={handleConnectWalletConnect}
								handleSignOut={handleSignOut}
								handleMint={() => {
									setShowMinter(true);
								}}
								handleClaim={handleClaim}
								handleUnstake={handleUnstake}
								loading={retrieving}
							/>
						</div>
						{customizing ? (
							<>
								<div className="fixed lg:sticky left-0 top-0 right-0 p-2 bg-ui-black-darker z-40">
									<div className="flex justify-between">
										<div>
											<Button className="" onClick={handleExitCustomization}>
												{selectedCompanions.length ? "Cancel" : "← Done"}
											</Button>
										</div>
										{selectedCompanions.length ? (
											<div>
												<Button
													disabled={uneditedCompanion === null}
													loading={transacting}
													className={`${uneditedCompanion === null ? "opacity-20" : ""}`}
													onClick={() => setShowCheckout(true)}
												>
													Checkout
												</Button>
											</div>
										) : (
											<div>
												<Button
													className="bg-ui-orange-default"
													onClick={() => {
														setShowMinter(true);
														setCustomizing(false);
													}}
												>
													Mint
												</Button>
											</div>
										)}
									</div>
								</div>
								<div className={`lg:pb-2 ${transacting && "pointer-events-none"}`}>
									{transacting && (
										<div className="fixed inset-0 bg-ui-black-darker bg-opacity-90 z-50 flex flex-col justify-center items-center">
											<div className="relative w-12 h-12 transform scale-50">
												<Spinner />
											</div>
											<p className="text-default-white">{transactingMessage}</p>
										</div>
									)}
									<Editor
										companionState={[companion, setCompanion]}
										uneditedCompanionState={[uneditedCompanion, setUneditedCompanion]}
									/>
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</div>
				<div className="snap-center h-screen pointer-events-none">&nbsp;</div>
				<div
					className={`
					bg-gradient-to-b to-ui-black-darker via-ui-black-darker
					transform-gpu transition-opacity duration-1000 relative z-30 min-h-screen w-screen p-2 md:px-8 lg:px-16 xl:px-32 ${
						customizing ? "pointer-events-none opacity-0 duration-75 " : ""
					}`}
				>
					<Marketing
						handleScrollToBottom={() => {
							scrollableArea.current.scrollTo(0, scrollableArea.current.scrollHeight);
						}}
					/>
				</div>
			</div>
			<div
				className={`font-mono h-screen transition-colors bg-background-${
					companion ? colorToKey(companion?.properties.background, colors.background) : "sand"
				}`}
			>
				<div
					className={`
					transition-all 
					fixed z-0 flex justify-center 
					w-screen left-0 lg:h-full
					overflow-hidden
					${customizing ? "lg:w-2/3 h-4/6" : "h-5/6"}`}
				>
					{companion ? (
						<Renderer showTitle={!customizing} companion={companion} hideBackground={true} maxHeight={true} />
					) : null}
				</div>
			</div>
			{showMinter ? (
				<MintDialog
					companion={companion}
					handleClose={() => {
						setShowMinter(false);
					}}
					handleCustomize={() => {
						setShowMinter(false);
						handleCustomize();
					}}
					mintTypeState={mintTypeState}
					mintQtyState={mintQtyState}
					handleMint={handleMint}
					minting={transacting}
					saleIsActive={true}
					account={web3React?.account}
					handleConnectInjected={handleConnectInjected}
					handleConnectWalletConnect={handleConnectWalletConnect}
				/>
			) : null}
			{showStaker ? (
				<StakeDialog
					handleClose={() => {
						setShowStaker(false);
					}}
					handleApprove={handleApprove}
					handleStake={handleStake}
					selectedCompanions={selectedCompanions}
					onSuccess={() => {
						setShowStaker(false);
						retrieveCompanions();
					}}
				/>
			) : null}

			{showCheckout ? (
				<CheckoutDialog
					companion={companion}
					uneditedCompanion={uneditedCompanion}
					walletBalance={100}
					handleSpend={handleSpend}
					handleClose={() => setShowCheckout(false)}
					transacting={transacting}
					coupon={coupon}
					setCoupon={setCoupon}
				/>
			) : null}
			<ToastContainer position="bottom-left" />
		</>
	);
}
