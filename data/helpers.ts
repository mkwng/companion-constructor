import { poses } from "./poses";
import { AttributeSelection, Layer } from "./types";

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
