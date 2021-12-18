import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const accessory: AttributeDictionary = {
	name: "accessory",
	isOptional: true,
	appearsIn: 0.01,
	variants: [
		{
			attribute: "accessory",
			name: "backpack",
			rarity: "mythic",
			layers: [
				{
					path: {
						2: "/attributes/pose2/07-backaccessory/backpack_01-v_clothing.png",
						4: "/attributes/pose4/10-accessory/backpack_1-v_clothing.png",
					},
					colorType: "inherit",
					batch: ["accessory"],
					blendMode: "destination-over",
				},
				{
					path: {
						1: "/attributes/pose1/14-accessory/backpack_1-v_clothing.png",
						2: "/attributes/face/09-eyewear/nothing-q_15.png",
						4: "/attributes/pose4/10-accessory/backpack_4-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/14-accessory/backpack_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/14-accessory/backpack_3-c_outline.png",
						4: "/attributes/pose4/10-accessory/backpack_5-c_outline.png",
					},
					color: colors.default.black,
				},
				{
					path: {
						1: "/attributes/pose1/14-accessory/backpack_2-c_shadow.png",
						2: "/attributes/pose2/07-backaccessory/backpack_02-c_shadow.png",
						4: "/attributes/pose4/10-accessory/backpack_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
					batch: ["accessory"],
				},
				{
					path: {
						2: "/attributes/pose2/07-backaccessory/backpack_03-c_outline.png",
						4: "/attributes/pose4/10-accessory/backpack_3-c_outline.png",
					},
					color: colors.default.black,
					batch: ["accessory"],
				},
				{
					path: {
						4: "/attributes/pose4/10-accessory/backpack_4-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						4: "/attributes/pose4/10-accessory/backpack_5-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "accessory",
			name: "sword",
			rarity: "mythic",
			layers: [
				{
					path: { 1: "/attributes/pose1/14-accessory/sword_1-c_black.png" },
					color: colors.clothing.gray,
				},
				{
					path: { 1: "/attributes/pose1/14-accessory/sword_2-c_shadow.png" },
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: { 1: "/attributes/pose1/14-accessory/sword_3-c_white.png" },
					color: colors.default.white,
				},
				{
					path: {
						2: "/attributes/pose2/07-backaccessory/sword_0-c_gray.png",
						3: "/attributes/pose3/12-accessory/sword_0-c_gray.png",
						4: "/attributes/pose4/10-accessory/sword_1-c_black.png",
					},
					color: colors.clothing.gray,
					batch: ["accessory"],
					blendMode: "destination-over",
				},
				{
					path: {
						2: "/attributes/pose2/07-backaccessory/sword_1-c_white.png",
						3: "/attributes/pose3/12-accessory/sword_1-c_white.png",
						4: "/attributes/pose4/10-accessory/sword_3-c_white.png",
					},
					color: colors.default.white,
					batch: ["accessory"],
				},
				{
					path: {
						2: "/attributes/pose2/07-backaccessory/sword_2-v_clothing.png",
						3: "/attributes/pose3/12-accessory/sword_2-v_clothing.png",
						4: "/attributes/pose4/10-accessory/sword_4-v_clothing.png",
					},
					colorType: "inherit",
					batch: ["accessory"],
				},
				{
					path: {
						1: "/attributes/pose1/14-accessory/sword_4-v_clothing.png",
						2: "/attributes/face/09-eyewear/nothing-q_15.png",
						3: "/attributes/face/09-eyewear/nothing-q_15.png",
						4: "/attributes/face/09-eyewear/nothing-q_15.png",
					},
					colorType: "clothing",
				},
				{
					path: { 1: "/attributes/pose1/14-accessory/sword_5-c_outline.png" },
					color: colors.default.black,
				},
				{
					path: {
						2: "/attributes/pose2/07-backaccessory/sword_3-c_outline.png",
						3: "/attributes/pose3/12-accessory/sword_3-c_outline.png",
						4: "/attributes/pose4/10-accessory/sword_5-c_outline.png",
					},
					color: colors.default.black,
					batch: ["accessory"],
				},
			],
		},
	],
};

let accessoryVariants = ["backpack", "sword"] as const;
export type AccessoryVariant = typeof accessoryVariants[number];
