import { colors } from "./colors";
import { poses } from "./poses";
import { AttributeSelection, Companion, Layer, Pose, RGBColor } from "./types";

export const getLayers = (companion) => {
	const pose = poses[companion.properties.pose];
	let layers: [Layer, AttributeSelection?][] = [];
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
				let result: [Layer, AttributeSelection?] = [layer];
				if (selection) {
					result.push(selection);
				}
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
