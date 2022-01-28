import { Web3Provider } from "@ethersproject/providers";
import { Companion, Coupon, Transactions } from "@prisma/client";
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

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function WrapperHome() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<CouponEditor />
		</Web3ReactProvider>
	);
}

const TokenAssigner = ({ onSubmit }: { onSubmit: (input: number) => void }) => {
	const [input, setInput] = useState("");
	return (
		<>
			<form
				className="flex"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(parseInt(input));
				}}
			>
				<input
					className="w-24"
					type="text"
					name="code"
					placeholder="Token ID"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<div>
					<Button className="text-xs" type="submit">
						Assign TokenId
					</Button>
				</div>
			</form>
		</>
	);
};

function CouponEditor() {
	const web3React = useWeb3React();
	const [web3, setWeb3] = useState<Web3>(null);
	const [latestOp, setLatestOp] = useLocalStorage("latest_op", "");
	const [latestConnector, setLatestConnector] = useLocalStorage("latest_connector", "");
	const { data, error, mutate } = useSWR(`/api/companions`, fetcher);

	const { companions }: { companions: Companion[] } = data ? data : { companions: [] };

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
	return (
		<>
			<Button
				onClick={() => {
					fetch(`/api/checkIncompletes`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
					}).then((result) => {
						alert("done?");
						console.log(result);
					});
				}}
			>
				Update incompletes
			</Button>

			<div className=" grid grid-cols-12">
				{companions?.map((c) => (
					<div key={c.id} className="border border-gray-100">
						{/* eslint-disable */}
						<img src={`https://companioninabox.art/api/companion.png?tokenId=${c.tokenId}&iteration=${c.iteration || 0}`} />
						{/* eslint-enable */}
						<a href={`/admin/editor?admin=true&tokenId=${c.tokenId}`}>Edit #{c.tokenId}</a>
					</div>
				))}
			</div>
		</>
	);
}