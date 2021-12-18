import { selectableAttributes, selectableAttributesArray } from "./attributes";
import { colors } from "./colors";
import { companionExample } from "./example";
import { poses } from "./poses";
import {
	AttributeSelection,
	AttributeType,
	Companion,
	Layer,
	LayerStaticWithData,
	LayerWithData,
	Pose,
	Rarity,
	Restrictions,
	RGBColor,
	Variant,
} from "./types";
import { Companion as PrismaCompanion } from ".prisma/client";
import _ from "lodash";

export const zeroPad = "000000000000000000";

const getVariants = (companion: Companion): Variant[] => {
	if (!companion) {
		throw new Error("Companion is undefined");
	}
	const pose = poses[companion.properties.pose];
	return pose.map((attribute) => {
		let selection: AttributeSelection | undefined;
		let match = attribute.variants.find((variant) => {
			if (companion.attributes[attribute.name]?.name) {
				let isMatch = variant.name === companion.attributes[attribute.name].name;
				if (isMatch) {
					selection = companion.attributes[attribute.name];
				}
				return isMatch;
			}
			if (variant.restrictions?.gender) {
				if (variant.restrictions.gender != companion.properties.gender) {
					return false;
				}
			}
			if (variant.restrictions?.pose) {
				if (variant.restrictions.pose != companion.properties.pose) {
					return false;
				}
			}
			return !attribute.isOptional;
		});
		return match;
	});
};

export const getLayers = (companion: Companion) => {
	const pose = poses[companion.properties.pose];

	const variants = getVariants(companion);

	const notRendered = variants.reduce((prev: AttributeType[], curr): AttributeType[] => {
		if (curr?.hides && curr.hides.length) {
			prev.push(...curr.hides);
		}
		return prev;
	}, []);

	let layers: [Layer, AttributeSelection?, boolean?][] = [];
	pose
		.filter((attribute) => {
			return !notRendered.includes(attribute.name);
		})
		.forEach((attribute) => {
			let selection: AttributeSelection | undefined;
			let match = attribute.variants.find((variant) => {
				if (companion.attributes[attribute.name]?.name) {
					let isMatch = variant.name === companion.attributes[attribute.name].name;
					if (isMatch) {
						selection = companion.attributes[attribute.name];
					}
					return isMatch;
				}
				if (variant.restrictions?.gender) {
					if (variant.restrictions.gender != companion.properties.gender) {
						return false;
					}
				}
				if (variant.restrictions?.pose) {
					if (variant.restrictions.pose != companion.properties.pose) {
						return false;
					}
				}
				return !attribute.isOptional;
			});
			if (match) {
				let colorIndexCount = 0;
				match.layers.forEach((layer) => {
					let result: [Layer, AttributeSelection?, boolean?] = [
						layer,
						"colorType" in layer && layer.colorType === "clothing"
							? { ...selection, colorIndex: colorIndexCount++ }
							: selection,
						attribute.needsTranslation,
					];
					if (typeof layer.path !== "string" && !layer.path[companion.properties.pose]) {
						return false;
					}
					layers.push(result);
				});
			}
		});
	return layers;
};

let colorCount = 0;
export const getColor = (
	layer: Layer,
	companion?: Companion,
	selection?: AttributeSelection
): RGBColor => {
	if (!("colorType" in layer)) {
		throw new Error(`Can't get color for layer: ${layer.path}`);
	}
	switch (layer.colorType) {
		case "hair":
		case "skin":
		case "background":
			if (!companion) {
				throw new Error(`No Companion was specified for layer: ${layer.path}`);
			}
			return companion.properties[layer.colorType];
		case "clothing":
			if (!selection.color) {
				throw new Error(`No colors were specified for layer: ${layer.path}`);
			}
			const temp =
				selection.color[
					selection.colorIndex || selection.colorIndex == 0
						? selection.colorIndex
						: colorCount++
				];
			if (colorCount >= selection.color.length) {
				colorCount = 0;
			}
			return temp;
		default:
			return colors.default.black;
	}
};

