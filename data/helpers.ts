import { blemish } from "./attributes/blemish";
import { hair } from "./attributes/hair";
import { eyes } from "./attributes/eyes";
import { brows } from "./attributes/brows";
import { mouth } from "./attributes/mouth";
import { eyewear } from "./attributes/eyewear";
import { headwear } from "./attributes/headwear";
import { nose } from "./attributes/nose";
import { colors } from "./colors";
import { poses } from "./poses";
import {
	AttributeDictionary,
	AttributeSelection,
	Companion,
	Layer,
	Pose,
	RGBColor,
	Variant,
} from "./types";
import { top } from "./attributes/top";
import { bottom } from "./attributes/bottom";

export const getLayers = (companion) => {
	const pose = poses[companion.properties.pose];
	let layers: [Layer, AttributeSelection?, boolean?][] = [];
	pose.forEach((attribute) => {
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
			match.layers.forEach((layer) => {
				let result: [Layer, AttributeSelection?, boolean?] = [
					layer,
					selection,
					attribute.needsTranslation,
				];
				layers.push(result);
			});
		}
	});
	return layers;
};

let colorCount = 0;
export const getColor = (layer: Layer, companion?: Companion, color?: RGBColor[]): RGBColor => {
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
			if (!color) {
				console.log(companion);
				throw new Error(`No colors were specified for layer: ${layer.path}`);
			}
			const temp = color[colorCount++];
			if (colorCount >= color.length) {
				colorCount = 0;
			}
			return temp;
		default:
			return colors.default.black;
	}
};

export const getPath = (layer: Layer, pose?: Pose) => {
	if (typeof layer.path == "string") {
		return "/attributes/" + layer.path;
	} else {
		return "/attributes/" + layer.path[pose];
	}
};

const randomElementFromArray = (array) => {
	return array[Math.floor(Math.random() * array.length)];
};
export var randomProperty = function (obj) {
	var keys = Object.keys(obj);
	return obj[keys[(keys.length * Math.random()) << 0]];
};

export const selectableAttributes: { [key: string]: AttributeDictionary } = {
	blemish,
	hair,
	eyes,
	brows,
	mouth,
	eyewear,
	headwear,
	nose,
	top,
	bottom,
};
export const selectableAttributesArray: AttributeDictionary[] = [
	blemish,
	hair,
	eyes,
	brows,
	mouth,
	eyewear,
	headwear,
	nose,
	top,
	bottom,
];

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

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export const randomCompanion = (): Companion => {
	const companionProps: Companion["properties"] = {
		pose: 2, //Math.floor(Math.random() * 4) + 1,
		gender: Math.random() < 0.5 ? "m" : "f",
		skin: randomProperty(colors.skin),
		hair: randomProperty(colors.hair),
		background: randomProperty(colors.background),
	};

	const companionAttributes: { [key: string]: AttributeSelection } = {};

	const restrictions = {
		pose: companionProps.pose,
		gender: companionProps.gender,
	};

	shuffleArray(Object.keys(selectableAttributes)).forEach((key) => {
		// TODO: Not all variants are equally common

		// Check if each variant is valid and put them in an array
		const listOfPossibles = [];
		selectableAttributes[key].variants.forEach((variant) => {
			// Check if the restrictions are met
			if (variant.restrictions) {
				for (const rkey in variant.restrictions) {
					if (restrictions[rkey] && variant.restrictions[rkey] != restrictions[rkey]) {
						return;
					}
				}
			}
			listOfPossibles.push(variant.name);
		});
		if (selectableAttributes[key].isOptional) {
			for (let i = 0; i < 15; i++) {
				listOfPossibles.push(undefined);
			}
		}

		const randomName = randomElementFromArray(listOfPossibles);
		const randomVariant = selectableAttributes[key].variants.find(
			(variant) => variant.name === randomName
		);

		// Add to attributes
		if (!randomVariant) return;
		// @ts-ignore
		companionAttributes[key] = { name: randomVariant.name };

		// Get colors if necessary
		const neededColors = colorsRequired(key, randomVariant.name);
		let color: RGBColor[] = [];
		while (color.length < neededColors) {
			color.push(randomProperty(colors.clothing));
		}
		if (color.length) {
			companionAttributes[key].color = color;
		}

		// Update restrictions
		if (randomVariant.restrictions) {
			for (const rkey in randomVariant.restrictions) {
				restrictions[rkey] = randomVariant.restrictions[rkey];
			}
		}
	});
	return {
		name: "Random",
		properties: companionProps,
		attributes: companionAttributes,
	} as Companion;
};

export const colorToKey = (
	color: RGBColor,
	colorObject: { [key: string]: RGBColor }
): string => {
	if (!color) {
		debugger;
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
