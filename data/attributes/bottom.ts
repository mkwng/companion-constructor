import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const bottom: AttributeDictionary = {
	name: "bottom",
	// isOptional: true,
	variants: [
		{
			attribute: "bottom",
			name: "cropped",
			rarity: "uncommon",
			restrictions: { pose: 2 },
			layers: [
				{
					path: "pose2/02-bottoms/cropped_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "pose2/02-bottoms/cropped_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/02-bottoms/cropped_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "bottom",
			name: "panties",
			rarity: "rare",
			restrictions: { gender: "f", pose: 2 },
			layers: [
				{
					path: "pose2/02-bottoms/panties_1-g_f.png",
					colorType: "clothing",
				},
				{
					path: "pose2/02-bottoms/panties_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "bottom",
			name: "shortshorts",
			rarity: "uncommon",
			restrictions: { gender: "f", pose: 2 },
			layers: [
				{
					path: "pose2/02-bottoms/shortshorts_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "pose2/02-bottoms/shortshorts_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/02-bottoms/shortshorts_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "bottom",
			name: "skirt",
			rarity: "uncommon",
			restrictions: { gender: "f", pose: 2 },
			layers: [
				{
					path: "pose2/02-bottoms/skirt_1-v_skin-b_multiply-g_f.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/02-bottoms/skirt_2-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "pose2/02-bottoms/skirt_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/02-bottoms/skirt_4-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "bottom",
			name: "waist",
			rarity: "uncommon",
			restrictions: { pose: 2 },
			layers: [
				{
					path: "pose2/02-bottoms/waist_1-v_clothing-g_f.png",
					colorType: "clothing",
				},
				{
					path: "pose2/02-bottoms/waist_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/02-bottoms/waist_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "bottom",
			name: "pants",
			restrictions: { pose: 2 },
			layers: [
				{ path: "pose2/02-bottoms/pants_1-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/02-bottoms/pants_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/02-bottoms/pants_3-c_outline.png", color: colors.default.black },
			],
		},
	],
};

let bottomVariants = ["cropped", "panties", "shortshorts", "skirt", "waist", "pants"] as const;
export type BottomVariant = typeof bottomVariants[number];
