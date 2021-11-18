import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Editor from "../components/editor";
import Renderer from "../components/renderer";
import { colors } from "../data/colors";
import { colorToKey, companionToUrl } from "../data/helpers";
import { randomCompanion } from "../data/random";
import { Companion } from "../data/types";

export default function Home() {
	const router = useRouter();
	const [companion, setCompanion] = useState<Companion | null>(null);

	useEffect(() => {
		setCompanion(randomCompanion());
	}, []);

	if (!companion) {
		return <>Loading..</>;
	}

	return (
		<div
			className={`h-screen bg-background-${colorToKey(
				companion.properties.background,
				colors.background
			)}`}
		>
			<div className="z-10 w-full fixed top-0 lg:top-auto lg:bottom-0 flex justify-between p-6">
				<button
					className="py-3 px-5 transition-transform transform-gpu rounded-full text-lg font-semibold cursor-pointer border-4 border-transparent bg-clothing-orange duration-75 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 border-black"
					onClick={() => {
						setCompanion(randomCompanion());
					}}
				>
					Random Companion
				</button>
				<button
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
				</button>
				{/* <button
					onClick={() => {
						window.location.href = "/api/companion.png?" + companionToUrl(companion);
					}}
				>
					Permalink
				</button> */}
			</div>
			<div className="fixed left-0 top-14 lg:top-0 w-screen z-0 lg:w-2/3 lg:h-full lg:flex lg:justify-center">
				<Renderer companion={companion} />
			</div>
			<div className="absolute pt-14 lg:right-4 w-full lg:w-1/3 lg:pt-12 lg:h-full lg:pb-28">
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
		</div>
	);
}
