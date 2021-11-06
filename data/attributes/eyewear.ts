import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const eyewear: AttributeDictionary = {
	name: "eyewear",
	needsTranslation: true,
	isOptional: true,
	variants: [
		{
			name: "rectangularHalf",
			layers: [
				{
					path: "face/09-eyewear/a_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "face/09-eyewear/a_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "rectangular",
			layers: [
				{
					path: "face/09-eyewear/b_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "face/09-eyewear/b_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "thin",
			layers: [
				{
					path: "face/09-eyewear/c_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "face/09-eyewear/c_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "face/09-eyewear/c_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "roundedColorLens",
			layers: [
				{
					path: "face/09-eyewear/d_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "face/09-eyewear/d_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "face/09-eyewear/d_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "rounded",
			layers: [
				{
					path: "face/09-eyewear/e_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "face/09-eyewear/e_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "eyepatch",
			layers: [
				{
					path: "face/09-eyewear/eyepatch.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "roundedColorFrames",
			layers: [
				{
					path: "face/09-eyewear/f_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "face/09-eyewear/f_2-v_clothing.png",
					colorType: "clothing",
				},
			],
		},

		{
			name: "vr",
			layers: [
				{
					path: "face/09-eyewear/vr_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/09-eyewear/vr_2-c_black.png",
					color: colors.clothing.black,
				},
				{
					path: "face/09-eyewear/vr_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "face/09-eyewear/vr_4-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "face/09-eyewear/vr_5-c_outline.png",
					color: colors.default.black,
				},
			],
		},
	],
};

let eyewearVariants = [
	"rectangularHalf",
	"rectangular",
	"thin",
	"roundedColorLens",
	"rounded",
	"eyepatch",
	"roundedColorFrames",
	"vr",
] as const;
export type EyewearVariant = typeof eyewearVariants[number];
