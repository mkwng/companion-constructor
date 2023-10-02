import Head from "next/head";
import { Web3Provider } from "@ethersproject/providers";
import { Coupon, Transactions } from "@prisma/client";
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
import AdminMenu from "../../components/adminMenu";

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
	const { data, error, mutate } = useSWR(`/api/transactions`, fetcher);

	const { transactions }: { transactions: Transactions[] } = data ? data : { transactions: [] };
	console.log(transactions[0]);

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
			<Head>
				<title>[admin] Transactions - Companion in a Box</title>
			</Head>
			<AdminMenu />
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
			<h1>Transactions</h1>
			<table className="w-full p-8 max-w-lg">
				<thead>
					<tr>
						<th>User</th>
						<th>Hash</th>
						<th>Time</th>
						<th>Type</th>
						<th>Value</th>
						<th>CompanionId</th>
						<th>Complete</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{transactions?.map((txn) => (
						<tr key={txn.hash}>
							<td>
								{getTruncatedAddress(txn.userWallet)}{" "}
								<a
									href="#"
									className="text-xs"
									onClick={() => {
										// Copy to clipboard
										navigator.clipboard.writeText(txn.userWallet);
									}}
								>
									Copy
								</a>
							</td>
							<td>
								{getTruncatedAddress(txn.hash)}{" "}
								<a
									href="#"
									className="text-xs"
									onClick={() => {
										// Copy to clipboard
										navigator.clipboard.writeText(txn.hash);
									}}
								>
									Copy
								</a>
							</td>
							<td>{txn.date.toLocaleString()}</td>
							<td>{txn.txnType}</td>
							<td>{parseInt(txn.txnValue) / 1000000000000000000}</td>
							<td>{txn.companionId}</td>
							<td>{txn.complete ? "true" : "false"}</td>
							<td className="flex">
								<div>
									<Button
										className="text-xs"
										onClick={() => {
											fetch(`/api/transactions/`, {
												method: "PUT",
												headers: {
													"Content-Type": "application/json",
												},
												body: JSON.stringify({
													hash: txn.hash,
												}),
											}).then(() => mutate());
										}}
									>
										Toggle complete
									</Button>
								</div>
								<div>
									<Button
										className="text-xs"
										onClick={() => {
											fetch(`/api/transactions/`, {
												method: "DELETE",
												headers: {
													"Content-Type": "application/json",
												},
												body: JSON.stringify({
													hash: txn.hash,
												}),
											}).then(() => mutate());
										}}
									>
										Delete
									</Button>
								</div>
								<div>
									{txn.companionId && (
										<TokenAssigner
											onSubmit={(tokenId) => {
												console.log(txn.companionId, tokenId);
												fetch(`/api/assignTokenToCompanion`, {
													method: "PUT",
													headers: {
														"Content-Type": "application/json",
													},
													body: JSON.stringify({
														companionId: txn.companionId,
														tokenId,
													}),
												}).then(async (result) => {
													const resultData = await result.json();
													alert(resultData.message);
												});
											}}
										/>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
