import { useEffect, useState } from "react";
import Button from "../button";
import { LoggedIn, LoggedOut } from "./account";
import { MyCompanions } from "./myCompanions";
import { Playground } from "./playground";

export const ControlPanel = ({
	account,
	chainId,
	ownedCompanions,
	selectedCompanions,
	stakedCompanions,
	claimable,
	isEmpty,
	setSelectedCompanions,
	handleCustomize,
	handleStake,
	handleRandomize,
	handleCleanSlate,
	handleConnectWallet,
	handleSignOut,
	handleMint,
	handleUnstake,
	handleClaim,
	loading,
}: {
	account: string;
	chainId: number;
	ownedCompanions: Set<number>;
	selectedCompanions: number[];
	stakedCompanions: Set<number>;
	claimable: number;
	isEmpty: boolean;
	setSelectedCompanions: (ids?: number[]) => void;
	handleCustomize: () => void;
	handleStake: () => void;
	handleRandomize: () => void;
	handleCleanSlate: () => void;
	handleConnectWallet: () => void;
	handleSignOut: () => void;
	handleMint: () => void;
	handleUnstake: (tokenIds: number[]) => Promise<boolean>;
	handleClaim: (tokenIds: number[]) => Promise<boolean>;
	loading: boolean;
}) => {
	const [expanded, setExpanded] = useState<boolean>(true);
	const [activeSection, setActiveSection] = useState<"playground" | "myCompanions" | "staked">(
		ownedCompanions.size > 0 ? "myCompanions" : "playground"
	);
	const [selectedStakedCompanions, setSelectedStakedCompanions] = useState<number[]>([]);
	const [stakeLoading, setStakeLoading] = useState<boolean>(false);

	useEffect(() => {
		if (window.outerWidth < 768) {
			setExpanded(false);
		}
	}, []);

	useEffect(() => {
		if (selectedCompanions.length) {
			setActiveSection("myCompanions");
		}
	}, [selectedCompanions]);

	return (
		<>
			<div
				className="flex items-center justify-center px-2 h-12 md:h-8 bg-ui-black-darker"
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
			<div
				className={`transition-all duration-500 ease-out flex flex-col ${
					expanded ? "max-h-[calc(100vh-3rem)]" : "max-h-0"
				}`}
			>
				{/********************************************/}
				{/************ Account Management ************/}
				{/********************************************/}
				<div className="bg-background-yellow p-2 text-clothing-black">
					{account ? (
						<LoggedIn account={account} handleSignOut={handleSignOut} chainId={chainId} />
					) : (
						<LoggedOut handleConnectWallet={handleConnectWallet} />
					)}
				</div>

				{/********************************************/}
				{/************** Tab Navigation **************/}
				{/********************************************/}
				<div className="p-2">
					<div className="flex w-full rounded-full relative justify-items-stretch">
						<div className="absolute w-full h-full z-0 rounded-full border-ui-black-lightest border-2"></div>
						<div className={`${stakedCompanions.size > 0 && "w-1/3"}`}>
							<Button
								disabled={activeSection === "playground"}
								className={`overrflow-x-hidden overflow-ellipsis ${
									activeSection === "playground"
										? "border-background-red text-white opacity-100"
										: "border-transparent text-gray-400"
								}`}
								onClick={() => {
									setActiveSection("playground");
								}}
							>
								Playground
							</Button>
						</div>
						<div className={`${stakedCompanions.size > 0 && "w-1/3"}`}>
							<Button
								disabled={activeSection === "myCompanions"}
								className={`overrflow-x-hidden overflow-ellipsis ${
									activeSection === "myCompanions"
										? "border-background-red text-white opacity-100"
										: "border-transparent text-gray-400"
								}`}
								onClick={() => {
									handleCleanSlate();
									setActiveSection("myCompanions");
								}}
							>
								{stakedCompanions.size > 0 ? "Companions" : "My companions"}
							</Button>
						</div>

						{stakedCompanions.size > 0 ? (
							<div className={`${stakedCompanions.size > 0 && "w-1/3"}`}>
								<Button
									disabled={activeSection === "staked"}
									className={`overrflow-x-hidden overflow-ellipsis ${
										activeSection === "staked"
											? "border-background-red text-white opacity-100"
											: "border-transparent text-gray-400"
									}`}
									onClick={() => {
										handleCleanSlate();
										setSelectedStakedCompanions([]);
										setActiveSection("staked");
									}}
								>
									Staked
								</Button>
							</div>
						) : null}
					</div>
				</div>

				{/********************************************/}
				{/************ Account Management ************/}
				{/********************************************/}

				{activeSection === "playground" && (
					<Playground
						handleCustomize={handleCustomize}
						handleRandomize={handleRandomize}
						handleClearSelection={() => setSelectedCompanions([])}
						disabled={isEmpty || selectedCompanions.length > 0}
					/>
				)}

				{/********************************************/}
				{/****************** Content *****************/}
				{/********************************************/}
				<div className="overflow-x-hidden overflow-y-scroll hide-scrollbars">
					{activeSection === "myCompanions" && (
						<MyCompanions
							ownedCompanions={ownedCompanions}
							selectedCompanions={selectedCompanions}
							setSelectedCompanions={setSelectedCompanions}
							action1={{
								title: "Customize" + (selectedCompanions ? ` #${selectedCompanions}` : ""),
								action: handleCustomize,
								disabled: selectedCompanions.length !== 1,
							}}
							action2={{
								title: "Stake" + (selectedCompanions ? ` #${selectedCompanions}` : ""),
								action: handleStake,
								disabled: !selectedCompanions.length,
							}}
							loading={loading}
						/>
					)}

					{activeSection === "staked" && (
						<MyCompanions
							ownedCompanions={stakedCompanions}
							selectedCompanions={selectedStakedCompanions}
							setSelectedCompanions={setSelectedStakedCompanions}
							action1={{
								title: `Claim ${claimable} rewards`,
								action: async () => {
									setStakeLoading(true);
									if (await handleClaim(Array.from(stakedCompanions))) {
										alert("Claimed rewards!");
									}
									setStakeLoading(false);
								},
							}}
							action2={{
								title:
									"Unstake" + (selectedStakedCompanions ? ` #${selectedStakedCompanions}` : ""),
								action: async () => {
									setStakeLoading(true);
									if (await handleUnstake(selectedStakedCompanions)) {
										alert("Unstaked!");
									}
									setStakeLoading(false);
								},
								disabled: !selectedStakedCompanions.length,
							}}
							loading={stakeLoading}
						/>
					)}
				</div>

				{/********************************************/}
				{/**************** Mint Button ***************/}
				{/********************************************/}
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
