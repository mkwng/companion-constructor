import { useEffect, useMemo, useState } from "react";
import Colors from "../components/colors";
import Editor from "../components/editor";
import Renderer from "../components/renderer";
import { selectableAttributesArray } from "../data/attributes";
import { colors } from "../data/colors";
import {
	colorsRequired,
	colorToKey,
	companionToUrl,
	getRestrictions,
	isCompatible,
} from "../data/helpers";
import { randomCompanion, randomProperty } from "../data/random";
import { Companion, Pose, Restrictions } from "../data/types";

const findFirstIdenticalObject = (array: any[], object: any) => {
	for (let i = 0; i < array.length; i++) {
		if (JSON.stringify(array[i]) === JSON.stringify(object)) {
			return i;
		}
	}
	return -1;
};

export default function Home() {
	const [companion, setCompanion] = useState<Companion | null>(null);

	const companionRestrictions = useMemo<Restrictions[]>(
		() => getRestrictions(companion),
		[companion]
	);

	useEffect(() => {
		setCompanion(randomCompanion());
	}, []);

	const handleAttributeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		let color = companion.attributes[name]?.color || [];
		let requiredColors = colorsRequired(name, value);

		while (color.length < requiredColors) {
			color.push(randomProperty(colors.clothing));
		}

		setCompanion({
			...companion,
			attributes: {
				...companion.attributes,
				[name]: {
					name: value,
					color,
				},
			},
		});
	};

	const skinOptions = [];
	const hairOptions = [];
	const backgroundOptions = [];
	const clothingOptions = [];
	for (const key in colors.skin) {
		skinOptions.push(
			<option key={key} value={key}>
				{key}
			</option>
		);
	}
	for (const key in colors.hair) {
		hairOptions.push(
			<option key={key} value={key}>
				{key}
			</option>
		);
	}
	for (const key in colors.background) {
		backgroundOptions.push(
			<option key={key} value={key}>
				{key}
			</option>
		);
	}
	for (const key in colors.clothing) {
		clothingOptions.push(
			<option key={key} value={key}>
				{key}
			</option>
		);
	}

	if (!companion) {
		return <>Loading..</>;
	}

	return (
		<>
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
			<Renderer companion={companion} />
			<Editor companionState={[companion, setCompanion]} />
		</>
	);
}
