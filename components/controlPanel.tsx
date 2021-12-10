import { useEffect, useState } from "react";

export const ControlPanel = ({
	account,
	ownedCompanions,
	selectedCompanion,
	setSelectedCompanion,
	handleCustomize,
	handleRandomize,
	handleCleanSlate,
	handleConnectWallet,
	handleSignOut,
	loading,
}: {
	account: string;
	ownedCompanions: Set<number>;
	selectedCompanion: number;
	setSelectedCompanion: (companionId?: number) => void;
	handleCustomize: () => void;
	handleRandomize: () => void;
	handleCleanSlate: () => void;
	handleConnectWallet: () => void;
	handleSignOut: () => void;
	loading: boolean;
}) => {
	const [expanded, setExpanded] = useState<boolean>(true);
	const [activeSection, setActiveSection] = useState<"playground" | "myCompanions">(
		ownedCompanions.size > 0 ? "myCompanions" : "playground"
	);

	useEffect(() => {
		if (window.outerWidth < 768) {
			setExpanded(false);
		}
	}, []);

	return (
		<>
			<div
				className="flex items-center justify-center p-4"
				onClick={() => {
					setExpanded((prev) => !prev);
				}}
			>
				<div className="w-5 h-5">
					<div
						className={`absolute w-5 h-5 rounded-full pointer-events-none ${
							expanded ? "bg-yellow-400" : "bg-green-300"
						}`}
					></div>
					<a className="absolute w-5 h-5 opacity-100 lg:opacity-0 hover:opacity-100 flex justify-center items-center cursor-default active:bg-green-400">
						<div
							className={`pointer-events-none absolute w-2 h-0.5 ${
								expanded ? "bg-yellow-600" : "bg-green-500"
							}`}
						></div>
						{!expanded && (
							<div className="pointer-events-none absolute w-0.5 h-2 bg-green-500"></div>
						)}
					</a>
				</div>
				<div className="text-center flex-grow text-gray-500">Control panel</div>
				<div className="w-4 h-4">&nbsp;</div>
			</div>
			<div className={`${expanded ? "" : "hidden"}`}>
				<div className="bg-background-yellow p-2 text-clothing-black">
					{account ? (
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
					) : (
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
					)}
				</div>
				<div className="p-2">
					<div className="flex w-full rounded-full relative">
						<div className="absolute w-full h-full z-0 rounded-full border-gray-600 border-2"></div>
						<button
							disabled={activeSection === "playground"}
							className={`
									relative flex-grow
									py-2 rounded-full
									text-center border-2
									${activeSection === "playground" ? "border-background-red" : "border-transparent text-gray-400"}
								`}
							onClick={() => {
								if (selectedCompanion) {
									setSelectedCompanion(null);
									handleRandomize();
									setActiveSection("playground");
								} else {
									setActiveSection("playground");
								}
							}}
						>
							Playground
						</button>
						<button
							disabled={activeSection === "myCompanions"}
							className={`
									relative flex-grow
									py-2 rounded-full
									text-center border-2
									${
										activeSection === "myCompanions"
											? "border-background-red"
											: "border-transparent text-gray-400"
									}
								`}
							onClick={() => {
								handleCleanSlate();
								setActiveSection("myCompanions");
							}}
						>
							My companions
						</button>
					</div>
				</div>
				{activeSection === "playground" && (
					<div className="p-2 pl-3 pt-0 ">
						<div className="pl-2 border-l-4 border-background-sand flex flex-col justify-items-stretch gap-2">
							<button
								className={`
									relative
									py-2 rounded-full
									text-center
									border-2 border-gray-600
								`}
								onClick={handleCustomize}
							>
								Customize
							</button>
							<button
								className={`
									relative
									py-2 rounded-full
									text-center
									border-2 border-gray-600
								`}
								onClick={handleRandomize}
							>
								Randomize
							</button>
						</div>
					</div>
				)}

				{activeSection === "myCompanions" && (
					<div className="p-4 pt-0 flex flex-col justify-items-stretch gap-2">
						<div className="text-center my-2">
							{ownedCompanions.size === 0 ? (
								<>
									<h3 className="font-bold mb-2">You don&apos;t have any Companions yet!</h3>
									<p className="text-gray-400">
										When you own some Companions, they will show up here
									</p>
								</>
							) : (
								<>
									<div className="flex justify-start items-center gap-2">
										{Array.from(ownedCompanions).map((tokenId) => (
											<div
												key={tokenId}
												className={`
											w-16 h-16 lg:w-12 lg:h-12 xl:w-16 xl:h-16
											flex justify-center items-center 
											font-semibold 
											cursor-pointer 
											rounded-full overflow-hidden
											border-2 border-transparent 
											${
												selectedCompanion == tokenId
													? "border-hair-lightblue text-hair-lightblue"
													: "text-gray-400 border-gray-600 filter grayscale"
											}`}
												onClick={() => {
													setSelectedCompanion(tokenId);
												}}
											>
												{/* eslint-disable */}
												<img
													src={`https://railway.companioninabox.art/api/companion.png?faceOnly=true&id=${tokenId}`}
													alt={`Companion #${tokenId}`}
													className="w-full h-full"
												/>
												{/* eslint-enable */}
											</div>
										))}
									</div>

									<div className="mt-4 pl-2 border-l-4 border-background-sand flex flex-col justify-items-stretch gap-2">
										<button
											disabled={selectedCompanion === null}
											className={`
											relative
											py-2 rounded-full
											text-center
											flex gap-2 justify-center items-center
											border-2 border-gray-600 ${selectedCompanion === null ? "opacity-20" : ""}
										`}
											onClick={() => {
												handleCustomize();
											}}
										>
											<span>Customize</span>
										</button>

										<button
											disabled={selectedCompanion === null}
											className={`
											relative
											py-2 rounded-full
											text-center
											flex gap-2 justify-center items-center
											border-2 border-gray-600  ${selectedCompanion === null ? "opacity-20" : ""}
										`}
											onClick={() => {}}
										>
											<span>Stake this companion</span>
										</button>
									</div>
								</>
							)}
						</div>
						<button
							className={`
									relative
									py-2 rounded-full
									text-center
									flex gap-2 justify-center items-center
									border-2 border-gray-600
								`}
							onClick={() => {}}
						>
							<span>Mint</span>
							<span className="text-xs inline-block px-2 py-0.5 text-clothing-black bg-background-yellow rounded-full">
								soon
							</span>
						</button>
					</div>
				)}
			</div>
		</>
	);
};
