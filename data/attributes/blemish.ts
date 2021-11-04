import { colors } from "../colors";
import { AttributeDictionary, AttributeSelection, Variant } from "../helpers";

export const blemish: AttributeDictionary = {
	name: "blemish",
	needsTranslation: true,
	isOptional: true,
	variants: [
		{
			name: "bandage",
			layers: [
				{
					path: "face/02-blemish/bandage-c_white.png",
					color: colors.default.white,
				},
			],
		},
		{
			name: "beautyeye",
			layers: [
				{
					path: "face/02-blemish/beautyeye-c_skindark-b_multiply.png",
					colorType: "skinShadowDark",
				},
			],
		},
		{
			name: "beautymouth",
			layers: [
				{
					path: "face/02-blemish/beautymouth-c_skindark-b_multiply.png",
					colorType: "skinShadowDark",
				},
			],
		},
		{
			name: "blush",
			layers: [
				{
					path: "face/02-blemish/blush-c_red.png",
					color: colors.default.red,
				},
			],
		},
		{
			name: "eyescar",
			layers: [
				{
					path: "face/02-blemish/eyescar-c_skin-b_multiply.png",
					colorType: "skinShadowDark",
				},
			],
		},
		{
			name: "freckles",
			layers: [
				{
					path: "face/02-blemish/freckles-c_skin-b_multiply.png",
					colorType: "skinShadow",
				},
			],
		},
		{
			name: "stubblelg",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/02-blemish/stubblelg-v_hair-g_m.png",
					colorType: "hair",
				},
			],
		},
		{
			name: "stubblemd",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/02-blemish/stubblemd-v_hair-g_m.png",
					colorType: "hair",
				},
			],
		},
		{
			name: "stubblesm",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/02-blemish/stubblesm-v_hair-g_m.png",
					colorType: "hair",
				},
			],
		},
		{
			name: "tattoos",
			layers: [
				{
					path: "face/02-blemish/tattoos-c_skindark-b_multiply.png",
					colorType: "skinShadowDark",
				},
			],
		},
	],
};

let blemishVariants = [
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
] as const;
export type BlemishVariant = typeof blemishVariants[number];
