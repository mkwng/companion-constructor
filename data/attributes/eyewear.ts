import { colors } from "../colors";
import { AttributeDictionary } from "../helpers";

export const eyewear: AttributeDictionary = {
	needsTranslation: true,
	isOptional: true,
	variants: [
		{
			name: "rectangularHalf",
			layers: [
				{
					path: "face/09-eyewear/a_1-c_white.png",
					color: colors.default.white,
					order: 1,
				},
				{
					path: "face/09-eyewear/a_2-c_outline.png",
					color: colors.default.black,
					order: 2,
				},
			],
		},

		{
			name: "rectangular",
			layers: [
				{
					path: "face/09-eyewear/b_1-c_white.png",
					color: colors.default.white,
					order: 1,
				},
				{
					path: "face/09-eyewear/b_2-c_outline.png",
					color: colors.default.black,
					order: 2,
				},
			],
		},

		{
			name: "thin",
			layers: [
				{
					path: "face/09-eyewear/c_1-v_clothing.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/09-eyewear/c_2-c_white.png",
					color: colors.default.white,
					order: 2,
				},
				{
					path: "face/09-eyewear/c_3-c_outline.png",
					color: colors.default.black,
					order: 3,
				},
			],
		},

		{
			name: "roundedColorLens",
			layers: [
				{
					path: "face/09-eyewear/d_1-v_clothing.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/09-eyewear/d_2-c_white.png",
					color: colors.default.white,
					order: 2,
				},
				{
					path: "face/09-eyewear/d_3-c_outline.png",
					color: colors.default.black,
					order: 3,
				},
			],
		},

		{
			name: "rounded",
			layers: [
				{
					path: "face/09-eyewear/e_1-c_white.png",
					color: colors.default.white,
					order: 1,
				},
				{
					path: "face/09-eyewear/e_2-c_outline.png",
					color: colors.default.black,
					order: 2,
				},
			],
		},

		{
			name: "eyepatch",
			layers: [
				{
					path: "face/09-eyewear/eyepatch.png",
					colorType: "static",
					order: 1,
				},
			],
		},

		{
			name: "roundedColorFrames",
			layers: [
				{
					path: "face/09-eyewear/f_1-c_white.png",
					color: colors.default.white,
					order: 1,
				},
				{
					path: "face/09-eyewear/f_2-v_clothing.png",
					color: colors.default.black,
					order: 2,
				},
			],
		},

		{
			name: "vr",
			layers: [
				{
					path: "face/09-eyewear/vr_1-c_skin-b_multiply.png",
					colorType: "skinShadow",
					order: 1,
				},
				{
					path: "face/09-eyewear/vr_2.png",
					colorType: "static",
					order: 2,
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