export const getPath = (layer: Layer, pose?: Pose): string => {
	if (typeof layer.path == "string") {
		return layer.path;
	} else {
		return layer.path[pose];
	}
};

export const colorsRequired = (attributeName: string, variantName: string): number => {
	let attrMatch = selectableAttributesArray.find(
		(attribute) => attribute.name === attributeName
	);
	let variantMatch = attrMatch.variants.find((variant) => variant.name === variantName);
	return variantMatch?.layers.filter((layer) => {
		if ("colorType" in layer) {
			return layer.colorType === "clothing";
		}
		return false;
	}).length;
};

export const colorToKey = (
	color: RGBColor,
	colorObject: { [key: string]: RGBColor }
): string => {
	if (!color) {
		throw new Error("Color is undefined");
	}
	for (const key in colorObject) {
		if (
			colorObject[key].r === color.r &&
			colorObject[key].g === color.g &&
			colorObject[key].b === color.b
		) {
			return key;
		}
	}
	return "";
};

const hasConflict = (
	sourceRestriction: Restrictions,
	companionRestrictions: Restrictions[]
): boolean => {
	return companionRestrictions.some((cRestriction) => {
		for (const rkey in cRestriction) {
			if (sourceRestriction[rkey] && sourceRestriction[rkey] !== cRestriction[rkey]) {
				return true;
			}
		}
		return false;
	});
};

export const isCompatible = (
	restrictions: Restrictions,
	companionRestrictions: Restrictions[]
): boolean => {
	if (!restrictions) {
		return true;
	}
	if (restrictions) {
		if (hasConflict(restrictions, companionRestrictions)) {
			return false;
		}
	}
	return true;
};

export const getAllHides = (companion: Companion): Set<string> => {
	let hides: Set<string> = new Set();
	getVariants(companion).forEach((variant) => {
		if (variant?.hides?.length) {
			variant.hides.forEach((hide) => {
				hides.add(hide);
			});
		}
	});
	return hides;
};

export const getRestrictions = (companion: Companion): Restrictions[] => {
	if (!companion) {
		return [];
	}
	const restrictions: Restrictions[] = [
		{
			gender: companion.properties.gender,
			pose: companion.properties.pose,
		},
	];
	for (const key in companion.attributes) {
		const match = selectableAttributes[key].variants.find((variant) => {
			return variant.name === companion.attributes[key]?.name;
		});
		if (match?.restrictions && isCompatible(match.restrictions, restrictions)) {
			restrictions.push(match.restrictions);
		}
	}
	return restrictions;
};

export const flattenCompanion = (
	companion: Companion
): {
	[key: string]: any;
} => {
	let flatCompanion = {
		name: companion.name,
	};

	for (const key in companion.properties) {
		switch (key) {
			case "pose":
			case "gender":
				flatCompanion[key] = companion.properties[key].toString();
				break;
			case "background":
			case "hair":
			case "skin":
				flatCompanion[key + "Color"] = colorToKey(companion.properties[key], colors[key]);
				break;
		}
	}
	for (const key in companion.attributes) {
		const attribute = selectableAttributes[key];
		const variant = attribute.variants.find(
			(variant) => variant.name === companion.attributes[key].name
		);
		if (variant) {
			flatCompanion[key] = variant.name;
			let colorsString = "";
			let i = 0;
			for (const layer of variant.layers) {
				if ("colorType" in layer && layer.colorType === "clothing") {
					if (colorsString.length) {
						colorsString += ",";
					}
					colorsString += colorToKey(companion.attributes[key].color[i], colors.clothing);
					i++;
				}
			}
			if (colorsString.length) flatCompanion[key + "Colors"] = colorsString;
		}
	}
	return flatCompanion;
};

