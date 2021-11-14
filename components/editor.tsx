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
						className="w-10 h-10 inline-block rounded-full m-1 cursor-pointer hover:opacity-90"
						style={{
							backgroundColor: rgb,
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
						className="inline-block m-1 p-1 w-24 h-24 cursor-pointer hover:text-gray-800 rounded-xl bg-gray-100 hover:bg-gray-200"
						style={{
							border: variant === active ? "4px solid blue" : "",
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
	const [viewing, setViewing] = useState<
		"general" | "face" | "hair" | "clothing" | "accessories"
	>("general");

	const companionRestrictions = useMemo<Restrictions[]>(
		() => getRestrictions(companion),
		[companion]
	);

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

	const selectables = selectableAttributesArray.map((attribute) => (
		<div key={attribute.name}>
			{!isCompatible(
				attribute.variants.find((variant) => {
					return companion.attributes[attribute.name]?.name === variant.name;
				})?.restrictions,
				companionRestrictions
			) && <>⚠️</>}
			{attribute.name}:
			{attribute.isOptional && (
				<div
					onClick={() => {
						setCompanion((old) => {
							return {
								...old,
								attributes: {
									...old.attributes,
									[attribute.name]: undefined,
								},
							};
						});
					}}
					className="inline-block m-1 p-1 w-24 h-24 cursor-pointer hover:text-gray-800 rounded-xl bg-gray-100 hover:bg-gray-200"
					style={{
						border: companion.attributes[attribute.name]?.name ? "" : "4px solid blue",
					}}
				>
					none
				</div>
			)}
			<AttributeSelector
				variants={attribute.variants.map((variant) => variant.name)}
				active={companion.attributes[attribute.name]?.name || ""}
				onSelect={(selected) => {
					if (typeof selected !== "string") {
						throw new Error("Invalid variant");
					}
					let color = companion.attributes[attribute.name]?.color || [];
					let requiredColors = colorsRequired(attribute.name, selected);

					while (color.length < requiredColors) {
						color.push(randomProperty(colors.clothing));
					}

					setCompanion((old) => {
						return {
							...old,
							attributes: {
								...old.attributes,
								[attribute.name]: {
									name: selected,
									color,
								},
							},
						};
					});
				}}
			/>
			{colorsRequired(attribute.name, companion.attributes[attribute.name]?.name) ? (
				<>
					{[
						...Array(
							colorsRequired(attribute.name, companion.attributes[attribute.name]?.name)
						),
					].map((x, i) => (
						<div key={`${attribute.name}-${i}`}>
							<ColorSelector
								colors={colors.clothing}
								active={colorToKey(
									companion.attributes[attribute.name]?.color[i],
									colors.clothing
								)}
								onSelect={(selected) => {
									let color = [...companion.attributes[attribute.name].color];
									color[i] = colors.clothing[selected];
									setCompanion((old) => {
										return {
											...old,
											attributes: {
												...old.attributes,
												[attribute.name]: {
													...old.attributes[attribute.name],
													color,
												},
											},
										};
									});
								}}
							/>
						</div>
					))}
				</>
			) : null}
			<hr />
		</div>
	));

	const GeneralOptions = () => (
		<>
			<div>
				Pose:{" "}
				<AttributeSelector
					variants={[1, 2, 3, 4]}
					active={companion.properties.pose}
					onSelect={(pose) => {
						setCompanion((old) => {
							return {
								...old,
								properties: {
									...old.properties,
									pose: pose as Pose,
								},
							};
						});
					}}
				/>
			</div>
			<div>
				Background color:{" "}
				<ColorSelector
					colors={colors.background}
					active={colorToKey(companion.properties.background, colors.background)}
					onSelect={(color) => {
						setCompanion((old) => {
							return {
								...old,
								properties: {
									...old.properties,
									background: colors.background[color],
								},
							};
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
						setCompanion((old) => {
							return {
								...old,
								properties: {
									...old.properties,
									skin: colors.skin[color],
								},
							};
						});
					}}
				/>
			</div>
		</>
	);

	const FaceOptions = () => (
		<>
			<div>
				Face shape:{" "}
				<AttributeSelector
					variants={["m", "f"]}
					active={companion.properties.gender}
					onSelect={(gender) => {
						setCompanion((old) => {
							return {
								...old,
								properties: {
									...old.properties,
									gender: gender as "m" | "f",
								},
							};
						});
					}}
				/>
			</div>

			{selectables.filter(
				(attribute) =>
					attribute.key === "blemish" ||
					attribute.key === "brows" ||
					attribute.key === "eyes" ||
					attribute.key === "nose" ||
					attribute.key === "mouth"
			)}
		</>
	);

	const HairOptions = () => (
		<>
			<div>
				Hair color:{" "}
				<ColorSelector
					colors={colors.hair}
					active={colorToKey(companion.properties.hair, colors.hair)}
					onSelect={(color) => {
						setCompanion((old) => {
							return {
								...old,
								properties: {
									...old.properties,
									hair: colors.hair[color],
								},
							};
						});
					}}
				/>
			</div>
			{selectables.filter((attribute) => attribute.key === "hair")}
		</>
	);

	const AccessoriesOptions = () => (
		<>
			{selectables.filter(
				(attribute) =>
					attribute.key === "eyewear" ||
					attribute.key === "headwear" ||
					attribute.key === "mask"
			)}
		</>
	);

	const ClothingOptions = () => (
		<>
			{selectables.filter(
				(attribute) =>
					attribute.key === "top" || attribute.key === "bottom" || attribute.key === "shoes"
			)}
		</>
	);

	const CategoryLink = ({
		category,
		children,
	}: {
		category: "general" | "face" | "hair" | "accessories" | "clothing";
		children: React.ReactNode;
	}) => (
		<div
			className={
				"text-lg font-semibold m-1 cursor-pointer" +
				(category === viewing ? " text-blue-500" : "")
			}
			onClick={() => {
				setViewing(category);
			}}
		>
			{children}
		</div>
	);

	return (
		<>
			<div className="flex">
				<CategoryLink category="general">General</CategoryLink>
				<CategoryLink category="hair">Hair</CategoryLink>
				<CategoryLink category="face">Face</CategoryLink>
				<CategoryLink category="clothing">Clothing</CategoryLink>
				<CategoryLink category="accessories">Accessories</CategoryLink>
			</div>
			{(() => {
				switch (viewing) {
					case "general":
						return <GeneralOptions />;
					case "face":
						return <FaceOptions />;
					case "hair":
						return <HairOptions />;
					case "accessories":
						return <AccessoriesOptions />;
					case "clothing":
						return <ClothingOptions />;
					default:
						return null;
				}
			})()}
		</>
	);
}
