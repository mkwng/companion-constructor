import { useState } from "react";
import Button from "./button";
import { Metamask } from "./icons/metamask";
import { WalletConnect } from "./icons/walletConnect";

const preferredNetwork = 4;

const getTruncatedAddress = (address) => {
	if (address && address.startsWith("0x")) {
		return address.substr(0, 4) + "..." + address.substr(address.length - 4);
	}
	return address;
};

export function ConnectButton({
	account,
	handleLogout,
	handleConnectInjected,
	handleConnectWalletConnect,
	className,
	loginMessage,
}: {
	account: string;
	handleLogout: () => void;
	handleConnectInjected: () => void;
	handleConnectWalletConnect: () => void;
	className?: string;
	loginMessage?: string;
}) {
	const [expanded, setExpanded] = useState(false);

	function Unconnected() {
		return (
			<>
				<Button
					className="bg-default-yellow h-9 text-ui-black-darker"
					onClick={() => {
						setExpanded(false);
						handleConnectInjected();
					}}
				>
					<span className="absolute h-full left-3 top-1">
						<Metamask />
					</span>
					<div>Metamask</div>
				</Button>
				<Button
					className="bg-default-yellow h-9 text-ui-black-darker"
					onClick={() => {
						setExpanded(false);
						handleConnectWalletConnect();
					}}
				>
					<span className="absolute h-full left-3 top-1">
						<WalletConnect />
					</span>
					<div>WalletConnect</div>
				</Button>
			</>
		);
	}
	function Connected() {
		return (
			<>
				<Button
					className="bg-default-yellow text-ui-black-darker"
					onClick={() => {
						setExpanded(false);
						handleLogout();
					}}
				>
					Disconnect
				</Button>
			</>
		);
	}
	return (
		<div className="relative z-20">
			<div className="cursor-pointer">
				<Button
					className={
						className
							? className
							: `bg-default-yellow ${expanded && "bg-ui-black-default bg-opacity-20"}`
					}
					onClick={() => {
						setExpanded((prev) => !prev);
					}}
					onBlur={() => {
						setTimeout(() => setExpanded(false), 500);
					}}
				>
					{account
						? "Manage " + getTruncatedAddress(account)
						: loginMessage || "Connect your wallet"}{" "}
					{expanded ? "▼" : "▶"}
				</Button>

				{expanded ? (
					<div className="absolute w-full flex flex-col gap-1 py-1">
						{!account ? <Unconnected /> : <Connected />}
					</div>
				) : null}
			</div>
		</div>
	);
}