export const companionToKeys = (companion: Companion) => {
	let output = {};
	for (const key in companion.properties) {
		switch (key) {
			case "pose":
			case "gender":
				output[key] = companion.properties[key];
				break;
			case "background":
			case "hair":
			case "skin":
				output[key + "Color"] = colorToKey(companion.properties[key], colors[key]);
				break;
		}
	}
	for (const key in companion.attributes) {
		if (!companion.attributes[key]?.name) {
			continue;
		}
		const attribute = selectableAttributes[key];
		const variant = attribute.variants.find(
			(variant) => variant.name === companion.attributes[key].name
		);
		if (variant) {
			output[key] = variant.name;
			let i = 0;
			for (const layer of variant.layers) {
				if ("colorType" in layer && layer.colorType === "clothing") {
					output[`${key}Color${i + 1}`] = colorToKey(
						companion.attributes[key].color[i],
						colors.clothing
					);
					i++;
				}
			}
		}
	}
	return output;
};

export const companionToUrl = (companion: Companion): string => {
	let path = "";
	for (const key in companion.properties) {
		switch (key) {
			case "pose":
			case "gender":
				path += `${key}=${companion.properties[key]}&`;
				break;
			case "background":
			case "hair":
			case "skin":
				path += `${key}Color=${colorToKey(companion.properties[key], colors[key])}&`;
				break;
		}
	}
	for (const key in companion.attributes) {
		if (!companion.attributes[key]?.name) {
			continue;
		}
		const attribute = selectableAttributes[key];
		const variant = attribute.variants.find(
			(variant) => variant.name === companion.attributes[key].name
		);
		if (variant) {
			path += `${key}=${variant.name}&`;
			let i = 0;
			for (const layer of variant.layers) {
				if ("colorType" in layer && layer.colorType === "clothing") {
					path += `${key}Color${i + 1}=${colorToKey(
						companion.attributes[key].color[i],
						colors.clothing
					)}&`;
					i++;
				}
			}
		}
	}
	return path;
};

const colorRegEx = /Color\d/g;

export const apiToKeys = (data: PrismaCompanion) => {
	const {
		id,
		createdAt,
		updatedAt,
		hairColors,
		headwearColors,
		eyewearColors,
		maskColors,
		topColors,
		bottomColors,
		shoesColors,
		accessoryColors,
		mouthColors,
		...rest
	} = data;
	const colors: {
		[key in string]: string;
	} = {
		hair: hairColors,
		headwear: headwearColors,
		eyewear: eyewearColors,
		mask: maskColors,
		top: topColors,
		bottom: bottomColors,
		shoes: shoesColors,
		accessory: accessoryColors,
		mouth: mouthColors,
	};
	for (const key of Object.keys(colors)) {
		// split colors string at commas, remove spaces, and convert to array
		if (!colors[key]) continue;
		const colorArray = [];
		colors[key].split(",").forEach((color) => {
			colorArray.push(color.trim());
		});
		if (colorArray.length) {
			colorArray.forEach((color, i) => {
				rest[`${key}Color${i + 1}`] = color;
			});
		}
	}
	return rest;
};

