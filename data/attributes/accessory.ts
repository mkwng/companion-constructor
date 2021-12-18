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
					path: "/attributes/pose2/07-backaccessory/backpack_01-v_clothing.png",
					colorType: "clothing",
					batch: ["accessory"],
					blendMode: "destination-over",
				},
				{
					path: "/attributes/pose2/07-backaccessory/backpack_02-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
					batch: ["accessory"],
				},
				{
					path: "/attributes/pose2/07-backaccessory/backpack_03-c_outline.png",
					color: colors.default.black,
					batch: ["accessory"],
				},
			],
		},
		{
			attribute: "accessory",
			name: "sword",
			rarity: "mythic",
			layers: [
				{
					path: "/attributes/pose2/07-backaccessory/sword_0-c_gray.png",
					color: colors.clothing.gray,
					batch: ["accessory"],
					blendMode: "destination-over",
				},
				{
					path: "/attributes/pose2/07-backaccessory/sword_1-c_white.png",
					color: colors.default.white,
					batch: ["accessory"],
				},
				{
					path: "/attributes/pose2/07-backaccessory/sword_2-v_clothing.png",
					colorType: "clothing",
					batch: ["accessory"],
				},
				{
					path: "/attributes/pose2/07-backaccessory/sword_3-c_outline.png",
					color: colors.default.black,
					batch: ["accessory"],
				},
			],
		},
	],
};

let accessoryVariants = ["backpack", "sword"] as const;
export type AccessoryVariant = typeof accessoryVariants[number];
