import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { selectableAttributesArray } from "../data/attributes";
import { colors } from "../data/colors";
import {
	colorsRequired,
	colorToKey,
	getAllHides,
	getRestrictions,
	isCompatible,
} from "../data/helpers";
import { randomProperty } from "../data/random";
import { Companion, Pose, Restrictions, RGBColor, Variant } from "../data/types";
import Button from "./button";

const OptionsContainer = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	return (
		<div className="mb-6 text-gray-400">
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
	const scrollableArea = useRef<HTMLDivElement>(null);
	const activeDiv = useRef<HTMLDivElement>(null);

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
		scrollableArea.current.scrollTo({
			left:
				activeDiv.current.offsetLeft -
				scrollableArea.current.offsetWidth / 2 +
				activeDiv.current.offsetWidth / 2,
		});
	}, []);

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
					bg-gradient-to-r from-clothing-black 
					${moreLeft ? "opacity-100" : "opacity-0"}`}
				aria-hidden="true"
			></div>
			<div
				className={`
					pointer-events-none 
					transition-opacity duration-300 
					absolute right-0 w-16 h-full 
					bg-gradient-to-l from-clothing-black 
					${moreRight ? "opacity-100" : "opacity-0"}`}
				aria-hidden="true"
			></div>
			<div
				ref={scrollableArea}
				className="w-100 overflow-x-scroll scroll hide-scrollbar"
				onScroll={checkMore}
			>
				<div className="w-max flex">
					<span className="w-4 h-4 inline-block" aria-hidden="true" ref={leftPlaceholder} />
					{Object.keys(colors).map((color) => {
						const rgb = `rgb(${colors[color].r},${colors[color].g},${colors[color].b})`;
						return (
							<div
								ref={color === active ? activeDiv : null}
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
	variants:
		| Variant[]
		| {
				name: string | number;
				rarity?: string;
		  }[];
	active?: string | number;
	onSelect: (variant: string | number) => void;
}) => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-4">
			{variants.map((variant) => {
				return (
					<div key={variant.name}>
						<Button
							onClick={variant.rarity === "mythic" ? () => {} : () => onSelect(variant.name)}
							// onClick={() => onSelect(variant.name)}
							title={
								variant.rarity === "mythic"
									? "You can only mint this attribute randomly"
									: variant.name
							}
							className={`
							px-4 py-2
							${variant.rarity === "mythic" ? "opacity-50 cursor-not-allowed" : ""} 
							${
								variant.name === active
									? `border-hair-lightblue text-hair-lightblue`
									: `text-gray-400 border-ui-black-lightest`
							}`}
						>
							<p className="text-center m-auto">
								{variant.name !== active && variant.rarity === "mythic" ? "???" : variant.name}
							</p>
						</Button>
					</div>
				);
			})}
		</div>
	);
};

export default function Editor({
	companionState,
	uneditedCompanionState,
	...props
}: {
	companionState: [Companion, Dispatch<SetStateAction<Companion>>];
	uneditedCompanionState?: [Companion, Dispatch<SetStateAction<Companion>>];
}) {
	const [expanded, setExpanded] = useState(true);
	const [companion, setCompanion] = companionState;
	const [viewing, setViewing] = useState<
		"general" | "face" | "hair" | "clothing" | "accessories"
	>("general");
	const scrollableCategoryRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const companionRestrictions = useMemo<Restrictions[]>(
		() => getRestrictions(companion),
		[companion]
	);
	const hides = useMemo<Set<string>>(() => getAllHides(companion), [companion]);

	useEffect(() => {
		containerRef.current.parentElement.parentElement.scrollTo(0, 0);
	}, [viewing]);

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
						<span className={`${hides.has(attribute.name) ? "line-through" : ""}`}>
							{`${attribute.name.charAt(0).toUpperCase()}${attribute.name.slice(1)}`}
						</span>
						{hides.has(attribute.name) ? (
							<span className="font-normal ml-2">Hidden</span>
						) : null}
					</div>
					{attribute.isOptional && companion.attributes[attribute.name]?.name && (
						<div
							className="cursor-pointer"
							onClick={() => {
								if (uneditedCompanionState && !uneditedCompanionState[0]) {
									uneditedCompanionState[1](companion);
								}
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
				variants={attribute.variants}
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

					if (uneditedCompanionState && !uneditedCompanionState[0]) {
						uneditedCompanionState[1](companion);
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

									if (uneditedCompanionState && !uneditedCompanionState[0]) {
										uneditedCompanionState[1](companion);
									}
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
					variants={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4, rarity: "mythic" }]}
					active={companion.properties.pose}
					onSelect={(pose) => {
						if (uneditedCompanionState && !uneditedCompanionState[0]) {
							uneditedCompanionState[1](companion);
						}
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
						if (uneditedCompanionState && !uneditedCompanionState[0]) {
							uneditedCompanionState[1](companion);
						}
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
						if (uneditedCompanionState && !uneditedCompanionState[0]) {
							uneditedCompanionState[1](companion);
						}
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
			<OptionsContainer title="Shape">
				<AttributeSelector
					variants={[{ name: "m" }, { name: "f" }, { name: "w", rarity: "mythic" }]}
					active={companion.properties.gender}
					onSelect={(gender) => {
						if (uneditedCompanionState && !uneditedCompanionState[0]) {
							uneditedCompanionState[1](companion);
						}
						setCompanion((old) => {
							return {
								...old,
								properties: {
									...old.properties,
									gender: gender as "m" | "f" | "w",
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
					attribute.key === "mouth" ||
					attribute.key === "facialhair"
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
						if (uneditedCompanionState && !uneditedCompanionState[0]) {
							uneditedCompanionState[1](companion);
						}
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
			children,
		}: {
			category: "general" | "face" | "hair" | "accessories" | "clothing";
			children: React.ReactNode;
		}) => (
			<Button
				className={`
					${category === viewing ? "border-background-red" : "border-transparent text-gray-400"}`}
				onClick={() => {
					sessionStorage.setItem(
						"categoryPosition",
						scrollableCategoryRef.current.scrollLeft + ""
					);
					setViewing(category);
				}}
			>
				{children}
			</Button>
		);

		useEffect(() => {
			scrollableCategoryRef.current.scrollTo({
				left: parseInt(sessionStorage.getItem("categoryPosition")) || 0,
			});
		}, []);

		return (
			<div className="relative w-full">
				<div
					className={`
						pointer-events-none 
						z-10 
						transition-opacity duration-300 
						absolute left-0 w-16 h-full 
						bg-gradient-to-r from-clothing-black 
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
						bg-gradient-to-l from-clothing-black  
						${moreRight ? "opacity-100" : "opacity-0"}
					`}
					aria-hidden="true"
				></div>
				<div
					ref={scrollableCategoryRef}
					onScroll={checkMore}
					className="w-full overflow-x-scroll hide-scrollbar"
				>
					<div className="w-max min-w-full flex justify-center relative">
						<div className="absolute inset-0 h-full z-0 rounded-full border-ui-black-lightest border-2 bg-clothing-black"></div>
						<span className="w-2 h-4 inline-block" aria-hidden="true" ref={leftPlaceholder} />
						<CategoryLink key="general" category="general">
							General
						</CategoryLink>
						<CategoryLink key="hair" category="hair">
							Hair
						</CategoryLink>
						<CategoryLink key="face" category="face">
							Face
						</CategoryLink>
						<CategoryLink key="clothing" category="clothing">
							Clothing
						</CategoryLink>
						<CategoryLink key="accessories" category="accessories">
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
			ref={containerRef}
			className={`transition-all ${
				expanded
					? "pt-4 max-h-1/2-screen lg:max-h-screen h-1/2-screen lg:h-auto"
					: "max-h-0 lg:max-h-full"
			}`}
		>
			<div
				className={`z-30 fixed lg:hidden bottom-0 w-full p-2 text-white bg-clothing-black shadow-md`}
			>
				<button
					className={`
									relative w-full
									py-2 rounded-full
									text-center
									border-2 border-background-yellow
								`}
					onClick={() => {
						setExpanded((prev) => !prev);
					}}
				>
					{expanded ? "Hide editor" : "Show editor"}
				</button>
			</div>
			<div className="sticky float-left top-4 px-2 mb-4 lg:top-16 w-full">
				<CategorySelector />
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
			<div className="h-14 lg:hidden" />
		</div>
	);
}