export const keysToCompanion = (companionQuery): Companion => {
	const companion: Companion = {
		name: companionQuery.name,
		tokenId: companionQuery.tokenId,
		properties: { ...companionExample.properties },
		attributes: {
			hair: { name: "crop" },
			eyes: { name: "default" },
			brows: { name: "neutral" },
			mouth: { name: "neutral" },
			nose: { name: "longstraight" },
		},
	};
	for (const key in companionQuery) {
		if (typeof companionQuery[key] !== "string") {
			continue;
		}
		switch (key) {
			case "name":
			case "tokenId":
				companion.name = companionQuery.name;
				break;
			case "pose":
				if (!((companionQuery[key] as string) in Pose)) {
					throw new Error(`${key} not valid`);
				}
				companion.properties.pose = Number(companionQuery[key]);
				break;
			case "gender":
				if (
					companionQuery[key] !== "f" &&
					companionQuery[key] !== "m" &&
					companionQuery[key] !== "w"
				) {
					throw new Error(`${key} not valid`);
				}
				companion.properties.gender = companionQuery[key] as "m" | "f" | "w";
				break;
			case "skinColor":
			case "hairColor":
			case "backgroundColor":
				const propName = key.replace("Color", "");
				const color = colors[propName][companionQuery[key] as string];
				if (!color) {
					throw new Error(`${key} not valid`);
				}
				companion.properties[propName] = color;
				break;
			default:
				if (key.match(colorRegEx)) {
					continue;
				}
				if (!(key in selectableAttributes)) {
					throw new Error(`${key} not valid`);
				}
				const match = selectableAttributes[key].variants.find(
					(variant) => variant.name === companionQuery[key]
				);
				if (!match) {
					throw new Error(`${key}: ${companionQuery[key]} not valid`);
				}
				companion.attributes[key] = {
					name: companionQuery[key],
				};
				let i = 1;
				let colorList: RGBColor[] = [];
				while (companionQuery[key + "Color" + i]) {
					colorList.push(colors.clothing[companionQuery[key + "Color" + i++] as string]);
				}
				if (colorList.length > 0) {
					companion.attributes[key].color = colorList;
				}
		}
	}
	return companion;
};

export const drawLayer = async ({
	companion,
	canvas,
	layers,
	drawIndex,
	usedBatches,
	paint,
	createCanvas,
	replaceColor,
	translateImage,
	debugEscape,
	debugDeep,
}: {
	companion: Companion;
	canvas: HTMLCanvasElement | Buffer;
	layers: [LayerWithData, AttributeSelection?, boolean?][];
	drawIndex: number;
	usedBatches: Set<string>;
	paint: (
		input: HTMLImageElement | HTMLCanvasElement | Buffer,
		target: HTMLCanvasElement | Buffer,
		blendMode?: "source-over" | "multiply" | "destination-over"
	) => HTMLImageElement | HTMLCanvasElement | Promise<Buffer>;
	createCanvas: () => HTMLCanvasElement | Promise<Buffer>;
	replaceColor: (
		input: HTMLImageElement | HTMLCanvasElement | Buffer,
		color: RGBColor
	) => HTMLImageElement | HTMLCanvasElement | Promise<Buffer>;
	translateImage: (
		input: HTMLImageElement | HTMLCanvasElement | Buffer,
		pose: Pose
	) => HTMLImageElement | HTMLCanvasElement | Promise<Buffer>;
	debugEscape?: (input: Buffer) => void;
	debugDeep?: boolean;
}) => {
	const [layer, selection, needsTranslation] = layers[drawIndex];
	let imageToDraw: HTMLImageElement | HTMLCanvasElement | Buffer;

	if (layer.batch?.length) {
		let tempCanvas = await createCanvas();
		usedBatches.add(layer.batch[0]);

		const batchIndices = layers.reduce<number[]>((indices, curr, k) => {
			if (curr[0].batch?.length && curr[0].batch.indexOf(layer.batch[0]) !== -1) {
				indices.push(k);
			}
			return indices;
		}, []);

		const batchLayers = layers.map((l, k) => {
			const { batch, ...rest } = l[0];
			let newBatch = [...(batch || [])];
			if (batch?.length) {
				const currentBatchIndex = batch?.indexOf(layer.batch[0]);
				if (currentBatchIndex > -1) {
					newBatch.splice(currentBatchIndex, 1);
				}
			}
			if ("colorType" in rest && rest.colorType === "inherit") {
				return [
					{
						color: getColor(layers[k + 1][0], companion, layers[k + 1][1]),
						batch: newBatch,
						...rest,
					} as LayerStaticWithData,
					l[1],
					l[2],
				] as [LayerStaticWithData, AttributeSelection?, boolean?];
			}
			return [{ batch: newBatch, ...rest }, l[1], l[2]] as [
				LayerStaticWithData,
				AttributeSelection?,
				boolean?
			];
		});

		if (batchIndices.length) {
			for (let j = 0; j < batchIndices.length; j++) {
				const result = await drawLayer({
					companion,
					canvas: tempCanvas,
					layers: batchLayers,
					drawIndex: batchIndices[j],
					usedBatches,
					paint,
					createCanvas,
					replaceColor,
					translateImage,
					debugEscape,
					debugDeep: true,
				});
				if (Buffer.isBuffer(tempCanvas) && Buffer.isBuffer(result)) {
					tempCanvas = result;
				}
			}
		}
		imageToDraw = tempCanvas;
	} else {
		let color: RGBColor | undefined;
		if ("color" in layer) {
			color = layer.color;
		} else if ("colorType" in layer) {
			if (layer.colorType == "inherit") {
				color = getColor(layers[drawIndex + 1][0], companion, layers[drawIndex + 1][1]);
			} else {
				color = getColor(layer, companion, selection);
			}
		}
		imageToDraw = color ? await replaceColor(layer.imgData, color) : layer.imgData;
		imageToDraw = needsTranslation
			? await translateImage(imageToDraw, companion.properties.pose)
			: imageToDraw;
	}
	if (!imageToDraw) throw new Error("No image returned");
	// Everything before this works fine
	try {
		const test = await paint(imageToDraw, canvas, layer.blendMode);

		return test;
	} catch (error) {
		console.error(error);
	}
};

