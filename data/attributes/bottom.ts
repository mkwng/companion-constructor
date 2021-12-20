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
			layers: [
				{
					path: {
						1: "/attributes/pose1/02-bottom/cropped_1-v_clothing.png",
						2: "/attributes/pose2/02-bottoms/cropped_1-v_clothing.png",
						3: "/attributes/pose3/10-bottom/cropped_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/cropped_2-c_shadow.png",
						2: "/attributes/pose2/02-bottoms/cropped_2-c_shadow.png",
						3: "/attributes/pose3/10-bottom/cropped_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/cropped_3-c_outline.png",
						2: "/attributes/pose2/02-bottoms/cropped_3-c_outline.png",
						3: "/attributes/pose3/10-bottom/cropped_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "bottom",
			name: "panties",
			rarity: "rare",
			restrictions: { gender: "f" },
			layers: [
				{
					path: {
						2: "/attributes/pose2/02-bottoms/panties_1-g_f.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						2: "/attributes/pose2/02-bottoms/panties_2-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "bottom",
			name: "shortshorts",
			rarity: "uncommon",
			restrictions: { gender: "f" },
			layers: [
				{
					path: {
						1: "/attributes/pose1/02-bottom/shortshorts_1-v_clothing-g_f.png",
						2: "/attributes/pose2/02-bottoms/shortshorts_1-v_clothing.png",
						3: "/attributes/pose3/10-bottom/shortshorts_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/shortshorts_2-c_shadow.png",
						2: "/attributes/pose2/02-bottoms/shortshorts_2-c_shadow.png",
						3: "/attributes/pose3/10-bottom/shortshorts_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/shortshorts_3-c_outline.png",
						2: "/attributes/pose2/02-bottoms/shortshorts_3-c_outline.png",
						3: "/attributes/pose3/10-bottom/shortshorts_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "bottom",
			name: "skirt",
			rarity: "uncommon",
			restrictions: { gender: "f" },
			layers: [
				{
					path: {
						2: "/attributes/pose2/02-bottoms/skirt_1-v_skin-b_multiply-g_f.png",
					},
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/skirt_1-v_clothing.png",
						2: "/attributes/pose2/02-bottoms/skirt_2-v_clothing.png",
						3: "/attributes/pose3/10-bottom/skirt_1-v_clothing-g_f.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/skirt_2-c_shadow.png",
						2: "/attributes/pose2/02-bottoms/skirt_3-c_shadow.png",
						3: "/attributes/pose3/10-bottom/skirt_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/skirt_3-c_outline.png",
						2: "/attributes/pose2/02-bottoms/skirt_4-c_outline.png",
						3: "/attributes/pose3/10-bottom/skirt_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "bottom",
			name: "waist",
			rarity: "uncommon",
			layers: [
				{
					path: {
						1: "/attributes/pose1/02-bottom/pants_1-v_clothing.png",
						2: "/attributes/pose2/02-bottoms/waist_1-v_clothing-g_f.png",
						3: "/attributes/pose3/10-bottom/pants_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/pants_2-c_shadow.png",
						2: "/attributes/pose2/02-bottoms/waist_2-c_shadow.png",
						3: "/attributes/pose3/10-bottom/pants_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/waist_3-c_outline.png",
						2: "/attributes/pose2/02-bottoms/waist_3-c_outline.png",
						3: "/attributes/pose3/10-bottom/waist_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "bottom",
			name: "pants",
			layers: [
				{
					path: {
						1: "/attributes/pose1/02-bottom/pants_1-v_clothing.png",
						2: "/attributes/pose2/02-bottoms/pants_1-v_clothing.png",
						3: "/attributes/pose3/10-bottom/pants_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/pants_2-c_shadow.png",
						2: "/attributes/pose2/02-bottoms/pants_2-c_shadow.png",
						3: "/attributes/pose3/10-bottom/pants_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/02-bottom/pants_3-c_outline.png",
						2: "/attributes/pose2/02-bottoms/pants_3-c_outline.png",
						3: "/attributes/pose3/10-bottom/pants_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
	],
};

let bottomVariants = ["cropped", "panties", "shortshorts", "skirt", "waist", "pants"] as const;
export type BottomVariant = typeof bottomVariants[number];
