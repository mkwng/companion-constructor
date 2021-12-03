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
					color: colors.skin["2"],
					blendMode: "multiply",
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
					color: colors.skin["2"],
					blendMode: "multiply",
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
					color: colors.skin["2"],
					blendMode: "multiply",
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
					color: colors.skin["1"],
					blendMode: "multiply",
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
					path: "/attributes/face/02-blemish/stubblelg-v_hair-g_m.png",
					colorType: "hair",
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
					path: "/attributes/face/02-blemish/stubblemd-v_hair-g_m.png",
					colorType: "hair",
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
					path: "/attributes/face/02-blemish/stubblesm-v_hair-g_m.png",
					colorType: "hair",
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
					color: colors.skin["2"],
					blendMode: "multiply",
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
