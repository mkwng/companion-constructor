import { useEffect, useMemo, useState } from "react";
import Editor from "../components/editor";
import Renderer from "../components/renderer";
import { colors } from "../data/colors";
import { colorsRequired, colorToKey, companionToUrl, getRestrictions } from "../data/helpers";
import { randomCompanion, randomProperty } from "../data/random";
import { Companion, Restrictions } from "../data/types";

export default function Home() {
	const [companion, setCompanion] = useState<Companion | null>(null);

	useEffect(() => {
		setCompanion(randomCompanion());
	}, []);

	if (!companion) {
		return <>Loading..</>;
	}

	return (
		<div
			className={`min-h-screen bg-background-${colorToKey(
				companion.properties.background,
				colors.background
			)}`}
		>
			<div className="z-10 w-full fixed top-0 flex justify-between bg-white h-14 px-4">
				<button
					onClick={() => {
						setCompanion(randomCompanion());
					}}
				>
					Random Companion
				</button>
				<button
					onClick={() => {
						window.location.href = "/api/companion.png?" + companionToUrl(companion);
					}}
				>
					Permalink
				</button>
			</div>
			<div className="fixed top-14 w-screen z-0">
				<Renderer companion={companion} />
			</div>
			<div className="absolute top-14 w-full">
				{/* eslint-disable */}
				<img
					src="/attributes/pose1/00-background/bg-v_background.png"
					className="w-full max-h-2/3-screen opacity-0"
					aria-hidden="true"
				/>
				{/* eslint-enable */}
				<div className="bg-white rounded-t-lg">
					<Editor companionState={[companion, setCompanion]} />
				</div>
			</div>
		</div>
	);
}
