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
			layers: [
				{
					path: {
						1: "/attributes/pose1/02-shoes/hightops_1-v_clothing.png",
						2: "/attributes/pose2/06-shoes/hightops_1-v_clothing.png",
						3: "/attributes/pose3/11-shoes/hightops_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/02-shoes/hightops_2-c_shadow.png",
						2: "/attributes/pose2/06-shoes/hightops_3-c_shadow.png",
						3: "/attributes/pose3/11-shoes/hightops_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/02-shoes/hightops_3-c_white.png",
						2: "/attributes/pose2/06-shoes/hightops_4-c_outline.png",
						3: "/attributes/pose3/11-shoes/hightops_4-c_outline.png",
					},
					color: colors.default.black,
				},
				{
					path: {
						1: "/attributes/pose1/02-shoes/hightops_4-c_outline.png",
						2: "/attributes/pose2/06-shoes/hightops_4-c_white.png",
						3: "/attributes/pose3/11-shoes/hightops_3-c_white.png",
					},
					color: colors.default.white,
				},
			],
		},
		{
			attribute: "shoes",
			name: "rollerblades",
			rarity: "mythic",
			layers: [
				{
					path: {
						1: "/attributes/pose1/02-shoes/rollerblades_1-v_clothing.png",
						2: "/attributes/pose2/06-shoes/rollerblades_1-v_clothing.png",
						3: "/attributes/pose3/11-shoes/rollerblades_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/02-shoes/rollerblades_2-v_clothing.png",
						2: "/attributes/pose2/06-shoes/rollerblades_2-v_clothing.png",
						3: "/attributes/pose3/11-shoes/rollerblades_2-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/02-shoes/rollerblades_3-c_shadow.png",
						2: "/attributes/pose2/06-shoes/rollerblades_3-c_shadow.png",
						3: "/attributes/pose3/11-shoes/rollerblades_3-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/02-shoes/rollerblades_4-c_outline.png",
						2: "/attributes/pose2/06-shoes/rollerblades_4-c_outline.png",
						3: "/attributes/pose3/11-shoes/rollerblades_4-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "shoes",
			name: "sneaks",
			layers: [
				{
					path: {
						1: "/attributes/pose1/02-shoes/sneaks_1-v_clothing.png",
						2: "/attributes/pose2/06-shoes/sneaks_1-v_clothing.png",
						3: "/attributes/pose3/11-shoes/sneaks_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/02-shoes/sneaks_2-c_shadow.png",
						2: "/attributes/pose2/06-shoes/sneaks_2-c_shadow.png",
						3: "/attributes/pose3/11-shoes/sneaks_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/02-shoes/sneaks_3-c_outline.png",
						2: "/attributes/pose2/06-shoes/sneaks_3-c_outline.png",
						3: "/attributes/pose3/11-shoes/sneaks_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
	],
};

let shoesVariants = ["hightops", "rollerblades", "sneaks"] as const;
export type ShoesVariant = typeof shoesVariants[number];
