import { useEffect, useState } from "react";
import { LoggedIn, LoggedOut } from "./account";
import { MyCompanions } from "./myCompanions";
import { Playground } from "./playground";

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
						<LoggedIn account={account} handleSignOut={handleSignOut} />
					) : (
						<LoggedOut handleConnectWallet={handleConnectWallet} />
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
					<Playground handleCustomize={handleCustomize} handleRandomize={handleRandomize} />
				)}

				{activeSection === "myCompanions" && (
					<MyCompanions
						ownedCompanions={ownedCompanions}
						selectedCompanion={selectedCompanion}
						setSelectedCompanion={setSelectedCompanion}
						handleCustomize={handleCustomize}
					/>
				)}
			</div>
		</>
	);
};
