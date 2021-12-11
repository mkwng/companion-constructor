import { useEffect, useState } from "react";
import Button from "../button";
import { LoggedIn, LoggedOut } from "./account";
import { MyCompanions } from "./myCompanions";
import { Playground } from "./playground";

export const ControlPanel = ({
	account,
	chainId,
	ownedCompanions,
	selectedCompanion,
	setSelectedCompanion,
	handleCustomize,
	handleRandomize,
	handleCleanSlate,
	handleConnectWallet,
	handleSignOut,
	handleMint,
	loading,
}: {
	account: string;
	chainId: number;
	ownedCompanions: Set<number>;
	selectedCompanion: number;
	setSelectedCompanion: (companionId?: number) => void;
	handleCustomize: () => void;
	handleRandomize: () => void;
	handleCleanSlate: () => void;
	handleConnectWallet: () => void;
	handleSignOut: () => void;
	handleMint: () => void;
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

	useEffect(() => {
		if (selectedCompanion) {
			setActiveSection("myCompanions");
		}
	}, [selectedCompanion]);

	return (
		<>
			<div
				className="flex items-center justify-center px-2 py-2 bg-ui-black-darker"
				onClick={() => {
					setExpanded((prev) => !prev);
				}}
			>
				<div className="w-4 h-4">
					<div
						className={`absolute w-4 h-4 rounded-full overflow-hidden pointer-events-none ${
							expanded ? "bg-yellow-400" : "bg-green-300"
						}`}
					></div>
					<a className="absolute w-4 h-4 opacity-100 lg:opacity-0 hover:opacity-100 flex justify-center items-center cursor-default active:bg-green-400">
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
						<LoggedIn account={account} handleSignOut={handleSignOut} chainId={chainId} />
					) : (
						<LoggedOut handleConnectWallet={handleConnectWallet} />
					)}
				</div>
				<div className="p-2">
					<div className="flex w-full rounded-full relative justify-items-stretch">
						<div className="absolute w-full h-full z-0 rounded-full border-ui-black-lightest border-2"></div>
						<Button
							disabled={activeSection === "playground"}
							className={
								activeSection === "playground"
									? "border-background-red text-white opacity-100"
									: "border-transparent text-gray-400"
							}
							onClick={() => {
								setActiveSection("playground");
							}}
						>
							Playground
						</Button>
						<Button
							disabled={activeSection === "myCompanions"}
							className={
								activeSection === "myCompanions"
									? "border-background-red text-white opacity-100"
									: "border-transparent text-gray-400"
							}
							onClick={() => {
								handleCleanSlate();
								setActiveSection("myCompanions");
							}}
						>
							My companions
						</Button>
					</div>
				</div>
				{activeSection === "playground" && (
					<Playground
						handleCustomize={handleCustomize}
						handleRandomize={handleRandomize}
						handleClearSelection={() => setSelectedCompanion(null)}
						companionSelected={selectedCompanion !== null}
					/>
				)}

				{activeSection === "myCompanions" && (
					<MyCompanions
						ownedCompanions={ownedCompanions}
						selectedCompanion={selectedCompanion}
						setSelectedCompanion={setSelectedCompanion}
						handleCustomize={handleCustomize}
						loading={loading}
					/>
				)}
				<div className="p-2 pt-0">
					<Button
						className={`bg-ui-orange-default border-ui-black-default`}
						onClick={handleMint}
					>
						<span>Mint</span>
					</Button>
				</div>
			</div>
		</>
	);
};