export const messageToSign =
	"Box me up! \n\nSign this message to prove you own this address. Signing is free and will not cost you any gas.";

const isObject = (obj: any) => typeof obj === "object" && !Array.isArray(obj) && obj !== null;

const getKeyType = (key: string) => {
	switch (key) {
		case "tokenId":
			throw new Error("Cannot change tokenId");
		case "name":
			return "name";
		case "pose":
		case "gender":
		case "skinColor":
		case "hairColor":
		case "backgroundColor":
			return "property";
		default:
			if (key.match(colorRegEx)) {
				return "color";
			}
			if (key in selectableAttributes) {
				return "attribute";
			}
	}
};

export const rarityToCost = {
	common: 500,
	uncommon: 1000,
	rare: 5000,
	mythic: 10000,
};

const getKeyCost = (key: string, value: string) => {
	switch (getKeyType(key)) {
		case "name":
			return 1;
		case "property":
			return 250;
		case "color":
			return 100;
		case "attribute":
			const match = selectableAttributes[key].variants.find((v) => v.name === value);
			if (!match) throw new Error("Invalid attribute value");
			return rarityToCost[match.rarity || "common"];
	}
};

export const getDifferences = (oldCompanion: Companion, newCompanion: Companion) => {
	const differences: {
		cost: number;
		prev: string;
		curr: string;
		key: string;
		type: string;
	}[] = [];

	const oldKeys = companionToKeys(oldCompanion);
	const newKeys = companionToKeys(newCompanion);

	for (const key in newKeys) {
		if (oldKeys.hasOwnProperty(key)) {
			if (newKeys[key] !== oldKeys[key]) {
				differences.push({
					cost: getKeyCost(key, newKeys[key]),
					prev: oldKeys[key],
					curr: newKeys[key],
					key,
					type: getKeyType(key),
				});
			}
		} else {
			differences.push({
				cost: getKeyCost(key, newKeys[key]),
				prev: "",
				curr: newKeys[key],
				key,
				type: getKeyType(key),
			});
		}
	}
	for (const key in oldKeys) {
		if (!newKeys.hasOwnProperty(key)) {
			differences.push({
				cost: 0,
				prev: oldKeys[key],
				curr: "",
				key,
				type: getKeyType(key),
			});
		}
	}
	return differences;
};
