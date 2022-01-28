import { Web3Provider } from "@ethersproject/providers";
import { Companion } from "@prisma/client";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Web3 from "web3";
import Button from "../../components/button";
import { ConnectButton } from "../../components/connectButton";
import { ownerAddress } from "../../components/contract";
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
	const web3React = useWeb3React();
	const [web3, setWeb3] = useState<Web3>(null);
	const [latestOp, setLatestOp] = useLocalStorage("latest_op", "");
	const [latestConnector, setLatestConnector] = useLocalStorage("latest_connector", "");
	const { data, error, mutate } = useSWR(`/api/companions`, fetcher);
	const [showNoToken, setShowNoToken] = useState(false);

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

	const companions = data?.filter((c) => {
		return showNoToken ? true : !isNaN(parseFloat(c.tokenId));
	});
	let prevTokenId = companions ? companions[companions?.length - 1].tokenId + 1 : 0;

	return (
		<>
			<div className="flex">
				<Button
					onClick={() => {
						setShowNoToken((prev) => !prev);
					}}
				>
					Show no tokens: {showNoToken ? "true" : "false"}
				</Button>
			</div>
			{prevTokenId && (
				<div className=" grid grid-cols-12">
					{companions?.map((c) => {
						let result;
						if (c.tokenId == prevTokenId - 1 || showNoToken) {
							result = (
								<div key={c.id} className="border border-gray-100">
									{/* eslint-disable */}
									<img src={`https://companioninabox.art/api/companion.png?id=${c.tokenId}&iteration=${c.iteration || 0}`} />
									{/* eslint-enable */}
									<a href={`/admin/editor?admin=true&tokenId=${c.tokenId}`}>Edit #{c.tokenId}</a>
								</div>
							);
						} else {
							const missingNumbers = [];
							for (let i = prevTokenId + 1; i > c.tokenId; i--) {
								missingNumbers.push(i);
							}
							result = (
								<>
									{missingNumbers.map((n) => (
										<div key={n}>
											{/* eslint-disable */}
											<img src={`https://companioninabox.art/box.png`} />
											{/* eslint-enable */}
											<a href={`/admin/editor?admin=true&tokenId=${n}`}>Edit #{n}</a>
										</div>
									))}
									<div key={c.id} className="border border-gray-100">
										{/* eslint-disable */}
										<img src={`https://companioninabox.art/api/companion.png?id=${c.tokenId}&iteration=${c.iteration || 0}`} />
										{/* eslint-enable */}
										<a href={`/admin/editor?admin=true&tokenId=${c.tokenId}`}>Edit #{c.tokenId}</a>
									</div>
								</>
							);
						}
						prevTokenId = c.tokenId || prevTokenId;
						return result;
					})}
				</div>
			)}
		</>
	);
}
