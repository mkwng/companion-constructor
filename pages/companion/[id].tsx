import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../../components/button";
import Editor from "../../components/editor";
import Renderer from "../../components/renderer";
import { keysToCompanion } from "../../data/helpers";
import { randomCompanion } from "../../data/random";
import { Companion } from "../../data/types";
import { fetcher } from "../../lib/swr";

export default function CompanionDetails() {
	const router = useRouter();

	const { data, error } = useSWR(`/api/companion/${router.query.id}?format=keys`, fetcher);
	const [companion, setCompanion] = useState<Companion | null>(null);
	const [showBg, setShowBg] = useState(true);
	console.log(data);

	useEffect(() => {
		if (!data?.pose) {
			setCompanion(randomCompanion(true));
			return;
		}
		const {
			id,
			createdAt,
			updatedAt,
			hairColors,
			headwearColors,
			eyewearColors,
			maskColors,
			topColors,
			bottomColors,
			shoesColors,
			...rest
		} = data;
		const colors: {
			[key in string]: string;
		} = {
			hair: hairColors,
			headwear: headwearColors,
			eyewear: eyewearColors,
			mask: maskColors,
			top: topColors,
			bottom: bottomColors,
			shoes: shoesColors,
		};
		for (const key of Object.keys(colors)) {
			// split colors string at commas, remove spaces, and convert to array
			if (!colors[key]) continue;
			const colorArray = [];
			colors[key].split(",").forEach((color) => {
				colorArray.push(color.trim());
			});
			if (colorArray.length) {
				colorArray.forEach((color, i) => {
					rest[`${key}Color${i + 1}`] = color;
				});
			}
		}

		setCompanion(keysToCompanion(rest));
	}, [data]);

	if (error || !data?.pose || !companion) return <div>failed to load</div>;
	return (
		<div>
			<Renderer companion={companion} hideBackground={!showBg} />
			<div className="flex m-8 gap-8">
				<Button onClick={() => setShowBg((prev) => !prev)}>Toggle background ({showBg ? "On" : "Off"})</Button>
				<Button onClick={() => setCompanion(randomCompanion())}>Random</Button>
			</div>
			<div className="bg-ui-black-default text-default-white">
				<Editor companionState={[companion, setCompanion]} />
			</div>
		</div>
	);
}
