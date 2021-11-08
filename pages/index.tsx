import { useEffect, useMemo, useState } from "react";
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
import { Companion, Restrictions } from "../data/types";

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

	const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setCompanion({
			...companion,
			properties: {
				...companion.properties,
				[name]: value,
			},
		});
	};

	const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setCompanion({
			...companion,
			properties: {
				...companion.properties,
				[name]: colors[name][value],
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
			<Renderer companion={companion} />
			<div>
				<select
					name="background"
					value={colorToKey(companion.properties.background, colors.background)}
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
					value={colorToKey(companion.properties.skin, colors.skin)}
					onChange={handleColorChange}
				>
					{skinOptions}
				</select>
				<select
					name="hair"
					value={colorToKey(companion.properties.hair, colors.hair)}
					onChange={handleColorChange}
				>
					{hairOptions}
				</select>
			</div>
			<div>
				{selectableAttributesArray.map((attribute) => (
					<div key={attribute.name}>
						{!isCompatible(
							attribute.variants.find((variant) => {
								return companion.attributes[attribute.name]?.name === variant.name;
							}),
							companionRestrictions
						) && <>⚠️</>}
						{attribute.name}:
						<select
							name={attribute.name}
							value={companion.attributes[attribute.name]?.name}
							onChange={handleAttributeChange}
						>
							{attribute.isOptional && <option value="">none</option>}
							{attribute.variants.map((variant) => {
								const matchIndex = findFirstIdenticalObject(
									companionRestrictions,
									variant.restrictions
								);
								const newRestrictions = companionRestrictions.filter(
									(_, i) => i !== matchIndex
								);

								return (
									<option
										value={variant.name}
										key={variant.name}
										disabled={!isCompatible(variant, newRestrictions)}
									>
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
										key={`${attribute.name}-${i}`}
										name={`${attribute.name}-${i}`}
										value={colorToKey(
											companion.attributes[attribute.name]?.color[i],
											colors.clothing
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
		</>
	);
}
