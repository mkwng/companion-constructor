import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
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
	const leftPlaceholder = useRef<HTMLDivElement>(null);
	const rightPlaceholder = useRef<HTMLDivElement>(null);
	const [moreLeft, setMoreLeft] = useState(false);
	const [moreRight, setMoreRight] = useState(false);

	const checkMore = () => {
		if (leftPlaceholder.current.getBoundingClientRect().right > 0) {
			setMoreLeft(false);
		} else {
			setMoreLeft(true);
		}
		if (rightPlaceholder.current.getBoundingClientRect().left < window.innerWidth) {
			setMoreRight(false);
		} else {
			setMoreRight(true);
		}
	};

	useEffect(() => {
		checkMore();
	}, [colors]);

	return (
		<div className="w-100 relative">
			<div
				className={`pointer-events-none transition-opacity duration-300 absolute left-0 w-16 h-full bg-gradient-to-r from-white to-transparent text-center flex justify-center items-center ${
					moreLeft ? "opacity-100" : "opacity-0"
				}`}
				aria-hidden="true"
			></div>
			<div
				className={`pointer-events-none transition-opacity duration-300 absolute right-0 w-16 h-full bg-gradient-to-l from-white to-transparent text-center flex justify-center items-center ${
					moreRight ? "opacity-100" : "opacity-0"
				}`}
				aria-hidden="true"
			></div>
			<div className="w-100 overflow-x-scroll scroll hide-scrollbar py-4" onScroll={checkMore}>
				<div className="w-max flex">
					<span className="w-4 h-4 inline-block" aria-hidden="true" ref={leftPlaceholder} />
					{Object.keys(colors).map((color) => {
						const rgb = `rgb(${colors[color].r},${colors[color].g},${colors[color].b})`;
						return (
							<div
								key={color}
								onClick={() => onSelect(color)}
								className="w-14 h-14 inline-block rounded-full m-2 cursor-pointer hover:opacity-90"
								style={{
									backgroundColor: rgb,
									border: color === active ? "4px solid white" : "",
									outline: color === active ? `4px solid black` : "",
								}}
							></div>
						);
					})}
					<span className="w-4 h-4 inline-block" aria-hidden="true" ref={rightPlaceholder} />
				</div>
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
		<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-4">
			{variants.map((variant) => {
				return (
					<div
						key={variant}
						onClick={() => onSelect(variant)}
						className={`font-semibold flex justify-center content-center cursor-pointer min-h-20 rounded-xl  hover:text-gray-800  border-4 border-transparent ${
							variant === active
								? "border-black bg-hair-lightblue"
								: "hover:bg-gray-100 bg-gray-50"
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
		<div key={attribute.name} className="my-4">
			<div className="px-4 py-2 w-full flex justify-between font-semibold text-lg">
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
			<div className="my-4">
				<div className="px-4 w-full flex justify-between  font-semibold text-lg">Pose</div>
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
			<hr />
			<div className="my-4">
				<div className="px-4 w-full flex justify-between  font-semibold text-lg">
					Background
				</div>
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
			<hr />

			<div className="my-4">
				<div className="px-4 w-full flex justify-between  font-semibold text-lg">Skin</div>
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
			<div className="my-4">
				<div className="px-4 w-full flex justify-between  font-semibold text-lg">Shape</div>
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
			<hr />

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
			<div className="my-4">
				<div className="px-4 w-full flex justify-between  font-semibold text-lg">Color</div>
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
			<hr />
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

	const CategorySelector = () => {
		const scrollableArea = useRef<HTMLDivElement>(null);
		const leftPlaceholder = useRef<HTMLDivElement>(null);
		const rightPlaceholder = useRef<HTMLDivElement>(null);
		const [moreLeft, setMoreLeft] = useState(false);
		const [moreRight, setMoreRight] = useState(false);

		const checkMore = () => {
			if (leftPlaceholder.current.getBoundingClientRect().right > 0) {
				setMoreLeft(false);
			} else {
				setMoreLeft(true);
			}
			if (rightPlaceholder.current.getBoundingClientRect().left < window.innerWidth) {
				setMoreRight(false);
			} else {
				setMoreRight(true);
			}
		};
		useEffect(() => {
			checkMore();
		}, []);

		const CategoryLink = ({
			category,
			highlightColor,
			children,
		}: {
			category: "general" | "face" | "hair" | "accessories" | "clothing";
			highlightColor?: string;
			children: React.ReactNode;
		}) => (
			<div
				className={
					"py-3 px-5 transition-transform transform-gpu rounded-full text-lg font-semibold cursor-pointer border-4 border-transparent" +
					(category === viewing
						? ` ${highlightColor || "bg-clothing-orange"} duration-0 border-black`
						: ` hover:bg-gray-50 duration-75 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0`)
				}
				onClick={(e) => {
					e.preventDefault();
					setViewing(category);
				}}
			>
				{children}
			</div>
		);

		return (
			<div className="w-full relative">
				<div
					className={`pointer-events-none rounded-t-xl z-10 transition-opacity duration-300 absolute left-0 w-16 h-full bg-gradient-to-r from-white to-transparent text-center flex justify-center items-center ${
						moreLeft ? "opacity-100" : "opacity-0"
					}`}
					aria-hidden="true"
				></div>
				<div
					className={`pointer-events-none rounded-t-xl z-10 transition-opacity duration-300 absolute right-0 w-16 h-full bg-gradient-to-l from-white to-transparent text-center flex justify-center items-center ${
						moreRight ? "opacity-100" : "opacity-0"
					}`}
					aria-hidden="true"
				></div>
				<div
					ref={scrollableArea}
					onScroll={checkMore}
					className="w-full overflow-x-scroll hide-scrollbar py-4"
				>
					<div className="w-max min-w-full flex gap-4 justify-center">
						<span className="w-4 h-4 inline-block" aria-hidden="true" ref={leftPlaceholder} />
						<CategoryLink category="general" highlightColor="bg-background-red">
							General
						</CategoryLink>
						<CategoryLink category="hair" highlightColor="bg-hair-lightblue">
							Hair
						</CategoryLink>
						<CategoryLink category="face" highlightColor="bg-clothing-yellow">
							Face
						</CategoryLink>
						<CategoryLink category="clothing" highlightColor="bg-clothing-green">
							Clothing
						</CategoryLink>
						<CategoryLink category="accessories" highlightColor="bg-clothing-red">
							Accessories
						</CategoryLink>
						<span className="w-4 h-4 inline-block" aria-hidden="true" ref={rightPlaceholder} />
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<CategorySelector />
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
