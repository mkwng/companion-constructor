import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import Button from "../components/button";
import Editor from "../components/editor";
import Renderer from "../components/renderer";
import { colors } from "../data/colors";
import { colorToKey } from "../data/helpers";
import { randomCompanion } from "../data/random";
import { Companion } from "../data/types";

export default function Constructor() {
	const router = useRouter();
	const [companion, setCompanion] = useState<Companion | null>(null);
	const [customizing, setCustomizing] = useState<boolean>(false);
	const scrollableArea = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setCompanion(randomCompanion());
	}, []);

	if (!companion) {
		return <>Loading..</>;
	}

	return (
		<>
			<div
				ref={scrollableArea}
				className={`font-mono z-10 fixed inset-0 h-screen w-screen overflow-x-hidden ${
					customizing ? "lg:overflow-y-hidden" : ""
				}`}
			>
				{customizing ? (
					<>
						<div className="fixed z-10 space-x-2 left-0 top-0 p-4">
							<button
								className="m-2 py-3 px-6 transition-transform transform-gpu rounded-full text-lg font-semibold cursor-pointer border-4 border-transparent bg-hair-lightblue duration-75 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 border-black"
								onClick={() => {
									setCustomizing(false);
								}}
							>
								← Back
							</button>
						</div>
						{/* <button
							className="py-3 px-5 transition-transform transform-gpu rounded-full text-lg font-semibold cursor-pointer border-4 border-transparent bg-clothing-green duration-75 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 border-black"
							onClick={async () => {
								const response = await fetch("/api/companion", {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify(companion),
								});

								router.push(`/companion/${(await response.json()).id}`);
							}}
						>
							Mint
						</button> */}
						{/* <button
					onClick={() => {
						window.location.href = "/api/companion.png?" + companionToUrl(companion);
					}}
				>
					Permalink
				</button> */}
						<div className="absolute lg:fixed pt-14 lg:right-4 w-full lg:w-1/3 lg:pt-12 lg:h-full lg:pb-28">
							{/* eslint-disable */}
							<img
								src="/attributes/pose1/00-background/bg-v_background.png"
								className="w-full max-h-2/3-screen opacity-0 lg:hidden"
								aria-hidden="true"
							/>
							{/* eslint-enable */}
							<div className="bg-white rounded-t-xl min-h-full lg:rounded-xl lg:max-h-full lg:overflow-y-scroll hide-scrollbar shadow-medium">
								<Editor companionState={[companion, setCompanion]} />
							</div>
						</div>
					</>
				) : (
					<div className="fixed z-10 flex flex-wrap w-screen justify-center bottom-24 lg:bottom-24">
						<Button
							className="bg-hair-lightblue"
							onClick={() => {
								setCompanion(randomCompanion());
							}}
						>
							Randomize
						</Button>

						<Button
							className="bg-clothing-orange"
							onClick={() => {
								setCustomizing(true);
								scrollableArea.current?.scrollTo(0, 0);
							}}
						>
							Customize
						</Button>
					</div>
				)}
				<div className="h-screen pointer-events-none">&nbsp;</div>
				<div
					className={`transition-opacity duration-1000 relative z-30 min-h-screen w-screen -mt-16 p-2 md:px-8 lg:px-32 xl:px-64 ${
						customizing ? "pointer-events-none opacity-0 duration-75 " : ""
					}`}
				>
					<div className="w-full min-h-full bg-clothing-white rounded-xl shadow-2xl p-4">
						{" "}
						Hi
					</div>
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
						customizing ? "top-14 lg:w-2/3" : "pb-12 h-full w-screen"
					}`}
				>
					<Renderer showTitle={!customizing} companion={companion} />
				</div>
			</div>
		</>
	);
}
