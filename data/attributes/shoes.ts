import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const shoes: AttributeDictionary = {
	name: "shoes",
	isOptional: true,
	appearsIn: 0.9,
	variants: [
		{
			attribute: "shoes",
			name: "hightops",
			restrictions: { pose: 2 },
			layers: [
				{
					path: "pose2/06-shoes/hightops_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "pose2/06-shoes/hightops_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/06-shoes/hightops_4-c_outline.png",
					color: colors.default.black,
				},
				{
					path: "pose2/06-shoes/hightops_4-c_white.png",
					color: colors.default.white,
				},
			],
		},
		{
			attribute: "shoes",
			name: "rollerblades",
			rarity: "mythic",
			restrictions: { pose: 2 },
			layers: [
				{
					path: "pose2/06-shoes/rollerblades_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "pose2/06-shoes/rollerblades_2-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "pose2/06-shoes/rollerblades_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/06-shoes/rollerblades_4-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "shoes",
			name: "sneaks",
			restrictions: { pose: 2 },
			layers: [
				{
					path: "pose2/06-shoes/sneaks_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "pose2/06-shoes/sneaks_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/06-shoes/sneaks_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},
	],
};

let shoesVariants = ["hightops", "rollerblades", "sneaks"] as const;
export type ShoesVariant = typeof shoesVariants[number];
