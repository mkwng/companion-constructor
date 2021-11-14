import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { selectableAttributesArray } from "../data/attributes";
import { colors } from "../data/colors";
import { colorsRequired, colorToKey, getRestrictions, isCompatible } from "../data/helpers";
import { randomProperty } from "../data/random";
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
		<div className="w-100 overflow-x-scroll scroll hide-scrollbar py-4">
			<div className="w-max">
				<span className="w-4 inline-block" aria-hidden="true" />
				{Object.keys(colors).map((color) => {
					const rgb = `rgb(${colors[color].r},${colors[color].g},${colors[color].b})`;
					return (
						<div
							key={color}
							onClick={() => onSelect(color)}
							className="w-14 h-14 inline-block rounded-full m-1 cursor-pointer hover:opacity-90"
							style={{
								backgroundColor: rgb,
								border: color === active ? "4px solid white" : "",
								outline: color === active ? `4px solid ${rgb}` : "",
							}}
						></div>
					);
				})}
				<span className="w-4 inline-block" aria-hidden="true" />
			</div>
		</div>
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
		<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2 p-4">
			{variants.map((variant) => {
				return (
					<div
						key={variant}
						onClick={() => onSelect(variant)}
						className={`flex justify-center content-center cursor-pointer min-h-20 rounded-xl bg-gray-100 hover:text-gray-800  hover:bg-gray-200 border-4 border-transparent ${
							variant === active && "border-indigo-500 text-indigo-500"
						}`}
					>
						<p className="h-6 text-center m-auto">{variant}</p>
					</div>
				);
			})}
		</div>
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
			<div className="px-4 py-2 w-full flex justify-between">
				<div>
					{!isCompatible(
						attribute.variants.find((variant) => {
							return companion.attributes[attribute.name]?.name === variant.name;
						})?.restrictions,
						companionRestrictions
					) && <>⚠️</>}
					{attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1)}
				</div>
				{attribute.isOptional && companion.attributes[attribute.name]?.name && (
					<div
						className="cursor-pointer"
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
					>
						🗑 Remove
					</div>
				)}
			</div>
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
				<div className="px-4 py-2 w-full flex justify-between">Pose</div>
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
				<div className="px-4 py-2 w-full flex justify-between">Background</div>
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
				<div className="px-4 py-2 w-full flex justify-between">Skin</div>
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
				<div className="px-4 py-2 w-full flex justify-between">Shape</div>
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
				<div className="px-4 py-2 w-full flex justify-between">Color</div>
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
				"py-2 px-3 bg-gray-50 rounded-lg text-lg font-semibold cursor-pointer border-4 border-gray-50" +
				(category === viewing ? " text-indigo-500 border-indigo-500" : "")
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
			<div className="w-full overflow-x-scroll hide-scrollbar py-4">
				<div className="w-max min-w-full flex gap-4 justify-center">
					<span className="w-0" aria-hidden="true" />
					<CategoryLink category="general">General</CategoryLink>
					<CategoryLink category="hair">Hair</CategoryLink>
					<CategoryLink category="face">Face</CategoryLink>
					<CategoryLink category="clothing">Clothing</CategoryLink>
					<CategoryLink category="accessories">Accessories</CategoryLink>
					<span className="w-0" aria-hidden="true" />
				</div>
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
