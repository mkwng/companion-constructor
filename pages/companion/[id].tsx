import { useRouter } from "next/dist/client/router";
import { useEffect, useMemo } from "react";
import useSWR from "swr";
import Renderer from "../../components/renderer";
import { colors } from "../../data/colors";
import { keysToCompanion } from "../../data/helpers";
import { Companion, Pose } from "../../data/types";
import { fetcher } from "../../lib/swr";

export default function CompanionDetails() {
	const router = useRouter();
	const { data, error } = useSWR(`/api/companion/${router.query.id}`, fetcher);
	const companion = useMemo<Companion | null>(() => {
		if (!data || error) return null;
		console.log(data);
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

		return keysToCompanion(rest);
	}, [data]);
	useEffect(() => {
		console.log(data);
	}, [data]);
	if (error) return <div>failed to load</div>;
	return (
		<div>
			<h1>Companion</h1>
			<Renderer companion={companion} />
			{data && <div>{JSON.stringify(companion)}</div>}
		</div>
	);
}
