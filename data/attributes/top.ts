import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const top: AttributeDictionary = {
	name: "top",
	// isOptional: true,
	variants: [
		{
			attribute: "top",
			name: "fishnet",
			restrictions: { gender: "f", pose: 2 },
			rarity: "rare",
			layers: [
				{ path: "pose2/05-tops/fishnet_1-c_black-g_f.png", color: colors.clothing.black },
				{
					path: "pose2/05-tops/fishnet_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/fishnet_3-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "hoodie",
			restrictions: { headShape: "flat", pose: 2 },
			hides: ["headwear", "hair"],
			rarity: "mythic",
			layers: [
				{
					path: "pose2/05-tops/hoodie_1-v_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/hoodie_2-v_clothing.png", colorType: "clothing" },
				{ path: "pose2/05-tops/hoodie_3-c_white.png", color: colors.default.white },
				{
					path: "pose2/05-tops/hoodie_4-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/hoodie_5-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "midriff",
			restrictions: { gender: "f", pose: 2 },
			layers: [
				{ path: "pose2/05-tops/midriff_1-v_clothing-g_f.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/midriff_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/midriff_3-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "motorcyclejacketm",
			rarity: "rare",
			restrictions: { pose: 2 },
			layers: [
				{
					path: "pose2/05-tops/motorcyclejacketm_1-v_clothing-g_m.png",
					colorType: "clothing",
				},
				{
					path: "pose2/05-tops/motorcyclejacketm_2-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "pose2/05-tops/motorcyclejacketm_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/05-tops/motorcyclejacketm_4-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "pose2/05-tops/motorcyclejacketm_5-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "openshirt",
			restrictions: { gender: "m", pose: 2 },
			layers: [
				{ path: "pose2/05-tops/openshirt_1-v_clothing-g_m.png", colorType: "clothing" },
				{ path: "pose2/05-tops/openshirt_2-c_white.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/openshirt_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/openshirt_4-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "schoolgirl",
			restrictions: { gender: "f", pose: 2 },
			rarity: "uncommon",
			layers: [
				{
					path: "pose2/05-tops/schoolgirl_1-v_skin-b_multiply-g_f.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/schoolgirl_2-c_white.png", color: colors.clothing.white },
				{ path: "pose2/05-tops/schoolgirl_3-c_black.png", color: colors.clothing.black },
				{ path: "pose2/05-tops/schoolgirl_4-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/schoolgirl_5-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/schoolgirl_6-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "tattoos",
			restrictions: { gender: "m", pose: 2 },
			rarity: "mythic",
			layers: [
				{ path: "pose2/05-tops/tattoos_1-c_red-g_m.png", color: colors.default.red },
				{ path: "pose2/05-tops/tattoos_2-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "tattooshirt",
			restrictions: { gender: "m", pose: 2 },
			rarity: "mythic",
			layers: [
				{ path: "pose2/05-tops/tattooshirt_1-c_red-g_m.png", color: colors.default.red },
				{ path: "pose2/05-tops/tattooshirt_2-c_white.png", color: colors.clothing.white },
				{ path: "pose2/05-tops/tattooshirt_3-c_outline.png", color: colors.default.black },
				{ path: "pose2/05-tops/tattooshirt_4-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "wifebeater",
			restrictions: { gender: "m", pose: 2 },
			layers: [
				{ path: "pose2/05-tops/wifebeater_1-c_white-g_m.png", color: colors.clothing.white },
				{ path: "pose2/05-tops/wifebeater_2-c_outline.png", color: colors.default.black },
			],
		},
	],
};

let topVariants = [
	"fishnet",
	"motorcyclejacketm",
	"openshirt",
	"schoolgirl",
	"tattoos",
	"tattooshirt",
	"wifebeater",
] as const;
export type TopVariant = typeof topVariants[number];
