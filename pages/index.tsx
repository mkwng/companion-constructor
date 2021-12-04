import { useEffect, useRef, useState } from "react";
import Button from "../components/button";
import Editor from "../components/editor";
import Marketing from "../components/marketing";
import MyCompanions from "../components/myCompanions";
import Renderer from "../components/renderer";
import { colors } from "../data/colors";
import { apiToKeys, colorToKey, keysToCompanion } from "../data/helpers";
import { randomCompanion } from "../data/random";
import { Companion } from "../data/types";

const ControlPanel = ({
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
	return (
		<>
			<div className="flex items-center p-2">
				<div
					className="w-4 h-4 rounded-full bg-background-yellow"
					onClick={() => {
						setExpanded((prev) => !prev);
					}}
				></div>
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
			</div>
		</>
	);
};

export default function Constructor() {
	const [companion, setCompanion] = useState<Companion | null>(null);
	const [connected, setConnected] = useState(false);
	const [customizing, setCustomizing] = useState<boolean>(false);
	const [selectedCompanion, setSelectedCompanion] = useState<number | null>(null);
	const scrollableArea = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (selectedCompanion) {
			fetch(`/api/companion/${selectedCompanion}`).then((res) => {
				res.json().then((data) => {
					const fetchedCompanion = keysToCompanion(apiToKeys(data));
					fetchedCompanion.name = `Companion #${selectedCompanion}`;
					setCompanion({ ...fetchedCompanion });
					scrollableArea.current?.scrollTo({ top: 0, behavior: "smooth" });
				});
			});
		} else {
			setCompanion(randomCompanion());
		}
	}, [selectedCompanion]);

	if (!companion) {
		return <>Loading..</>;
	}

	return (
		<>
			<div
				ref={scrollableArea}
				className={`
				font-mono z-10 fixed inset-0 h-screen w-screen overflow-x-hidden ${
					customizing ? "lg:overflow-y-hidden" : ""
				}`}
			>
				<div
					className={`
					transition-all
					z-40 absolute lg:fixed flex flex-col 
					right-0 top-0 p-4 
					w-full lg:${customizing ? "w-1/3" : "w-1/4"} lg:h-full`}
				>
					<div className={`bg-clothing-black text-white rounded-xl overflow-y-scroll text-xs `}>
						{customizing ? (
							<>
								<div className="p-2">
									<button
										className={`
									relative
									py-2 px-4 rounded-full
									text-center
									border-2 border-gray-600
								`}
										onClick={() => setCustomizing(false)}
									>
										← Cancel
									</button>
								</div>
								<div className="py-2">
									<Editor companionState={[companion, setCompanion]} />
								</div>
							</>
						) : (
							<ControlPanel
								handleCustomize={() => setCustomizing(true)}
								handleRandomize={() => setCompanion(randomCompanion())}
							/>
						)}
					</div>
				</div>
				<div className="h-screen pointer-events-none">&nbsp;</div>
				<div
					className={`transform-gpu transition-opacity duration-1000 relative z-30 min-h-screen w-screen -mt-12 p-2 md:px-8 lg:px-16 xl:px-32 ${
						customizing ? "pointer-events-none opacity-0 duration-75 " : ""
					}`}
				>
					{/* <div className="w-full min-h-full bg-clothing-white rounded-xl shadow-2xl px-4 lg:px-8 py-16 max-w-6xl mx-auto text-lg grid-cols-1 md:grid-cols-5 items-center mb-8 flex justify-center">
						<Button className="bg-hair-lightblue">View on OpenSea</Button>
						<Button
							className="bg-hair-yellow"
							onClick={async () => {
								const response = await fetch("/api/companion", {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify(companion),
								});
								console.log((await response.json()).id);
							}}
						>
							Save
						</Button>
						<a href={`/api/companion.png?faceOnly=true&${companionToUrl(companion)}`}>Link</a>
					</div> */}
					<Marketing />
				</div>
			</div>
			<div
				className={`font-mono h-screen transition-colors bg-background-${colorToKey(
					companion.properties.background,
					colors.background
				)}`}
			>
				<div
					className={`transition-all fixed w-screen z-0 lg:h-full flex justify-center left-0 lg:top-0 ${
						customizing ? "top-14 lg:w-2/3" : "pb-24 h-full w-screen"
					}`}
				>
					<Renderer showTitle={!customizing} companion={companion} hideBackground={true} />
				</div>
			</div>
		</>
	);
}
