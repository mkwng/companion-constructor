import { selectableAttributes } from "./attributes";
import { colors } from "./colors";
import { colorsRequired, isCompatible } from "./helpers";
import { AttributeSelection, Companion, Restrictions, RGBColor } from "./types";

const randomElementFromArray = (array) => {
	return array[Math.floor(Math.random() * array.length)];
};
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export var randomProperty = function (obj) {
	var keys = Object.keys(obj);
	return obj[keys[(keys.length * Math.random()) << 0]];
};

export const randomCompanion = (hideRare?: boolean): Companion => {
	const companionProps: Companion["properties"] = {
		pose: Math.floor(Math.random() * 3) + 1,
		gender: Math.random() < 0.5 ? "m" : "f",
		skin: randomProperty(colors.skin),
		hair: randomProperty(colors.hair),
		background: randomProperty(colors.background),
	};

	const companionAttributes: { [key: string]: AttributeSelection } = {};

	const restrictions: Restrictions[] = [
		{
			pose: companionProps.pose,
			gender: companionProps.gender,
		},
	];

	shuffleArray(Object.keys(selectableAttributes)).forEach((key) => {
		// TODO: Not all variants are equally common

		// Check if each variant is valid and put them in an array
		const listOfPossibles = [];
		selectableAttributes[key].variants.forEach((variant) => {
			// Check if the restrictions are met
			if (!isCompatible(variant.restrictions, restrictions)) return;
			let quantity = variant.rarity
				? (() => {
						switch (variant.rarity) {
							case "oneofone":
								return 0;
							case "mythic":
								return hideRare ? 0 : 1;
							case "rare":
								return 5;
							case "uncommon":
								return 10;
							case "common":
							default:
								return 15;
						}
				  })()
				: 15;
			for (let i = 0; i < quantity; i++) {
				listOfPossibles.push(variant.name);
			}
		});
		if (selectableAttributes[key].isOptional) {
			if (selectableAttributes[key].appearsIn === 0) {
				listOfPossibles.splice(0, listOfPossibles.length).push(undefined);
			} else {
				const emptySlots = selectableAttributes[key].appearsIn
					? listOfPossibles.length / (selectableAttributes[key].appearsIn || 1)
					: 1;
				for (let i = 0; i < emptySlots - listOfPossibles.length; i++) {
					listOfPossibles.push(undefined);
				}
			}
		}

		const randomName = randomElementFromArray(listOfPossibles);
		const randomVariant = selectableAttributes[key].variants.find((variant) => variant.name === randomName);

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
			restrictions.push(randomVariant.restrictions);
		}
	});
	return {
		name: "Random",
		properties: companionProps,
		attributes: companionAttributes,
	} as Companion;
};
