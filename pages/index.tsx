import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Renderer from "../components/renderer";
import { blemish } from "../data/attributes/blemish";
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

var randomProperty = function (obj) {
	var keys = Object.keys(obj);
	return obj[keys[(keys.length * Math.random()) << 0]];
};

const colorsRequired = (name, value) => {
	let attrMatch = attributes.find((attribute) => attribute.name === name);
	let variantMatch = attrMatch.variants.find((variant) => variant.name === value);
	return variantMatch?.layers.filter((layer) => {
		if ("colorType" in layer) {
			return layer.colorType === "clothing";
		}
		return false;
	}).length;
};

export default function Home() {
	const [companion, setCompanion] = useState(companionExample);

	const handleAttributeChange = (e) => {
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

	return (
		<>
			<Renderer companion={companion} />
			<div>
				<select
					name="background"
					value={colorToKey(companion.properties.background, "background")}
					onChange={handleColorChange}
				>
					{backgroundOptions}
				</select>
				<select name="pose" value={companion.properties.pose} onChange={handlePropertyChange}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
				</select>
				<select
					name="gender"
					value={companion.properties.gender}
					onChange={handlePropertyChange}
				>
					<option value="m">m</option>
					<option value="f">f</option>
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
					<div>
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
						{colorsRequired(attribute.name, companion.attributes[attribute.name]?.name) ? (
							<>
								{[
									...Array(
										colorsRequired(attribute.name, companion.attributes[attribute.name]?.name)
									),
								].map((x, i) => (
									<select
										name={`${attribute.name}-${i}`}
										value={colorToKey(
											companion.attributes[attribute.name]?.color[i],
											"clothing"
										)}
										onChange={(e) => {
											const { name, value } = e.target;
											let color = [...companion.attributes[attribute.name].color];
											color[i] = colors.clothing[value];
											setCompanion({
												...companion,
												attributes: {
													...companion.attributes,
													[attribute.name]: {
														...companion.attributes[attribute.name],
														color,
													},
												},
											});
										}}
									>
										{clothingOptions}
									</select>
								))}
							</>
						) : null}
					</div>
				))}
			</div>
		</>
	);
}
