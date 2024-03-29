import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const eyewear: AttributeDictionary = {
	name: "eyewear",
	needsTranslation: true,
	isOptional: true,
	appearsIn: 0.125,
	variants: [
		{
			attribute: "eyewear",
			name: "rectangularHalf",
			rarity: "rare",
			restrictions: { profileShape: "encroached" },
			layers: [
				{
					path: "/attributes/face/09-eyewear/a_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/09-eyewear/a_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "eyewear",
			name: "rectangular",
			rarity: "uncommon",
			restrictions: { profileShape: "encroached" },
			layers: [
				{
					path: "/attributes/face/09-eyewear/b_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/09-eyewear/b_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "eyewear",
			name: "thin",
			rarity: "rare",
			restrictions: { profileShape: "encroached" },
			layers: [
				{
					path: "/attributes/face/09-eyewear/c_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/09-eyewear/c_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/09-eyewear/c_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "eyewear",
			name: "roundedColorLens",
			restrictions: { profileShape: "encroached" },
			layers: [
				{
					path: "/attributes/face/09-eyewear/d_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/09-eyewear/d_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/09-eyewear/d_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "eyewear",
			name: "rounded",
			restrictions: { profileShape: "encroached" },
			layers: [
				{
					path: "/attributes/face/09-eyewear/e_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/09-eyewear/e_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "eyewear",
			name: "eyepatch",
			restrictions: { profileShape: "encroached" },
			layers: [
				{
					path: "/attributes/face/09-eyewear/eyepatch.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "eyewear",
			name: "roundedColorFrames",
			restrictions: { profileShape: "encroached" },
			layers: [
				{
					path: "/attributes/face/09-eyewear/f_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/09-eyewear/f_2-v_clothing.png",
					colorType: "clothing",
				},
			],
		},

		{
			attribute: "eyewear",
			name: "vr",
			rarity: "mythic",
			restrictions: { profileShape: "encroached" },
			layers: [
				{
					path: "/attributes/face/09-eyewear/vr_1-c_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/09-eyewear/vr_2-c_black.png",
					color: colors.clothing.black,
				},
				{
					path: "/attributes/face/09-eyewear/vr_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/09-eyewear/vr_4-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/09-eyewear/vr_5-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "eyewear",
			name: "aviators",
			rarity: "uncommon",
			layers: [
				{
					path: "/attributes/face/09-eyewear/aviators_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/09-eyewear/aviators_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/09-eyewear/aviators_3-c_outline.png",
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
	"aviators",
] as const;
export type EyewearVariant = typeof eyewearVariants[number];
