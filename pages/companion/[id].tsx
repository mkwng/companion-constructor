import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Editor from "../../components/editor";
import Renderer from "../../components/renderer";
import { keysToCompanion } from "../../data/helpers";
import { Companion } from "../../data/types";
import { fetcher } from "../../lib/swr";

export default function CompanionDetails() {
	const router = useRouter();

	const { data, error } = useSWR(`/api/companion/${router.query.id}?format=keys`, fetcher);
	const [companion, setCompanion] = useState<Companion | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	console.log(data);

	useEffect(() => {
		if (!data?.pose) return null;
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
			<h1>{companion.name}</h1>
			<Renderer companion={companion} />
		</div>
	);
}
