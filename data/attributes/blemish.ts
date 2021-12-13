import { colors } from "../colors";
import { AttributeDictionary, AttributeSelection, Variant } from "../types";

export const blemish: AttributeDictionary = {
	name: "blemish",
	needsTranslation: true,
	isOptional: true,
	appearsIn: 0.125,
	variants: [
		{
			attribute: "blemish",
			name: "bandage",
			rarity: "uncommon",
			layers: [
				{
					path: "/attributes/face/02-blemish/bandage-c_white.png",
					color: colors.default.white,
					batch: ["head"],
				},
			],
		},
		{
			attribute: "blemish",
			name: "beautyeye",
			rarity: "common",
			layers: [
				{
					path: "/attributes/face/02-blemish/beautyeye-c_skindark-b_multiply.png",
					color: colors.skin["6"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
		},
		{
			attribute: "blemish",
			name: "beautymouth",
			rarity: "common",
			layers: [
				{
					path: "/attributes/face/02-blemish/beautymouth-c_skindark-b_multiply.png",
					color: colors.skin["6"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
		},
		{
			attribute: "blemish",
			name: "blush",
			rarity: "common",
			layers: [
				{
					path: "/attributes/face/02-blemish/blush-c_red.png",
					color: colors.default.red,
					batch: ["head"],
				},
			],
		},
		{
			attribute: "blemish",
			name: "eyescar",
			rarity: "rare",
			layers: [
				{
					path: "/attributes/face/02-blemish/eyescar-c_skin-b_multiply.png",
					color: colors.skin["6"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
		},
		{
			attribute: "blemish",
			name: "freckles",
			rarity: "common",
			layers: [
				{
					path: "/attributes/face/02-blemish/freckles-c_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
		},
		{
			attribute: "blemish",
			name: "stubblelg",
			rarity: "common",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "/attributes/face/02-blemish/stubblelg50-v_hair-g_m.png",
					colorType: "hair",
					batch: ["head"],
				},
			],
		},
		{
			attribute: "blemish",
			name: "stubblemd",
			rarity: "common",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "/attributes/face/02-blemish/stubblemd50-v_hair-g_m.png",
					colorType: "hair",
					batch: ["head"],
				},
			],
		},
		{
			attribute: "blemish",
			name: "stubblesm",
			rarity: "common",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "/attributes/face/02-blemish/stubblesm50-v_hair-g_m.png",
					colorType: "hair",
					batch: ["head"],
				},
			],
		},
		{
			attribute: "blemish",
			name: "tattoos",
			rarity: "uncommon",
			layers: [
				{
					path: "/attributes/face/02-blemish/tattoos-c_skindark-b_multiply.png",
					color: colors.skin["6"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
			// },
			// {
			// 	name: "blushsoft",
			// 	layers: [
			// 		{
			// 			path: "/attributes/face/02-blemish/blushsoft-c_red.png",
			// 			color: colors.default.red,
			// 		},
			// 	],
		},
	],
};

export const blemishVariants = [
	"bandage",
	"beautyeye",
	"beautymouth",
	"blush",
	"eyescar",
	"freckles",
	"stubblelg",
	"stubblemd",
	"stubblesm",
	"tattoos",
	"blushsoft",
] as const;
export type BlemishVariant = typeof blemishVariants[number];
