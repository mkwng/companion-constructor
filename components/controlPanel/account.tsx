import Button from "../button";

const getTruncatedAddress = (address) => {
	if (address && address.startsWith("0x")) {
		return address.substr(0, 4) + "..." + address.substr(address.length - 4);
	}
	return address;
};

export const LoggedIn = ({ account, handleSignOut, chainId }) => {
	const AccountName = () => {
		if (chainId === 1) {
			return <></>;
		}
		if (chainId === 4) {
			return (
				<>
					<div>
						<h4>Notice</h4>You&apos;re currently on a testnet. Things won&apos;t work correctly.
					</div>
				</>
			);
		}
		return (
			<>
				<div>
					<h4>Notice</h4>You&apos;re on an unsupported network. Things won&apos;t work
					correctly.
				</div>
			</>
		);
	};
	return (
		<>
			{/* <div className="inline-block w-full overflow-ellipsis">
				<AccountName />
			</div> */}

			<Button className={`w-full`} onClick={handleSignOut}>
				Sign out of {getTruncatedAddress(account)}
			</Button>
		</>
	);
};

export const LoggedOut = ({ handleConnectWallet }) => {
	return (
		<Button className={`w-full`} onClick={handleConnectWallet}>
			<span>Connect wallet</span>
		</Button>
	);
};
