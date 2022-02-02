import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const mask: AttributeDictionary = {
	name: "mask",
	needsTranslation: true,
	isOptional: true,
	appearsIn: 0.05,
	variants: [
		{
			attribute: "mask",
			name: "facemask",
			hides: ["nose", "mouth"],
			layers: [
				{
					path: "/attributes/face/11-nose/fullmask_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/11-nose/fullmask_2-v_clothing-b_multiply.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/fullmask_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "mask",
			name: "warrior",
			hides: ["nose", "mouth"],
			rarity: "mythic",
			layers: [
				{
					path: "/attributes/face/11-nose/warrior_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/11-nose/warrior_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/11-nose/warrior_3-c_black-b_multiply.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/warrior_4-c_white.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mask",
			name: "medical",
			hides: ["nose", "mouth"],
			layers: [
				{
					path: "/attributes/face/11-nose/mask_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/11-nose/mask_2.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/mask_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "mask",
			name: "shl0ms",
			rarity: "oneofone",
			hides: ["bodyBack", "neck", "face", "blemish", "eyes", "brows", "mouth", "facialhair", "nose", "bodyFront"],
			layers: [
				{
					path: { 2: "/attributes/special/shl0ms.png" },
					blendMode: "destination-over",
				},
			],
		},
	],
};

let maskVariants = ["/attributes/facemask", "warrior", "medical"] as const;

export type MaskVariant = typeof maskVariants[number];
