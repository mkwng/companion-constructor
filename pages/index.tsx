import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import Web3 from "web3";
import Button from "../components/button";
import { abi, contractAddress } from "../components/contract";
import { ControlPanel } from "../components/controlPanel";
import Editor from "../components/editor";
import Marketing from "../components/marketing";
import Renderer from "../components/renderer";
import { colors } from "../data/colors";
import { colorToKey, keysToCompanion } from "../data/helpers";
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
	const web3React = useWeb3React();
	const { active, activate, error } = web3React;
	const [web3, setWeb3] = useState<Web3>(null);
	const [contract, setContract] = useState(null);
	const [latestOp, setLatestOp] = useLocalStorage("latest_op", "");
	const [latestConnector, setLatestConnector] = useLocalStorage("latest_connector", "");

	const [companion, setCompanion] = useState<Companion | null>(null);
	const [uneditedCompanion, setUneditedCompanion] = useState<Companion | null>(null);
	const [customizing, setCustomizing] = useState<boolean>(false);
	const [selectedCompanion, setSelectedCompanion] = useState<number | null>(null);
	const scrollableArea = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (active) {
			let w3 = new Web3(web3React.library.provider);
			setWeb3(w3);
			let c = new w3.eth.Contract(abi, contractAddress);
			setContract(c);
		} else {
			// setOwnedCompanions(new Set());
			setContract(null);
		}
	}, [active, web3React]);

	useEffect(() => {
		if (selectedCompanion) {
			fetch(`/api/companion/${selectedCompanion}?format=keys`)
				.then((res) => {
					res.json().then((data) => {
						if (data.error) {
							return alert("Oops! Something went wrong. Please try again later.");
						}
						const fetchedCompanion = keysToCompanion(data);
						fetchedCompanion.name = `Companion #${selectedCompanion}`;
						setCompanion({ ...fetchedCompanion });
						scrollableArea.current?.scrollTo({ top: 0, behavior: "smooth" });
					});
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setCompanion(randomCompanion());
		}
	}, [selectedCompanion]);

	if (!companion) {
		return <>Loading..</>;
	}

	const handleCustomize = () => {
		setCustomizing(true);
		scrollableArea.current?.scrollTo({ top: 0, behavior: "smooth" });
	};
	const handleExitCustomization = () => {
		if (selectedCompanion && uneditedCompanion) {
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
	const handleClearUneditedCompanion = () => {
		setUneditedCompanion(null);
	};
	const handlePurchase = () => {};
	const handleSaveToDatabase = async () => {
		const response = await fetch("/api/companion", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(companion),
		});
		console.log((await response.json()).id);
	};
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
							className=""
							onClick={() => {
								scrollableArea.current?.scrollTo({
									top: window.innerHeight - 96,
									behavior: "smooth",
								});
							}}
						>
							Learn more
						</Button>
						<Button className={`bg-clothing-orange border-clothing-black`} onClick={() => {}}>
							<span>Mint</span>
							<span className="text-xs inline-block px-2 py-0.5 bg-clothing-black text-clothing-orange rounded-full">
								soon
							</span>
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
						w-full lg:${customizing ? "w-1/3" : "w-1/4"} lg:h-full
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
								handleCustomize={handleCustomize}
								handleRandomize={handleRandomize}
								handleCompanionId={setSelectedCompanion}
								uneditedCompanion={uneditedCompanion}
								handleClearUneditedCompanion={handleClearUneditedCompanion}
								handleConnectWallet={handleConnectWallet}
								handleSignOut={handleSignOut}
								web3={web3}
								contract={contract}
								account={web3React.account}
							/>
						</div>
						{customizing ? (
							<>
								<div className="fixed lg:sticky left-0 top-0 right-0 p-2 bg-clothing-black lg:bg-opacity-70 lg:backdrop-filter lg:backdrop-blur-sm shadow-md z-10">
									<div className="flex justify-between">
										<Button className="" onClick={handleExitCustomization}>
											{selectedCompanion ? "Cancel" : "← Back"}
										</Button>
										{selectedCompanion !== null && (
											<Button
												disabled={uneditedCompanion === null}
												className={`${uneditedCompanion === null ? "opacity-20" : ""}`}
												onClick={handlePurchase}
											>
												Purchase
											</Button>
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
			<ToastContainer position="bottom-left" autoClose={0} />
		</>
	);
}
