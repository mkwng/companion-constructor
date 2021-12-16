import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { BigNumber } from "ethers";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import Button from "../components/button";
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
import Marketing from "../components/marketing";
import { MintDialog } from "../components/mintDialog";
import Renderer from "../components/renderer";
import { StakeDialog } from "../components/stakeDialog";
import { colors } from "../data/colors";
import {
	calcCustomizationCost,
	colorToKey,
	keysToCompanion,
	messageToSign,
	zeroPad,
} from "../data/helpers";
import { randomCompanion } from "../data/random";
import { Companion } from "../data/types";
import useLocalStorage from "../hooks/useLocalStorage";

function getLibrary(provider) {
	const library = new Web3Provider(provider);
	return library;
}

export default function WrapperHome() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Constructor />
		</Web3ReactProvider>
	);
}

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

const ConnectorNames = {
	Injected: "injected",
	WalletConnect: "walletconnect",
};
const W3Operations = {
	Connect: "connect",
	Disconnect: "disconnect",
};

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function Constructor() {
	/****************************************************************/
	/**************************** STATES ****************************/
	/****************************************************************/
	// Web 3, contract & operations
	const web3React = useWeb3React();
	const [web3, setWeb3] = useState<Web3>(null);
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

	const [transacting, setTransacting] = useState(false);
	const [txnHash, setTxnHash] = useState(null);
	const mintTypeState = useState<"custom" | "random">("custom");
	const mintQtyState = useState(1);
	const [mintType, setMintType] = mintTypeState;
	const [mintQty, setMintQty] = mintQtyState;

	// Companion
	const [companion, setCompanion] = useState<Companion | null>(null);
	const [uneditedCompanion, setUneditedCompanion] = useState<Companion | null>(null);

	// Wallet
	const [ownedCompanions, setOwnedCompanions] = useState<Set<number>>(new Set());
	const [selectedCompanions, setSelectedCompanions] = useState<number[]>([]);
	const [stakedCompanions, setStakedCompanions] = useState<Set<number>>(new Set());
	const [claimable, setClaimable] = useState<number>(0);

	// Ref
	const scrollableArea = useRef<HTMLDivElement>(null);

	/****************************************************************/
	/******************* WEB3 CONTRACT AND WALLET *******************/
	/****************************************************************/
	// Connect to web3 and get contract info
	useEffect(() => {
		if (web3React.active) {
			let w3 = new Web3(web3React.library.provider);
			setWeb3(w3);
			setCompanionContract(new w3.eth.Contract(companionAbi, companionAddress));
			setFarmContract(new w3.eth.Contract(farmAbi, farmAddress));
			setShipContract(new w3.eth.Contract(shipAbi, shipAddress));
		} else {
			setCompanionContract(null);
		}
	}, [web3React.active, web3React]);

	const handleConnectWallet = () => {
		setLatestConnector(ConnectorNames.Injected);
		setLatestOp(W3Operations.Connect);
		web3React.activate(injected);
	};
	const handleSignOut = () => {
		setCompanionContract(null);
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

	/****************************************************************/
	/******************* FETCHING FROM BLOCKCHAIN *******************/
	/****************************************************************/
	// Retrieve owned companions
	const retrieveCompanions = (onSuccess?: () => void) => {
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
					tokenIdPromises[i] = companionContract.methods
						.tokenOfOwnerByIndex(web3React.account, i)
						.call();
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
			const stakedCompResult = await farmContract.methods.depositsOf(web3React.account).call();
			if (stakedCompResult.length > 0) {
				setStakedCompanions(new Set(stakedCompResult));
			}

			const rewardsResult = await farmContract.methods
				.calculateRewards(web3React.account, stakedCompResult)
				.call();
			setClaimable(
				rewardsResult.reduce((acc, cur) => {
					console.log(acc);
					return acc + parseInt(cur.substring(0, cur.length - zeroPad.length));
				}, 0)
			);

			setRetrieving(false);
		}
	};
	useEffect(retrieveCompanions, [companionContract, web3React.account]);

	/****************************************************************/
	/********************** FETCHING FROM API ***********************/
	/****************************************************************/
	// Handle when a new companion is selected
	useEffect(() => {
		if (selectedCompanions.length == 1) {
			fetch(`/api/companion/${selectedCompanions[0]}?format=keys`)
				.then((res) => {
					res.json().then((data) => {
						if (data.error) {
							return alert("Oops! Something went wrong. Please try again later.");
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
	}, [selectedCompanions]);

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
	const verifySpend = async (hash: string) => {
		const signature = await web3.eth.personal.sign(
			messageToSign +
				"\n\nAmount: " +
				calcCustomizationCost(uneditedCompanion, companion) +
				" $CSHIP",
			web3React.account,
			"test"
		);
		const request = await fetch(`/api/companion/${selectedCompanions[0]}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				hash,
				companion,
				uneditedCompanion,
				signature,
				address: web3React.account,
			}),
		});
		console.log(request);
		return request;
	};
	const transactEth = async ({
		from,
		to,
		encodedData,
		value,
		onSuccess,
		onFailure,
	}: {
		from: string;
		to: string;
		encodedData: any;
		value?: string;
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
						value,
					},
				],
			});
			let success = false;
			let time = 0;
			while (!success) {
				const result = await web3.eth.getTransaction(hash);
				debugger;
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
			mintType == "custom"
				? web3.utils.toWei(priceCustomEth + "", "ether")
				: web3.utils.toWei(priceEth * mintQty + "", "ether")
		);
		try {
			await transactEth({
				from: web3React.account,
				to: companionAddress,
				encodedData: companionContract.methods
					.mint(mintType == "custom" ? 1 : mintQty)
					.encodeABI(),
				value: web3.utils.toHex(wei),
				onSuccess: (hash) => {
					verifyMint(hash).then((result) => {
						setTransacting(false);
						onSuccess?.();

						if (result.error) {
							return false;
						} else {
							retrieveCompanions(() => {
								setSelectedCompanions([result.companionId]);
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
	const handleSign = async () => {
		try {
			const signature = await web3.eth.personal.sign(messageToSign, web3React.account, "test");
			const response = await (
				await fetch(`/api/sign?address=${web3React.account}&signature=${signature}`)
			).json();
			if (response.error) {
				return toast(response.error, {
					type: "error",
				});
			}
			return toast("Signed!", {
				type: "success",
			});
		} catch (error) {
			return toast(error, {
				type: "error",
			});
		}
	};
	const handleApprove = async (tokenId: number): Promise<boolean> => {
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

	const handleSpend = async (amount: string) => {
		let currentHash;
		shipContract.methods
			.transfer(farmAddress, web3.utils.toHex(amount))
			.send({
				from: web3React.account,
			})
			.on("transactionHash", (hash) => {
				currentHash = hash;
			})
			.on("receipt", () => {
				verifySpend(currentHash).then(async (result) => {
					console.log(await result.json());
				});
			});
	};

	if (!companion) {
		return (
			<>
				<div className="absolute animate-spin w-12 h-12 left-1/2 top-1/2 -ml-6 -mt-6">
					<svg
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill={`rgb(${colors.clothing.orange.r},${colors.clothing.orange.g},${colors.clothing.orange.b})`}
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="12" cy="12" r="3"></circle>
						<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
					</svg>
				</div>
			</>
		);
	}

	return (
		<>
			<div
				ref={scrollableArea}
				className={`
				scroll-smooth lg:snap-y lg:snap-proximity font-mono z-10 fixed inset-0 h-screen w-screen overflow-x-hidden ${
					customizing ? "overflow-y-hidden" : ""
				}`}
			>
				{!customizing ? (
					<div className="fixed z-0 left-1/2 w-full max-w-xl transform -translate-x-1/2 bottom-24 p-2 pt-0 flex flex-col justify-items-stretch gap-1 text-xs">
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
								if (selectedCompanions.length) {
									setSelectedCompanions([]);
								}
								setShowMinter(true);
							}}
						>
							<span>Mint</span>
						</Button>
					</div>
				) : null}
				<div
					className={`
						transition-all
						z-40 fixed flex flex-col 
						max-h-screen
						bottom-0
						lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:p-6 
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
								handleConnectWallet={handleConnectWallet}
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
								<div className="fixed lg:sticky left-0 top-0 right-0 p-2 bg-ui-black-darker z-10">
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
													className={`${uneditedCompanion === null ? "opacity-20" : ""}`}
													onClick={() => {
														handleSpend(
															calcCustomizationCost(uneditedCompanion, companion) + zeroPad
														);
													}}
												>
													Checkout ({calcCustomizationCost(uneditedCompanion, companion)}{" "}
													$CSHIP)
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
								<div className="lg:pb-2">
									<Editor
										// disabled={!transacting}
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
				className={`font-mono h-screen transition-colors bg-background-${colorToKey(
					companion.properties.background,
					colors.background
				)}`}
			>
				<div
					className={`
					transition-all 
					fixed z-0 flex justify-center 
					w-screen left-0 lg:h-full
					overflow-hidden
					${customizing ? "lg:w-2/3 h-4/6" : "h-5/6"}`}
				>
					<Renderer showTitle={!customizing} companion={companion} hideBackground={true} />
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
					handleConnectWallet={handleConnectWallet}
					mintTypeState={mintTypeState}
					mintQtyState={mintQtyState}
					handleMint={handleMint}
					minting={transacting}
					connected={!!web3React?.account}
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
			<ToastContainer position="bottom-left" />
		</>
	);
}
