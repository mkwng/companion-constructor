import { Web3Provider } from "@ethersproject/providers";
import { Coupon } from "@prisma/client";
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

function CouponEditor() {
	const web3React = useWeb3React();
	const [web3, setWeb3] = useState<Web3>(null);
	const [latestOp, setLatestOp] = useLocalStorage("latest_op", "");
	const [latestConnector, setLatestConnector] = useLocalStorage("latest_connector", "");
	const { data, error, mutate } = useSWR(`/api/coupon`, fetcher);
	const [input, setInput] = useState("");

	const { coupons }: { coupons: Coupon[] } = data ? data : { coupons: [] };

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
			<button
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
			</button>
			<h1>Coupons</h1>
			{/* A table of all coupons */}
			<table className="w-full p-8 max-w-lg">
				<thead>
					<tr>
						<th>Coupon</th>
						<th>Used?</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{coupons?.map((coupon) => (
						<tr key={coupon.code}>
							<td>{coupon.code}</td>
							<td>{coupon.used ? "used" : "unused"}</td>
							<td className="flex">
								<div>
									<Button
										className="text-xs"
										onClick={() => {
											fetch(`/api/coupon/`, {
												method: "PUT",
												headers: {
													"Content-Type": "application/json",
												},
												body: JSON.stringify({
													code: coupon.code,
												}),
											}).then(() => mutate());
										}}
									>
										Toggle used
									</Button>
								</div>
								<div>
									<Button
										className="text-xs"
										onClick={() => {
											fetch(`/api/coupon/`, {
												method: "DELETE",
												headers: {
													"Content-Type": "application/json",
												},
												body: JSON.stringify({
													code: coupon.code,
												}),
											}).then(() => mutate());
										}}
									>
										Delete
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
				{/* Create coupon form */}
				<tfoot>
					<tr>
						<td colSpan={3}>
							<form
								className="flex"
								onSubmit={(e) => {
									e.preventDefault();
									let code: string | string[] = input;
									// If there is a comma in code...
									if (code.includes(",")) {
										// Split the code into an array
										code = code.split(",");
									}
									fetch(`/api/coupon/`, {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											code,
										}),
									}).then(() => {
										setInput("");
										mutate();
									});
								}}
							>
								<input
									type="text"
									name="code"
									placeholder="Coupon code"
									value={input}
									onChange={(e) => setInput(e.target.value)}
								/>
								<div>
									<Button className="text-xs" type="submit">
										Create coupon
									</Button>
								</div>
							</form>
						</td>
					</tr>
				</tfoot>
			</table>
		</>
	);
}
