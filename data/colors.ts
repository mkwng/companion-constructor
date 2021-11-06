import { RGBColor } from "./types";

export const colors: {
	[key: string]: { [key: string]: RGBColor };
} = {
	hair: {
		gray: { r: 191, g: 186, b: 172 },
		yellow: { r: 237, g: 166, b: 62 },
		green: { r: 146, g: 154, b: 123 },
		purple: { r: 138, g: 116, b: 140 },
		red: { r: 187, g: 90, b: 35 },
		brown: { r: 134, g: 59, b: 17 },
		black: { r: 37, g: 36, b: 49 },
	},
	skin: {
		"0": { r: 251, g: 224, b: 192 },
		"1": { r: 255, g: 211, b: 187 },
		"2": { r: 235, g: 187, b: 166 },
		"3": { r: 186, g: 129, b: 114 },
		"4": { r: 152, g: 103, b: 80 },
		"5": { r: 101, g: 60, b: 42 },
	},
	clothing: {
		white: { r: 248, g: 241, b: 230 },
		yellow: { r: 238, g: 197, b: 82 },
		lightblue: { r: 163, g: 192, b: 191 },
		tan: { r: 204, g: 140, b: 96 },
		forest: { r: 112, g: 125, b: 80 },
		blue: { r: 60, g: 81, b: 207 },
		green: { r: 75, g: 164, b: 103 },
		red: { r: 227, g: 85, b: 85 },
		orange: { r: 233, g: 136, b: 94 },
		gray: { r: 91, g: 94, b: 88 },
		black: { r: 69, g: 61, b: 75 },
	},
	background: {
		bga: { r: 243, g: 232, b: 190 },
		bgb: { r: 239, g: 209, b: 196 },
		bgc: { r: 214, g: 212, b: 208 },
		bgd: { r: 229, g: 218, b: 179 },
		bge: { r: 193, g: 182, b: 168 },
	},
	default: {
		white: { r: 248, g: 241, b: 230 },
		black: { r: 37, g: 36, b: 49 },
		red: { r: 227, g: 85, b: 85 },
		yellow: { r: 238, g: 197, b: 82 },
		green: { r: 75, g: 164, b: 103 },
		blue: { r: 60, g: 81, b: 207 },
		gray: { r: 191, g: 186, b: 172 },
	},
};
