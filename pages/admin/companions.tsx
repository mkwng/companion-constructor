import Head from "next/head";
import { Web3Provider } from "@ethersproject/providers";
import { Companion } from "@prisma/client";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import Web3 from "web3";
import Button from "../../components/button";
import { ConnectButton } from "../../components/connectButton";
import { companionAddress, ownerAddress } from "../../components/contract";
import { messageToSign } from "../../data/helpers";
import { randomCompanion } from "../../data/random";
import useLocalStorage from "../../hooks/useLocalStorage";
import { fetcher } from "../../lib/swr";

const getTruncatedAddress = (address) => {
	if (address && address.startsWith("0x")) {
		return address.substr(0, 4) + "..." + address.substr(address.length - 4);
	}
	return address;
};

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

export default function WrapperHome() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Companions />
		</Web3ReactProvider>
	);
}

function Companions() {
	const router = useRouter();
	const web3React = useWeb3React();
	const [web3, setWeb3] = useState<Web3>(null);
	const [latestOp, setLatestOp] = useLocalStorage("latest_op", "");
	const [latestConnector, setLatestConnector] = useLocalStorage("latest_connector", "");
	const [skip, setSkip] = useState<number>(0);
	const [take, setTake] = useState<number>(144);
	const { data, error, mutate } = useSWR(`/api/companions?skip=${skip}&take=${take}`, fetcher);
	const [showNoToken, setShowNoToken] = useState(false);
	const [baseUrl, setBaseUrl] = useState("companioninabox.art");
	const [selectedCompanions, setSelectedCompanions] = useState<number[]>([]);

	useEffect(() => {
		setBaseUrl(Array.isArray(router.query.baseUrl) ? router.query.baseUrl[0] : router.query.baseUrl || "companioninabox.art");
	}, [router.query.baseUrl]);

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

	const handleSave = async (tokenId) => {
		const signature = await web3.eth.personal.sign(messageToSign + "\n\nUpdate companion", web3React.account, "test");
		const result = await (
			await fetch(`/api/companion/admin/${tokenId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					companion: randomCompanion(),
					signature,
				}),
			})
		).json();

		if (result.error) {
			toast.error("Tell Michael: " + result.error);
		} else {
			mutate();
			toast.success("inserted!");
		}
	};

	const handleDelete = async (companionId) => {
		const signature = await web3.eth.personal.sign(messageToSign + "\n\nUpdate companion", web3React.account, "test");
		const result = await (
			await fetch(`/api/companion/admin/${companionId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: companionId,
					signature,
				}),
			})
		).json();

		if (result.error) {
			toast.error("Tell Michael: " + result.error);
		} else {
			mutate();
			toast.success("deleted!");
		}
	};

	const CompanionGridItem = ({
		baseUrl,
		tokenId,
		iteration,
		checked,
		onCheck,
		noCompanion,
		companionId,
	}: {
		baseUrl?: string;
		tokenId: number;
		iteration?: number;
		checked: boolean;
		onCheck: (e: ChangeEvent<HTMLInputElement>) => void;
		noCompanion?: boolean;
		companionId?: number;
	}) => {
		return (
			<div className="border border-gray-100 p-1 text-xs">
				{/* eslint-disable */}
				<div className="relative">
					<img
						src={`https://${baseUrl || "companioninabox.art"}/${
							noCompanion ? "box.png" : `api/companion.png?id=${tokenId}&iteration=${iteration || 0}`
						}`}
					/>
					<div className="absolute top-0 left-0 p-1 m-1 text-xs bg-ui-black-default rounded-lg text-default-white">
						#{tokenId}
					</div>
					<div className="absolute top-0 right-0 p-1 m-1 text-xs">
						<input type="checkbox" onChange={onCheck} checked={checked} />
					</div>
				</div>
				{/* eslint-enable */}
				<a href={`/admin/editor?admin=true&tokenId=${tokenId}`}>Edit</a> | {""}
				<a href={`https://${baseUrl || "companioninabox.art"}/api/companion/${tokenId}`}>API</a>
				<br />
				<a href={`https://etherscan.io/token/0x13bd2ac3779cbbcb2ac874c33f1145dd71ce41ee?a=${tokenId}`}>Etherscan</a>
				<br />
				<a href={`https://api.opensea.io/api/v1/asset/${companionAddress}/${tokenId}/?force_update=true`}>OpenSea Refresh</a>
				<br />
				{noCompanion ? (
					<a
						className="text-red-600"
						href="#"
						onClick={(e) => {
							e.preventDefault();
							if (confirm("Are you sure you want to insert a random companion here?")) {
								handleSave(tokenId);
							}
						}}
					>
						Insert random
					</a>
				) : (
					<a
						className="text-red-600"
						href="#"
						onClick={(e) => {
							e.preventDefault();
							if (confirm("Are you sure you want to delete this companion?")) {
								handleDelete(companionId);
							}
						}}
					>
						Delete companion
					</a>
				)}
			</div>
		);
	};

	const Controls = () => {
		return (
			<>
				<div>
					<a
						href="#"
						onClick={() => {
							setSkip((prev) => Math.max(prev - take, 0));
						}}
					>
						←Prev
					</a>{" "}
					|{" "}
					<a
						href="#"
						onClick={() => {
							setSkip((prev) => prev + take);
						}}
					>
						Next→
					</a>
				</div>

				<div>
					<a href="#" onClick={() => setTake(48)}>
						48
					</a>{" "}
					|{" "}
					<a href="#" onClick={() => setTake(144)}>
						144
					</a>{" "}
					|{" "}
					<a href="#" onClick={() => setTake(432)}>
						432
					</a>
				</div>
			</>
		);
	};

	const companions: Companion[] = data?.length
		? data.filter((c) => {
				return showNoToken ? true : !isNaN(parseFloat(c.tokenId));
		  })
		: [];
	let prevTokenId = companions?.length ? companions[0].tokenId + 1 : 0;

	return (
		<>
			<Head>
				<title>[admin] Companions - Companion in a Box</title>
			</Head>
			<div className="flex">
				<Button
					onClick={() => {
						setShowNoToken((prev) => !prev);
					}}
				>
					Show no tokens: {showNoToken ? "true" : "false"}
				</Button>
			</div>
			<Controls />
			<div>
				{selectedCompanions.length} selected |{" "}
				<a
					href="#"
					onClick={() => {
						setSelectedCompanions([]);
					}}
				>
					Clear
				</a>
				{selectedCompanions.length > 0 && (
					<>
						{" "}
						|{" "}
						<a
							href="#"
							onClick={() => {
								if (confirm("Are you sure you want to insert randoms at these IDs?")) {
									for (let i = 0; i < selectedCompanions.length; i++) {
										handleSave(selectedCompanions[i]);
									}
									setSelectedCompanions([]);
								}
							}}
						>
							Insert random
						</a>
					</>
				)}
			</div>
			{prevTokenId && (
				<div className=" grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
					{companions?.map((c) => {
						let result;

						const missingNumbers = [];
						for (let i = prevTokenId - 1; i > c.tokenId; i--) {
							missingNumbers.push(i);
						}
						result = (
							<>
								{missingNumbers.map((n) => (
									<CompanionGridItem
										key={n}
										tokenId={n}
										baseUrl={baseUrl}
										checked={selectedCompanions.includes(n)}
										onCheck={(e) => {
											if (!e.target.checked) {
												setSelectedCompanions([
													...selectedCompanions.slice(0, selectedCompanions.indexOf(n)),
													...selectedCompanions.slice(selectedCompanions.indexOf(n) + 1),
												]);
											} else {
												setSelectedCompanions([...selectedCompanions, n]);
											}
										}}
										noCompanion={true}
										companionId={c.id}
									/>
								))}

								<CompanionGridItem
									key={c.tokenId}
									tokenId={c.tokenId}
									baseUrl={baseUrl}
									iteration={c.iteration}
									checked={selectedCompanions.includes(c.tokenId)}
									onCheck={(e) => {
										if (!e.target.checked) {
											setSelectedCompanions([
												...selectedCompanions.slice(0, selectedCompanions.indexOf(c.tokenId)),
												...selectedCompanions.slice(selectedCompanions.indexOf(c.tokenId) + 1),
											]);
										} else {
											setSelectedCompanions([...selectedCompanions, c.tokenId]);
										}
									}}
									companionId={c.id}
								/>
							</>
						);

						prevTokenId = c.tokenId || prevTokenId;
						return result;
					})}
				</div>
			)}
			<Controls />
		</>
	);
}
