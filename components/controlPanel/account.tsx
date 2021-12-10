export const LoggedIn = ({ account, handleSignOut }) => {
	return (
		<>
			<p className="inline-block w-full overflow-ellipsis">{account}</p>

			<a
				href="#"
				className={`
									relative
									mt-2 py-2 rounded-full
									text-center
									flex gap-2 justify-center items-center
									border-2 border-gray-600
								`}
				onClick={handleSignOut}
			>
				Sign out
			</a>
		</>
	);
};

export const LoggedOut = ({ handleConnectWallet }) => {
	return (
		<button
			className={`
            w-full
            flex justify-center items-center 
            border-clothing-black border-2 
            py-2 gap-2 rounded-full`}
			onClick={handleConnectWallet}
		>
			<span>Connect wallet</span>
			<span className="text-xs inline-block px-2 py-0.5 bg-clothing-black text-background-yellow rounded-full">
				soon
			</span>
		</button>
	);
};
