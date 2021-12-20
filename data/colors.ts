import { RGBColor } from "./types";

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(color: RGBColor) {
	return "" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
}

export const colors: {
	[key: string]: { [key: string]: RGBColor };
} = {
	hair: {
		lightblue: { r: 166, g: 211, b: 209 },
		gray: { r: 191, g: 186, b: 172 },
		yellow: { r: 237, g: 166, b: 62 },
		green: { r: 146, g: 154, b: 123 },
		purple: { r: 138, g: 116, b: 140 },
		blue: { r: 72, g: 96, b: 108 },
		red: { r: 187, g: 90, b: 35 },
		pink: { r: 241, g: 90, b: 154 },
		brown: { r: 134, g: 59, b: 17 },
		black: { r: 37, g: 36, b: 49 },
	},
	skin: {
		"0": { r: 253, g: 231, b: 206 },
		"1": { r: 247, g: 234, b: 194 },
		"2": { r: 251, g: 224, b: 192 },
		"3": { r: 255, g: 211, b: 187 },
		"4": { r: 235, g: 187, b: 166 },
		"5": { r: 247, g: 190, b: 147 },
		"6": { r: 186, g: 129, b: 114 },
		"7": { r: 152, g: 103, b: 80 },
		"9": { r: 196, g: 92, b: 96 },
		"8": { r: 147, g: 88, b: 76 },
		"10": { r: 101, g: 60, b: 42 },
	},
	clothing: {
		white: { r: 248, g: 241, b: 230 },
		offwhite: { r: 252, g: 233, b: 225 },
		lightblue: { r: 163, g: 192, b: 191 },
		yellow: { r: 238, g: 197, b: 82 },
		tan: { r: 204, g: 140, b: 96 },
		forest: { r: 112, g: 125, b: 80 },
		darkgreen: { r: 91, g: 94, b: 88 },
		green: { r: 75, g: 164, b: 103 },
		lime: { r: 200, g: 246, b: 163 },
		purple: { r: 206, g: 153, b: 207 },
		salmon: { r: 250, g: 201, b: 186 },
		burnt: { r: 227, g: 85, b: 85 },
		red: { r: 254, g: 53, b: 43 },
		blue: { r: 4, g: 54, b: 232 },
		peach: { r: 233, g: 136, b: 94 },
		orange: { r: 254, g: 116, b: 77 },
		black: { r: 69, g: 61, b: 75 },
	},
	background: {
		gray: { r: 214, g: 212, b: 208 },
		stone: { r: 193, g: 182, b: 168 },
		sand: { r: 229, g: 218, b: 179 },
		orange: { r: 245, g: 125, b: 108 },
		yellow: { r: 247, g: 211, b: 115 },
		red: { r: 250, g: 97, b: 91 },
		purple: { r: 92, g: 100, b: 137 },
		blue: { r: 85, g: 107, b: 121 },
	},
	default: {
		black: { r: 25, g: 35, b: 11 },
		white: { r: 248, g: 241, b: 230 },
		red: { r: 250, g: 97, b: 91 },
		yellow: { r: 247, g: 211, b: 115 },
		blue: { r: 85, g: 107, b: 121 },
		gray: { r: 214, g: 212, b: 208 },
	},
};
