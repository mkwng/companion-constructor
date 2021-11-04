import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Renderer from "../components/renderer";
import { blemish, blemishVariants } from "../data/attributes/blemish";
import { brows } from "../data/attributes/brows";
import { eyes } from "../data/attributes/eyes";
import { eyewear } from "../data/attributes/eyewear";
import { hair } from "../data/attributes/hair";
import { headwear } from "../data/attributes/headwear";
import { mouth } from "../data/attributes/mouth";
import { nose } from "../data/attributes/nose";
import { colors } from "../data/colors";
import { companionExample } from "../data/example";
import { AttributeDictionary, RGBColor } from "../data/types";

const attributes: AttributeDictionary[] = [
	blemish,
	hair,
	eyes,
	brows,
	mouth,
	eyewear,
	headwear,
	nose,
];

export default function Home() {
	const [companion, setCompanion] = useState(companionExample);

	const handleAttributeChange = (e) => {
		const { name, value } = e.target;
		setCompanion({
			...companion,
			attributes: {
				...companion.attributes,
				[name]: {
					name: value,
				},
			},
		});
	};

	const handlePropertyChange = (e) => {
		const { name, value } = e.target;
		setCompanion({
			...companion,
			properties: {
				...companion.properties,
				[name]: value,
			},
		});
	};

	const handleColorChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setCompanion({
			...companion,
			properties: {
				...companion.properties,
				[name]: colors[name][value],
			},
		});
	};
	const colorToKey = (color: RGBColor, name: string): string => {
		for (const key in colors[name]) {
			if (
				colors[name][key].r === color.r &&
				colors[name][key].g === color.g &&
				colors[name][key].b === color.b
			) {
				return key;
			}
		}
		return "";
	};

	const skinOptions = [];
	const hairOptions = [];
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

	return (
		<>
			<Renderer companion={companion} />
			<div>
				<select name="pose" value={companion.properties.pose} onChange={handlePropertyChange}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
				</select>
				<select
					name="skin"
					value={colorToKey(companion.properties.skin, "skin")}
					onChange={handleColorChange}
				>
					{skinOptions}
				</select>
				<select
					name="hair"
					value={colorToKey(companion.properties.hair, "hair")}
					onChange={handleColorChange}
				>
					{hairOptions}
				</select>
			</div>
			<div>
				{attributes.map((attribute) => (
					<select
						key={attribute.name}
						name={attribute.name}
						value={companion.attributes[attribute.name]?.name}
						onChange={handleAttributeChange}
					>
						{attribute.isOptional && <option value="">none</option>}
						{attribute.variants.map((variant) => {
							return (
								<option value={variant.name} key={variant.name}>
									{variant.name}
								</option>
							);
						})}
					</select>
				))}
			</div>
		</>
	);
}
