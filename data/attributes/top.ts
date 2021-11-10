import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const top: AttributeDictionary = {
	name: "top",
	isOptional: true,
	appearsIn: 1,
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

		{
			attribute: "top",
			name: "buttonup",
			restrictions: { gender: "m", pose: 2 },
			layers: [
				{ path: "pose2/05-tops/buttonup_1-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/buttonup_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/buttonup_3-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "jacket",
			restrictions: { pose: 2 },
			layers: [
				{ path: "pose2/05-tops/jacket_1-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/jacket_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/jacket_3-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/jacket_4-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/jacket_5-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "longt",
			restrictions: { pose: 2 },
			layers: [
				{ path: "pose2/05-tops/longt_1-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/longt_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/longt_3-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "longtstripe",
			restrictions: { pose: 2 },
			layers: [
				{ path: "pose2/05-tops/longtstripe_1-v_clothing.png", colorType: "clothing" },
				{ path: "pose2/05-tops/longtstripe_2-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/longtstripe_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/longtstripe_4-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "tshirt",
			restrictions: { pose: 2 },
			layers: [
				{ path: "pose2/05-tops/tshirt_01-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/tshirt_02-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/tshirt_03-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "tshirtdot",
			restrictions: { pose: 2 },
			layers: [
				{ path: "pose2/05-tops/tshirtdot_01-v_clothing.png", colorType: "clothing" },
				{ path: "pose2/05-tops/tshirtdot_02-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/tshirtdot_03-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/tshirtdot_04-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "tshirtsquiggle",
			restrictions: { pose: 2 },
			layers: [
				{ path: "pose2/05-tops/tshirtsquiggle_01-v_clothing.png", colorType: "clothing" },
				{ path: "pose2/05-tops/tshirtsquiggle_02-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/tshirtsquiggle_03-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/tshirtsquiggle_04-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "tshirtwaves",
			restrictions: { pose: 2 },
			layers: [
				{ path: "pose2/05-tops/tshirtwaves_01-v_clothing.png", colorType: "clothing" },
				{ path: "pose2/05-tops/tshirtwaves_02-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/tshirtwaves_03-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/tshirtwaves_04-c_outline.png", color: colors.default.black },
			],
		},

		{
			attribute: "top",
			name: "bra",
			restrictions: { pose: 2, gender: "f" },
			layers: [
				{ path: "pose2/05-tops/bra_1-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/bra_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/bra_3-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "puffer",
			restrictions: { pose: 2, gender: "f" },
			layers: [
				{ path: "pose2/05-tops/puffer_1-v_clothing.png", colorType: "clothing" },
				{ path: "pose2/05-tops/puffer_2-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/puffer_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/05-tops/puffer_4-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/puffer_5-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "tank",
			restrictions: { pose: 2, gender: "f" },
			layers: [
				{ path: "pose2/05-tops/tank_1-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/tank_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/tank_3-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "turtle",
			restrictions: { pose: 2, gender: "f" },
			layers: [
				{ path: "pose2/05-tops/turtle_1-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/turtle_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/turtle_3-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "northstar",
			rarity: "mythic",
			restrictions: { pose: 2, gender: "m" },
			layers: [
				{
					path: "pose2/05-tops/northstar_1-v_clothing-g_m.png",
					colorType: "clothing",
				},
				{
					path: "pose2/05-tops/northstar_2-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "pose2/05-tops/northstar_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/05-tops/northstar_4-c_black.png",
					color: colors.clothing.black,
				},
				{
					path: "pose2/05-tops/northstar_5-c_outline.png",
					color: colors.default.black,
				},
				{
					path: "pose2/05-tops/northstar_6-c_skinshadow.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "pose2/05-tops/northstar_7-c_gray.png",
					color: colors.hair.gray,
				},
				{
					path: "pose2/05-tops/northstar_8-c_black.png",
					color: colors.clothing.black,
				},
				{
					path: "pose2/05-tops/northstar_9-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "pose2/05-tops/northstar_10-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "leatherjacket",
			restrictions: { pose: 2 },
			layers: [
				{ path: "pose2/05-tops/leatherjacket_1-v_clothing.png", colorType: "clothing" },
				{ path: "pose2/05-tops/leatherjacket_2-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/leatherjacket_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/leatherjacket_4-c_outline.png", color: colors.default.black },
			],
		},
		{
			attribute: "top",
			name: "beach",
			restrictions: { pose: 2, gender: "f" },
			rarity: "rare",
			hides: ["bottom"],
			layers: [
				{ path: "pose2/05-tops/beach_1-v_clothing.png", colorType: "clothing" },
				{
					path: "pose2/05-tops/beach_2-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{ path: "pose2/05-tops/beach_3-c_outline.png", color: colors.default.black },
				{ path: "pose2/05-tops/beach_4-v_clothing.png", colorType: "clothing" },
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
	"buttonup",
	"jacket",
	"longt",
	"longtstripe",
	"tshirt",
	"tshirtdot",
	"tshirtsquiggle",
	"tshirtwaves",
	"bra",
	"puffer",
	"tank",
	"turtle",
	"northstar",
] as const;
export type TopVariant = typeof topVariants[number];
