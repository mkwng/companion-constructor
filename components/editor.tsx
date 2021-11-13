import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
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
import { Companion, Pose, Restrictions, RGBColor } from "../data/types";

const findFirstIdenticalObject = (array: any[], object: any) => {
	for (let i = 0; i < array.length; i++) {
		if (JSON.stringify(array[i]) === JSON.stringify(object)) {
			return i;
		}
	}
	return -1;
};

const ColorSelector = ({
	colors,
	active,
	onSelect,
}: {
	colors: { [key: string]: RGBColor };
	active?: string;
	onSelect: (color: string) => void;
}) => {
	return (
		<>
			{Object.keys(colors).map((color) => {
				return (
					<div
						key={color}
						onClick={() => onSelect(color)}
						className={color === active ? "active" : ""}
						style={{
							width: "48px",
							height: "48px",
							display: "inline-block",
							backgroundColor: `rgb(${colors[color].r},${colors[color].g},${colors[color].b})`,
						}}
					></div>
				);
			})}
		</>
	);
};

export default function Editor({
	companionState,
	...props
}: {
	companionState: [Companion, Dispatch<SetStateAction<Companion>>];
}) {
	const [companion, setCompanion] = companionState;

	const companionRestrictions = useMemo<Restrictions[]>(
		() => getRestrictions(companion),
		[companion]
	);

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
		if (name === "pose") {
			setCompanion({
				...companion,
				properties: {
					...companion.properties,
					pose: parseInt(value) as Pose,
				},
			});
		} else {
			setCompanion({
				...companion,
				properties: {
					...companion.properties,
					[name]: value,
				},
			});
		}
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
			<div>
				<div>
					Background color:{" "}
					<ColorSelector
						colors={colors.background}
						active={colorToKey(companion.properties.background, colors.background)}
						onSelect={(e) => {
							setCompanion({
								...companion,
								properties: {
									...companion.properties,
									background: colors.background[e],
								},
							});
						}}
					/>
				</div>
				<div>
					Hair color:{" "}
					<ColorSelector
						colors={colors.hair}
						active={colorToKey(companion.properties.hair, colors.hair)}
						onSelect={(e) => {
							setCompanion({
								...companion,
								properties: {
									...companion.properties,
									hair: colors.hair[e],
								},
							});
						}}
					/>
				</div>
				<div>
					Skin color:{" "}
					<ColorSelector
						colors={colors.skin}
						active={colorToKey(companion.properties.skin, colors.skin)}
						onSelect={(e) => {
							setCompanion({
								...companion,
								properties: {
									...companion.properties,
									skin: colors.skin[e],
								},
							});
						}}
					/>
				</div>
				<select name="pose" value={companion.properties.pose} onChange={handlePropertyChange}>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
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
							})?.restrictions,
							companionRestrictions
						) && <>⚠️</>}
						{attribute.name}:
						<select
							name={attribute.name}
							value={companion.attributes[attribute.name]?.name || ""}
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
									<option value={variant.name} key={variant.name}>
										{!isCompatible(variant.restrictions, newRestrictions) && "⚠️"}{" "}
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
