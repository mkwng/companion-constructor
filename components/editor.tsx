import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { selectableAttributesArray } from "../data/attributes";
import { colors } from "../data/colors";
import { colorsRequired, colorToKey, getRestrictions, isCompatible } from "../data/helpers";
import { randomProperty } from "../data/random";
import { Companion, Pose, Restrictions, RGBColor } from "../data/types";

const OptionsContainer = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	return (
		<div className="mt-4 mb-2 text-gray-400">
			<div className="px-4 w-full flex justify-between font-bold ">{title}</div>
			{children}
		</div>
	);
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
				className={`
					pointer-events-none 
					transition-opacity duration-300 
					absolute left-0 w-16 h-full 
					bg-gradient-to-r from-clothing-black to-transparent 
					${moreLeft ? "opacity-100" : "opacity-0"}`}
				aria-hidden="true"
			></div>
			<div
				className={`
					pointer-events-none 
					transition-opacity duration-300 
					absolute right-0 w-16 h-full 
					bg-gradient-to-l from-clothing-black to-transparent 
					${moreRight ? "opacity-100" : "opacity-0"}`}
				aria-hidden="true"
			></div>
			<div className="w-100 overflow-x-scroll scroll hide-scrollbar" onScroll={checkMore}>
				<div className="w-max flex">
					<span className="w-4 h-4 inline-block" aria-hidden="true" ref={leftPlaceholder} />
					{Object.keys(colors).map((color) => {
						const rgb = `rgb(${colors[color].r},${colors[color].g},${colors[color].b})`;
						return (
							<div
								key={color}
								onClick={() => onSelect(color)}
								className="w-8 h-8 inline-block rounded-full m-2 cursor-pointer hover:opacity-90"
								style={{
									backgroundColor: rgb,
									border: color === active ? "2px solid rgba(69,61,75)" : "",
									outline: color === active ? `2px solid rgba(166, 211, 209)` : "",
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
						className={`
							flex justify-center content-center 
							cursor-pointer   
							border-2 border-transparent rounded-full 
							px-4 py-2
							${
								variant === active
									? "border-hair-lightblue text-hair-lightblue"
									: "text-gray-400 border-gray-600"
							}`}
					>
						<p className="text-center m-auto">{variant}</p>
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
	const [expanded, setExpanded] = useState(true);
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
			<div className="mt-4 text-gray-400">
				<div className="px-4 w-full flex justify-between font-bold ">
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
		</div>
	));

	const GeneralOptions = () => (
		<>
			<OptionsContainer title="Pose">
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
			</OptionsContainer>

			<OptionsContainer title="Background">
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
			</OptionsContainer>

			<OptionsContainer title="Skin">
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
			</OptionsContainer>
		</>
	);

	const FaceOptions = () => (
		<>
			<OptionsContainer title="Face shape">
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
			</OptionsContainer>

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
			<OptionsContainer title="Color">
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
			</OptionsContainer>
			{selectables.filter((attribute) => attribute.key === "hair")}
		</>
	);

	const AccessoriesOptions = () => (
		<>
			{selectables.filter(
				(attribute) =>
					attribute.key === "headwear" ||
					attribute.key === "eyewear" ||
					attribute.key === "mask" ||
					attribute.key === "accessory"
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
				className={`
				relative flex-grow
				py-2 px-4 rounded-full
				text-center border-2
					${category === viewing ? "border-background-red" : "border-transparent text-gray-400"}`}
				onClick={(e) => {
					e.preventDefault();
					setViewing(category);
				}}
			>
				{children}
			</div>
		);

		return (
			<div className="w-full">
				<div
					className={`
						pointer-events-none 
						z-10 
						transition-opacity duration-300 
						absolute left-0 w-16 h-full 
						bg-gradient-to-r from-clothing-black to-transparent 
						${moreLeft ? "opacity-100" : "opacity-0"}
					`}
					aria-hidden="true"
				></div>
				<div
					className={`
						pointer-events-none 
						z-10 
						transition-opacity duration-300 
						absolute right-0 w-16 h-full 
						bg-gradient-to-l from-clothing-black to-transparent  
						${moreRight ? "opacity-100" : "opacity-0"}
					`}
					aria-hidden="true"
				></div>
				<div
					ref={scrollableArea}
					onScroll={checkMore}
					className="w-full overflow-x-scroll hide-scrollbar"
				>
					<div className="w-max min-w-full flex justify-center relative">
						<div className="absolute left-2 right-2 h-full z-0 rounded-full border-gray-600 border-2"></div>
						<span className="w-2 h-4 inline-block" aria-hidden="true" ref={leftPlaceholder} />
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
						<span className="w-2 h-4 inline-block" aria-hidden="true" ref={rightPlaceholder} />
					</div>
				</div>
			</div>
		);
	};

	return (
		<div
			className={`${
				expanded
					? "min-h-screen lg:min-h-0 max-h-screen"
					: "max-h-12 overflow-hidden lg:max-h-full lg:overflow-visible"
			}`}
		>
			<div
				className={`z-30 fixed lg:hidden bottom-0 w-full p-2 bg-background-yellow text-clothing-black`}
			>
				<button
					className={`
									relative w-full
									py-2 rounded-full
									text-center
									border-2 border-gray-600
								`}
					onClick={() => {
						setExpanded((prev) => !prev);
					}}
				>
					{expanded ? "Hide controls" : "Show controls"}
				</button>
			</div>
			<div className="h-14 w-full lg:hidden"></div>
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
		</div>
	);
}
