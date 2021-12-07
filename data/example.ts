import { colors } from "./colors";
import { Companion } from "./types";

export const companionExample: Companion = {
	name: null,
	properties: {
		gender: "m",
		pose: 2,
		skin: colors.skin["2"],
		hair: colors.hair.black,
		background: colors.background.bga,
	},
	attributes: {
		hair: { name: "crop" },
		eyes: { name: "default" },
		brows: { name: "neutral" },
		mouth: { name: "neutral" },
		nose: { name: "longstraight" },
	},
};
