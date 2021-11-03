import { colors } from "./colors";
import { Companion } from "./helpers";

export const companionExample: Companion = {
	name: "Companion 1",
	properties: {
		gender: "m",
		pose: 2,
		skin: { r: 155, g: 155, b: 155 },
		hair: { r: 205, g: 205, b: 205 },
	},
	attributes: {
		background: { color: colors.default.red },
		blemish: { name: "bandage" },
		hair: { name: "crop" },
		eyes: { name: "open" },
		brows: { name: "bushy" },
		mouth: { name: "handlebars" },
		nose: { name: "hook" },
	},
};
