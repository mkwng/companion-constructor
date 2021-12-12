import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import Button from "../components/button";
import { abi, contractAddress, priceCustomEth, priceEth } from "../components/contract";
import { ControlPanel } from "../components/controlPanel";
import Editor from "../components/editor";
import Marketing from "../components/marketing";
import { MintDialog } from "../components/mintDialog";
import Renderer from "../components/renderer";
import { StakeDialog } from "../components/stakeDialog";
import { colors } from "../data/colors";
import { colorToKey, companionToUrl, keysToCompanion, messageToSign } from "../data/helpers";
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

function Constructor() {
	// Web 3, contract & operations
	const web3React = useWeb3React();
	const [web3, setWeb3] = useState<Web3>(null);
	const [contract, setContract] = useState<Contract>(null);
	const [latestOp, setLatestOp] = useLocalStorage("latest_op", "");
	const [latestConnector, setLatestConnector] = useLocalStorage("latest_connector", "");

	// State & minting
	const [customizing, setCustomizing] = useState<boolean>(false);
	const [retrieving, setRetrieving] = useState(false);
	const [showMinter, setShowMinter] = useState(false);
	const [showStaker, setShowStaker] = useState(false);
	const [minting, setMinting] = useState(false);
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

	// Ref
	const scrollableArea = useRef<HTMLDivElement>(null);

	// Connect to web3 and get contract info
	useEffect(() => {
		if (web3React.active) {
			let w3 = new Web3(web3React.library.provider);
			setWeb3(w3);
			let c = new w3.eth.Contract(abi, contractAddress);
			setContract(c);
		} else {
			setContract(null);
		}
	}, [web3React.active, web3React]);

	// Retrieve owned companions
	const retrieveCompanions = (onSuccess?: () => void) => {
		setRetrieving(true);
		setOwnedCompanions(new Set());
		setSelectedCompanions([]);
		let isRunning = true;
		if (contract && contract.methods) {
			setTimeout(load, 5000);
			return () => {
				setRetrieving(false);
				isRunning = false;
			};
		} else {
			setRetrieving(false);
		}
		async function load() {
			const result = await contract.methods.balanceOf(web3React.account).call();
			if (result > 0) {
				const companionNums = [];
				for (let i = 0; i < result; i++) {
					const tokenId = await contract.methods
						.tokenOfOwnerByIndex(web3React.account, i)
						.call();
					companionNums.push(tokenId);
				}
				if (!isRunning) {
					return;
				}
				setOwnedCompanions(new Set(companionNums));
				onSuccess?.();
			}

			setRetrieving(false);
		}
	};
	useEffect(retrieveCompanions, [contract, web3React.account]);

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
		} else if (selectedCompanions.length == 0) {
			setCompanion(randomCompanion());
		} else {
			return;
		}
	}, [selectedCompanions]);

	const checkMintStatus = () => {
		if (txnHash && minting) {
			web3.eth.getTransaction(txnHash).then((result) => {
				if (result.transactionIndex) {
					verifyMint().then((result) => {
						setMinting(false);
						setShowMinter(false);

						if (result.error) {
							toast.error(result.error);
						} else {
							retrieveCompanions(() => {
								setSelectedCompanions([result.companionId]);
							});
							toast.success("Mint successful!");
						}
					});
				} else {
					setTimeout(checkMintStatus, 5000);
				}
			});
		} else {
			console.log("No hash/not minting");
		}
	};
	const verifyMint = async () => {
		if (txnHash && minting) {
			try {
				const request = await fetch("/api/mint", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						hash: txnHash,
						mintType,
						mintQty: mintType === "random" ? mintQty : 1,
						companion,
					}),
				});
				const response = await request.json();
				console.log(response);
				return response;
			} catch (error) {
				debugger;
			}
		} else {
			console.log("No hash/not minting");
			return false;
		}
	};
	useEffect(() => {
		checkMintStatus();
	}, [txnHash]);

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
	const handlePurchase = () => {};
	const handleConnectWallet = () => {
		setLatestConnector(ConnectorNames.Injected);
		setLatestOp(W3Operations.Connect);
		web3React.activate(injected);
	};
	const handleSignOut = () => {
		setContract(null);
		setLatestOp(W3Operations.Disconnect);
		web3React.deactivate();
	};
	const handleMint = async () => {
		setMinting(true);

		try {
			let encoded = contract.methods.mint(mintType == "custom" ? 1 : mintQty).encodeABI();
			const nonce = await web3.eth.getTransactionCount(web3React.account, "latest"); //get latest nonce
			const wei = parseInt(
				mintType == "custom"
					? web3.utils.toWei(priceCustomEth + "", "ether")
					: web3.utils.toWei(priceEth * mintQty + "", "ether")
			);

			let tx = {
				from: web3React.account,
				to: contractAddress,
				data: encoded,
				nonce: nonce + "",
				value: web3.utils.toHex(wei),
			};

			const hash = await web3React.library.provider.request({
				method: "eth_sendTransaction",
				params: [tx],
			});
			setTxnHash(hash);
		} catch (error) {
			setMinting(false);
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
				font-mono z-10 fixed inset-0 h-screen w-screen overflow-x-hidden ${
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
								ownedCompanions={ownedCompanions}
								selectedCompanions={selectedCompanions}
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
													onClick={handlePurchase}
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
								<div className="lg:pb-2">
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
				<div className="h-screen pointer-events-none">&nbsp;</div>
				<div
					className={`transform-gpu transition-opacity duration-1000 relative z-30 min-h-screen w-screen -mt-12 p-2 md:px-8 lg:px-16 xl:px-32 ${
						customizing ? "pointer-events-none opacity-0 duration-75 " : ""
					}`}
				>
					<Marketing />
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
					minting={minting}
					connected={!!web3React?.account}
				/>
			) : null}
			{showStaker ? (
				<StakeDialog
					handleClose={() => {
						setShowStaker(false);
					}}
					selectedCompanions={selectedCompanions}
				/>
			) : null}
			<ToastContainer position="bottom-left" />
		</>
	);
}
