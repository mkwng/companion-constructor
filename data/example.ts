import { colors } from "./colors";
import { Companion } from "./types";

export const companionExample: Companion = {
	name: "Companion 1",
	properties: {
		gender: "m",
		pose: 2,
		skin: colors.skin["3"],
		hair: colors.hair.purple,
		background: colors.background.bga,
	},
	attributes: {
		hair: { name: "crop" },
		eyes: { name: "open" },
		brows: { name: "bushy" },
		mouth: { name: "handlebars" },
		nose: { name: "hook" },
	},
};
