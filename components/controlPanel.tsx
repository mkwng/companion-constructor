import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import { Companion } from "../data/types";
import useLocalStorage from "../hooks/useLocalStorage";
import { abi, contractAddress } from "./contract";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
const ConnectorNames = {
	Injected: "injected",
	WalletConnect: "walletconnect",
};
const W3Operations = {
	Connect: "connect",
	Disconnect: "disconnect",
};

export const ControlPanel = ({
	handleCustomize,
	handleRandomize,
	handleCompanionId,
}: {
	handleCustomize: () => void;
	handleRandomize: () => void;
	handleCompanionId: (companionId?: number) => void;
}) => {
	const [expanded, setExpanded] = useState<boolean>(true);
	const [activeSection, setActiveSection] = useState<"playground" | "myCompanions">(
		"playground"
	);
	const [latestOp, setLatestOp] = useLocalStorage("latest_op", "");
	const [latestConnector, setLatestConnector] = useLocalStorage("latest_connector", "");
	const web3React = useWeb3React();
	const { active, activate, error } = web3React;
	const [web3, setWeb3] = useState<Web3>(null);
	const [contract, setContract] = useState(null);

	const [ownedCompanions, setOwnedCompanions] = useState<Set<number>>(new Set());
	const [selected, setSelected] = useState<number | null>(null);

	useEffect(() => {
		if (active) {
			let w3 = new Web3(web3React.library.provider);
			setWeb3(w3);
			let c = new w3.eth.Contract(abi, contractAddress);
			setContract(c);
		} else {
			setOwnedCompanions(new Set());
			setContract(null);
		}
	}, [active, web3React]);

	useEffect(() => {
		let active = true;
		if (contract && contract.methods) {
			load();
			return () => {
				active = false;
			};
		}
		async function load() {
			const result = await contract.methods.balanceOf(web3React.account).call();
			if (result > 0) {
				const companionNums = [];
				for (let i = 0; i < result; i++) {
					const tokenId = await contract.methods
						.tokenOfOwnerByIndex(web3React.account, i)
						.call();
					companionNums.push(tokenId);
				}
				if (!active) {
					return;
				}
				setOwnedCompanions(new Set(companionNums));
			}
		}
	}, [contract, web3React]);

	useEffect(() => {
		if (ownedCompanions.size > 0) {
			setActiveSection("myCompanions");
		}
	}, [ownedCompanions]);

	useEffect(() => {
		if (window.outerWidth < 768) {
			setExpanded(false);
		}
	}, []);

	const handleCompanionClick = (id: number) => {
		setSelected(id);
		handleCompanionId(id);
	};

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
					{active ? (
						<>
							<p className="inline-block w-full overflow-ellipsis">{web3React.account}</p>
							<a
								href="#"
								onClick={() => {
									setContract(null);
									setLatestOp(W3Operations.Disconnect);
									web3React.deactivate();
								}}
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
							onClick={() => {
								setLatestConnector(ConnectorNames.Injected);
								setLatestOp(W3Operations.Connect);
								web3React.activate(injected);
							}}
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
							className={`
									relative flex-grow
									py-2 rounded-full
									text-center border-2
									${activeSection === "playground" ? "border-background-red" : "border-transparent text-gray-400"}
								`}
							onClick={() => setActiveSection("playground")}
						>
							Playground
						</button>
						<button
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
							onClick={() => setActiveSection("myCompanions")}
						>
							My companions
						</button>
					</div>
				</div>
				{activeSection === "playground" && (
					<div className="p-2 pt-0 flex flex-col justify-items-stretch gap-2">
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
												selected == tokenId
													? "border-hair-lightblue text-hair-lightblue"
													: "text-gray-400 border-gray-600 filter grayscale"
											}`}
											onClick={() => {
												handleCompanionClick(tokenId);
											}}
										>
											{/* eslint-disable */}
											<img
												src={`/api/face.png?id=${tokenId}`}
												alt={`Companion #${tokenId}`}
												className="w-full h-full"
											/>
											{/* eslint-enable */}
										</div>
									))}
								</div>
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
