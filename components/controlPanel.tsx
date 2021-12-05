import { useEffect, useState } from "react";

export const ControlPanel = ({
	handleCustomize,
	handleRandomize,
}: {
	handleCustomize: () => void;
	handleRandomize: () => void;
}) => {
	const [expanded, setExpanded] = useState<boolean>(true);
	const [activeSection, setActiveSection] = useState<"playground" | "myCompanions">(
		"playground"
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
					<button
						className={`
								w-full
								flex justify-center items-center 
								border-clothing-black border-2 
								py-2 gap-2 rounded-full`}
					>
						<span>Connect wallet</span>
						<span className="text-xs inline-block px-2 py-0.5 bg-clothing-black text-background-yellow rounded-full">
							soon
						</span>
					</button>
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
						<div className="text-center mx-4 my-1">
							<h3 className="font-bold mb-2">You don&apos;t have any Companions yet!</h3>
							<p className="text-gray-400">
								When you own some Companions, they will show up here
							</p>
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
