import Head from "next/head";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useSWR from "swr";
import Web3 from "web3";
import Button from "../../components/button";
import { ConnectButton } from "../../components/connectButton";
import { ownerAddress } from "../../components/contract";
import Editor from "../../components/editor";
import Renderer from "../../components/renderer";
import { colors } from "../../data/colors";
import { colorToKey, keysToCompanion, messageToSign } from "../../data/helpers";
import { randomCompanion } from "../../data/random";
import { Companion } from "../../data/types";
import useLocalStorage from "../../hooks/useLocalStorage";
import { fetcher } from "../../lib/swr";
import AdminMenu from "../../components/adminMenu";

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

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function WrapperHome() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<CompanionDetails />
		</Web3ReactProvider>
	);
}
function CompanionDetails() {
	const web3React = useWeb3React();
	const [web3, setWeb3] = useState<Web3>(null);
	const [latestOp, setLatestOp] = useLocalStorage("latest_op", "");
	const [latestConnector, setLatestConnector] = useLocalStorage("latest_connector", "");
	const router = useRouter();
	const [companion, setCompanion] = useState<Companion | null>(null);
	const [companionUnedited, setCompanionUnedited] = useState<Companion | null>(null);
	const [tokenId, setTokenId] = useState<number | null>(null);
	const { data, error } = useSWR(`/api/companion/${tokenId}?format=keys`, fetcher);
	const [name, setName] = useState("");
	const [saving, setSaving] = useState(false);
	const [hideBackground, setHideBackground] = useState(true);

	useEffect(() => {
		if (web3React.active) {
			let w3 = new Web3(web3React.library.provider);
			setWeb3(w3);
		} else {
		}
	}, [web3React.active]);

	useEffect(() => {
		if (latestOp == "connect" && latestConnector == "injected") {
			injected
				.isAuthorized()
				.then((isAuthorized) => {
					if (isAuthorized && !web3React.active && !web3React.error) {
						web3React.activate(injected);
					}
				})
				.catch(() => {});
		} else if (latestOp == "connect" && latestConnector == "walletconnect") {
			web3React.activate(wcConnector);
		}
	}, []);

	useEffect(() => {
		const queryToken = parseInt(Array.isArray(router.query.tokenId) ? router.query.tokenId[0] : router.query.tokenId);
		setTokenId(queryToken !== undefined && !isNaN(queryToken) ? queryToken : 25);
	}, [router.query.tokenId]);

	useEffect(() => {
		setCompanionUnedited(null);
		if (!data?.pose) {
			setCompanion(null);
			setName("");
		} else {
			const dataCom = keysToCompanion(data);
			setCompanion(dataCom);
			setName(dataCom.name || "");
		}
	}, [data]);

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

	const handleSave = async () => {
		setSaving(true);

		const signature = await web3.eth.personal.sign(messageToSign + "\n\nUpdate companion", web3React.account, "test");
		const result = await (
			await fetch(`/api/companion/admin/${tokenId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					companion: { ...companion, name: name },
					signature,
				}),
			})
		).json();

		if (result.error) {
			toast.error("Tell Michael: " + result.error);
		} else {
			setCompanionUnedited(null);
			toast.success("Saved!");
		}

		setSaving(false);
	};

	if (web3React.account !== ownerAddress) {
		return (
			<>
				Not authorized
				<div>
					<ConnectButton
						loginMessage="Check to see if you're the owner"
						className="border-default-white"
						account={web3React.account}
						handleLogout={handleSignOut}
						handleConnectInjected={handleConnectInjected}
						handleConnectWalletConnect={handleConnectWalletConnect}
					/>
				</div>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>[admin] Editor - Companion in a Box</title>
			</Head>
			<AdminMenu />
			<div className="bg-ui-black-darker grid grid-cols-5 font-mono text-sm">
				<div className="col-span-3 h-screen">
					<div
						className={`w-full h-full font-mono transition-colors bg-background-${
							companion ? colorToKey(companion?.properties.background, colors.background) : "sand"
						}`}
					>
						{companion ? (
							<div className="w-full h-full flex justify-center relative">
								<Renderer companion={companion} hideBackground={hideBackground} />
								<div className="absolute top-4 left-4">
									<Button
										onClick={() => {
											if (confirm("Are you sure? This will reset every attribute.")) {
												const random = randomCompanion();
												setCompanionUnedited(random);
												setCompanion(random);
											}
										}}
									>
										Random
									</Button>
								</div>
							</div>
						) : (
							<div className="w-full h-full flex justify-center items-center relative p-8">
								<Button
									onClick={() => {
										const random = randomCompanion();
										setCompanionUnedited(random);
										setCompanion(random);
									}}
								>
									Random
								</Button>
							</div>
						)}
					</div>
				</div>
				<div className="col-span-2 h-screen relative flex flex-col max-h-screen">
					<div className="fixed bottom-4 mx-2 text-lg right-4 left-[60%] pl-4 z-50">
						{router.query.admin === "true" ? (
							<Button
								onClick={() => {
									handleSave();
								}}
								loading={saving}
								disabled={!companionUnedited}
								className="text-default-white bg-default-red "
							>
								Save
							</Button>
						) : null}
					</div>
					<div className="flex m-4 gap-4 z-10 bg-ui-black-darker">
						<div>
							<Button
								className="border-ui-black-lightest text-default-white"
								disabled={tokenId <= 0 || saving}
								onClick={() => {
									if (companionUnedited) {
										if (confirm("You have unsaved changes. Are you sure you want to continue?")) {
											setTokenId((prev) => prev - 1);
										}
									} else {
										setTokenId((prev) => prev - 1);
									}
								}}
							>
								← Prev
							</Button>
						</div>
						<div className="grow relative">
							<span className="absolute text-ui-black-lightest opacity-50 left-2 z-10 h-full flex items-center">
								#{tokenId}
							</span>
							<input
								className="w-full pl-12 h-full"
								type="text"
								disabled={!companion || saving}
								value={name}
								onChange={(e) => setName(e.target.value)}
								onBlur={() => {
									if (!companionUnedited) {
										setCompanionUnedited(companion);
									}
									setCompanion((prev) => {
										return { ...prev, name: name };
									});
								}}
							/>
						</div>
						<div>
							<Button
								className="border-ui-black-lightest text-default-white"
								disabled={tokenId >= 8888 || saving}
								onClick={() => {
									if (companionUnedited) {
										if (confirm("You have unsaved changes. Are you sure you want to continue?")) {
											setTokenId((prev) => prev + 1);
										}
									} else {
										setTokenId((prev) => prev + 1);
									}
								}}
							>
								Next →
							</Button>
						</div>
					</div>
					<div className="bg-ui-black-default text-default-white max-h-[calc(100vh-144px)] overflow-y-scroll">
						{companion ? (
							<div>
								<Editor
									showRare={router.query.admin === "true"}
									companionState={[companion, setCompanion]}
									uneditedCompanionState={[companionUnedited, setCompanionUnedited]}
								/>
							</div>
						) : (
							<div className="w-full h-full flex justify-center items-center relative p-8">
								<p>
									Companion #{tokenId} does not exist yet. <br />
									<a
										href="#"
										className="underline pl-2"
										onClick={(e) => {
											e.preventDefault();
											const random = randomCompanion();
											setCompanionUnedited(random);
											setCompanion(random);
										}}
									>
										Start with a random one
									</a>
									.
								</p>
							</div>
						)}
					</div>
				</div>
				<ToastContainer position="bottom-left" />
			</div>
		</>
	);
}
