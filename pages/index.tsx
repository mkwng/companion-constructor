import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ControlPanel } from "../components/controlPanel";
import Editor from "../components/editor";
import Marketing from "../components/marketing";
import Renderer from "../components/renderer";
import { colors } from "../data/colors";
import { colorToKey, keysToCompanion } from "../data/helpers";
import { randomCompanion } from "../data/random";
import { Companion } from "../data/types";

function getLibrary(provider) {
	const library = new Web3Provider(provider);
	return library;
}

export default function WrapperHome() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Constructor />
		</Web3ReactProvider>
	);
}

function Constructor() {
	const [companion, setCompanion] = useState<Companion | null>(null);
	const [uneditedCompanion, setUneditedCompanion] = useState<Companion | null>(null);
	const [customizing, setCustomizing] = useState<boolean>(false);
	const [selectedCompanion, setSelectedCompanion] = useState<number | null>(null);
	const scrollableArea = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (selectedCompanion) {
			fetch(`/api/companion/${selectedCompanion}?format=keys`)
				.then((res) => {
					res.json().then((data) => {
						if (data.error) {
							return alert("Oops! Something went wrong. Please try again later.");
						}
						const fetchedCompanion = keysToCompanion(data);
						fetchedCompanion.name = `Companion #${selectedCompanion}`;
						setCompanion({ ...fetchedCompanion });
						scrollableArea.current?.scrollTo({ top: 0, behavior: "smooth" });
					});
				})
				.catch((error) => {
					console.error(error);
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
					customizing ? "overflow-y-hidden" : ""
				}`}
			>
				{!customizing ? (
					<div className="fixed z-0 left-1/2 w-full max-w-xl transform -translate-x-1/2 bottom-24 p-2 pt-0 flex flex-col justify-items-stretch gap-1 text-xs">
						<button
							className={`
									relative
									py-2 rounded-full
									text-center
									border-2 border-clothing-black
								`}
							onClick={() => {
								scrollableArea.current?.scrollTo({
									top: window.innerHeight - 96,
									behavior: "smooth",
								});
							}}
						>
							Learn more
						</button>
						<button
							className={`
									relative
									py-2 rounded-full
									flex justify-center items-center gap-2
									text-center
									bg-clothing-orange
									border-2 border-clothing-black
								`}
							onClick={() => {}}
						>
							<span>Mint</span>
							<span className="text-xs inline-block px-2 py-0.5 bg-clothing-black text-clothing-orange rounded-full">
								soon
							</span>
						</button>
					</div>
				) : null}
				<div
					className={`
					transition-all
					z-40 fixed flex flex-col 
					max-h-screen
					bottom-0
					lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:p-6 
					w-full lg:${customizing ? "w-1/3" : "w-1/4"} lg:h-full`}
				>
					<div
						className={`
						bg-clothing-black text-white 
						lg:rounded-lg 
						overflow-y-scroll hide-scrollbar 
						text-xs relative`}
					>
						<div className={`${customizing ? "hidden" : ""}`}>
							<ControlPanel
								handleCustomize={() => {
									setCustomizing(true);
									scrollableArea.current?.scrollTo({ top: 0, behavior: "smooth" });
								}}
								handleRandomize={() => {
									setCompanion(randomCompanion());
									scrollableArea.current?.scrollTo({ top: 0, behavior: "smooth" });
								}}
								handleCompanionId={setSelectedCompanion}
								uneditedCompanion={uneditedCompanion}
								handleClearUneditedCompanion={() => {
									setUneditedCompanion(null);
								}}
							/>
						</div>
						{customizing ? (
							<>
								<div className="fixed lg:sticky left-0 top-0 right-0 p-2 bg-clothing-black lg:bg-opacity-70 lg:backdrop-filter lg:backdrop-blur-sm shadow-md z-10">
									<div className="flex justify-between">
										<button
											className={`
												relative
												py-2 px-4 rounded-full
												text-center
												border-2 border-gray-600
											`}
											onClick={() => {
												if (selectedCompanion && uneditedCompanion) {
													if (confirm("Are you sure you want to discard your changes?")) {
														setCompanion(uneditedCompanion);
														setUneditedCompanion(null);
														setCustomizing(false);
													}
												} else {
													setCustomizing(false);
												}
											}}
										>
											{selectedCompanion ? "Cancel" : "← Back"}
										</button>
										{selectedCompanion !== null && (
											<button
												disabled={uneditedCompanion === null}
												className={`
													relative
													py-2 px-4 rounded-full
													text-center
													border-2 border-gray-600
													${uneditedCompanion === null ? "opacity-20" : ""}
												`}
												onClick={() => {}}
											>
												Purchase
											</button>
										)}
									</div>
								</div>
								<div className="lg:pb-2">
									<Editor
										companionState={[companion, setCompanion]}
										uneditedCompanionState={[uneditedCompanion, setUneditedCompanion]}
									/>
								</div>
							</>
						) : (
							<></>
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
						<Button className="bg-hair-lightblue" onClick={() => {}}>
							View on OpenSea
						</Button>
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
					className={`
					transition-all 
					fixed z-0 flex justify-center 
					w-screen left-0 lg:h-full
					overflow-hidden
					${customizing ? "lg:w-2/3 h-4/6" : "h-5/6"}`}
				>
					<Renderer showTitle={!customizing} companion={companion} hideBackground={true} />
				</div>
			</div>
			<ToastContainer position="bottom-left" autoClose={0} />
		</>
	);
}
