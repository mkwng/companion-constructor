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
				const rgb = `rgb(${colors[color].r},${colors[color].g},${colors[color].b})`;
				return (
					<div
						key={color}
						onClick={() => onSelect(color)}
						className={color === active ? "active" : ""}
						style={{
							width: "48px",
							height: "48px",
							display: "inline-block",
							backgroundColor: rgb,
							borderRadius: "128px",
							margin: "4px",
							border: color === active ? "4px solid white" : "",
							outline: color === active ? `4px solid ${rgb}` : "",
						}}
					></div>
				);
			})}
		</>
	);
};

const AttributeSelector = ({
	variants,
	active,
	onSelect,
}: {
	variants: string[] | number[];
	active?: string | number;
	onSelect: (variant: string | number) => void;
}) => {
	return (
		<>
			{variants.map((variant) => {
				return (
					<div
						key={variant}
						onClick={() => onSelect(variant)}
						className={variant === active ? "active" : ""}
						style={{
							display: "inline-block",
							borderBottom: variant === active ? "4px solid black" : "",
							margin: "4px",
						}}
					>
						{variant}
					</div>
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
						onSelect={(color) => {
							setCompanion({
								...companion,
								properties: {
									...companion.properties,
									background: colors.background[color],
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
						onSelect={(color) => {
							setCompanion({
								...companion,
								properties: {
									...companion.properties,
									hair: colors.hair[color],
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
						onSelect={(color) => {
							setCompanion({
								...companion,
								properties: {
									...companion.properties,
									skin: colors.skin[color],
								},
							});
						}}
					/>
				</div>
				<div>
					Pose:{" "}
					<AttributeSelector
						variants={[1, 2, 3, 4]}
						active={companion.properties.pose}
						onSelect={(pose) => {
							setCompanion({
								...companion,
								properties: {
									...companion.properties,
									pose: pose as Pose,
								},
							});
						}}
					/>
				</div>
				<div>
					Face shape:{" "}
					<AttributeSelector
						variants={["m", "f"]}
						active={companion.properties.gender}
						onSelect={(gender) => {
							setCompanion({
								...companion,
								properties: {
									...companion.properties,
									gender: gender as "m" | "f",
								},
							});
						}}
					/>
				</div>
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
						<AttributeSelector
							variants={attribute.variants.map((variant) => variant.name)}
							active={companion.attributes[attribute.name]?.name || ""}
							onSelect={(attribute) => {
								console.log(attribute);
							}}
						/>
						{/* <select
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
						</select> */}
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
						<hr />
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
