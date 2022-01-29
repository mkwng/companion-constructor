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
			restrictions: { gender: "f" },
			rarity: "rare",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/fishnet_1-c_black.png",
						2: "/attributes/pose2/05-tops/fishnet_1-c_black-g_f.png",
						3: "/attributes/pose3/03-top/fishnet-g_f.png",
					},
					color: colors.clothing.black,
				},
				{
					path: {
						2: "/attributes/pose2/05-tops/fishnet_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/fishnet_2-c_outline.png",
						2: "/attributes/pose2/05-tops/fishnet_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "fishingvest",
			rarity: "mythic",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/fisherman_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/fisherman_1-v_clothing.png",
						3: "/attributes/pose3/03-top/fisherman_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/fisherman_2-v_clothing.png",
						2: "/attributes/pose2/05-tops/fisherman_2-v_clothing.png",
						3: "/attributes/pose3/03-top/fisherman_2-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						2: "/attributes/pose2/05-tops/fisherman_3-v_clothing.png",
						3: "/attributes/pose3/03-top/fisherman_3-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/fisherman_4-c_shadow.png",
						2: "/attributes/pose2/05-tops/fisherman_4-c_shadow.png",
						3: "/attributes/pose3/03-top/fisherman_4-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/fisherman_5-c_outline.png",
						2: "/attributes/pose2/05-tops/fisherman_5-c_outline.png",
						3: "/attributes/pose3/03-top/fisherman_5-c_outline.png",
					},
					color: colors.default.black,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/fisherman_6-c_outline.png",
						2: "/attributes/pose2/05-tops/fisherman_6-c_outline.png",
					},
					colorType: "clothing",
				},
			],
		},
		{
			attribute: "top",
			name: "hoodie",
			restrictions: { headShape: "flat" },
			hides: ["headwear", "hair"],
			rarity: "mythic",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/hoodie_0-c_skinshadow.png",
						2: "/attributes/pose2/05-tops/hoodie_1-v_skin-b_multiply.png",
					},
					color: colors.skin["5"],
					blendMode: "multiply",
				},

				{
					path: {
						2: "/attributes/pose2/05-tops/hoodie_2-v_clothing-destination_over.png",
					},
					colorType: "inherit",
					blendMode: "destination-over",
					batch: ["head"],
				},
				{
					path: {
						1: "/attributes/pose1/13-top/hoodie_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/hoodie_2-v_clothing.png",
						3: "/attributes/pose3/03-top/hoodie_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/hoodie_3-c_white.png",
						2: "/attributes/pose2/05-tops/hoodie_3-c_white.png",
						3: "/attributes/pose3/03-top/hoodie_3-c_white.png",
					},
					color: colors.default.white,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/hoodie_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/hoodie_4-c_shadow.png",
						3: "/attributes/pose3/03-top/hoodie_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/hoodie_4-c_outline.png",
						2: "/attributes/pose2/05-tops/hoodie_5-c_outline.png",
						3: "/attributes/pose3/03-top/hoodie_4-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		// {
		// 	attribute: "top",
		// 	name: "hoodiedown",
		// 	restrictions: { headShape: "flat" },
		// 	rarity: "mythic",
		// 	layers: [
		// 		{
		// 			path: { 2: "/attributes/pose2/05-tops/hoodieup_0-c_clothing-destination_over.png" },
		// 			colorType: "inherit",
		// 			blendMode: "destination-over",
		// 		},
		// 		{
		// 			path: { 2: "/attributes/pose2/05-tops/hoodieup_1-c_clothing.png" },
		// 			colorType: "clothing",
		// 		},
		// 		{
		// 			path: { 2: "/attributes/pose2/05-tops/hoodieup_2-c_shadow.png" },
		// 			color: colors.default.gray,
		// 			blendMode: "multiply",
		// 		},
		// 		{
		// 			path: { 2: "/attributes/pose2/05-tops/hoodieup_3-c_clothing.png" },
		// 			color: colors.default.white,
		// 		},
		// 		{
		// 			path: { 2: "/attributes/pose2/05-tops/hoodieup_4-c_outline.png" },
		// 			color: colors.default.black,
		// 		},
		// 	],
		// },
		{
			attribute: "top",
			name: "midriff",
			restrictions: { gender: "f" },
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/midriff_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/midriff_1-v_clothing-g_f.png",
						3: "/attributes/pose3/03-top/midriff_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/midriff_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/midriff_2-c_shadow.png",
						3: "/attributes/pose3/03-top/midriff_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/midriff_3-c_outline.png",
						2: "/attributes/pose2/05-tops/midriff_3-c_outline.png",
						3: "/attributes/pose3/03-top/midriff_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "motorcyclejacket",
			rarity: "rare",
			layers: [
				{
					path: {
						2: "/attributes/pose2/05-tops/motorcyclejacketm_1-v_clothing-g_m.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/motorcycle_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/motorcyclejacketm_2-v_clothing.png",
						3: "/attributes/pose3/03-top/motorcycle_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/motorcycle_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/motorcyclejacketm_3-c_shadow.png",
						3: "/attributes/pose3/03-top/motorcycle_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/motorcycle_3-v_clothing.png",
						2: "/attributes/pose2/05-tops/motorcyclejacketm_4-v_clothing.png",
						3: "/attributes/pose3/03-top/motorcycle_3-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/motorcycle_4-c_outline.png",
						2: "/attributes/pose2/05-tops/motorcyclejacketm_5-c_outline.png",
						3: "/attributes/pose3/03-top/motorcycle_4-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "openshirt",
			restrictions: { gender: "m" },
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/buttonup_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/openshirt_1-v_clothing-g_m.png",
						3: "/attributes/pose3/03-top/buttonup_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						2: "/attributes/pose2/05-tops/openshirt_2-c_white.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/buttonup_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/openshirt_3-c_shadow.png",
						3: "/attributes/pose3/03-top/buttonup_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/buttonup_3-c_outline.png",
						2: "/attributes/pose2/05-tops/openshirt_4-c_outline.png",
						3: "/attributes/pose3/03-top/buttonup_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "schoolgirl",
			restrictions: { gender: "f" },
			rarity: "uncommon",
			layers: [
				{
					path: {
						2: "/attributes/pose2/05-tops/schoolgirl_1-v_skin-b_multiply-g_f.png",
					},
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/schoolgirl_1-c_white.png",
						2: "/attributes/pose2/05-tops/schoolgirl_2-c_white.png",
						3: "/attributes/pose3/03-top/schoolgirl_1-c_white.png",
					},
					color: colors.clothing.white,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/schoolgirl_3-c_black.png",
						2: "/attributes/pose2/05-tops/schoolgirl_3-c_black.png",
						3: "/attributes/pose3/03-top/schoolgirl_3-c_black.png",
					},
					color: colors.clothing.black,
				},
				{
					path: {
						2: "/attributes/pose2/05-tops/schoolgirl_4-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/schoolgirl_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/schoolgirl_5-c_shadow.png",
						3: "/attributes/pose3/03-top/schoolgirl_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/schoolgirl_4-c_outline.png",
						2: "/attributes/pose2/05-tops/schoolgirl_6-c_outline.png",
						3: "/attributes/pose3/03-top/schoolgirl_4-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "tattoos",
			restrictions: { gender: "m" },
			rarity: "mythic",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/tattoo_1-c_red.png",
						2: "/attributes/pose2/05-tops/tattoos_1-c_red-g_m.png",
						3: "/attributes/pose3/03-top/tattoo.png",
					},
					color: colors.default.red,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tattoo_2-c_outline.png",
						2: "/attributes/pose2/05-tops/tattoos_2-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "tattooshirt",
			restrictions: { gender: "m" },
			rarity: "mythic",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/tattoo_1-c_red.png",
						2: "/attributes/pose2/05-tops/tattooshirt_1-c_red-g_m.png",
						3: "/attributes/pose3/03-top/tattoo.png",
					},
					color: colors.default.red,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/wifebeater_1-c_white.png",
						2: "/attributes/pose2/05-tops/tattooshirt_2-c_white.png",
						3: "/attributes/pose3/03-top/wifebeater_1-c_white.png",
					},
					color: colors.clothing.white,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/wifebeater_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tattoo_2-c_outline.png",
						2: "/attributes/pose2/05-tops/tattooshirt_3-c_outline.png",
						3: "/attributes/pose3/03-top/wifebeater_2-c_outline.png",
					},
					color: colors.default.black,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/wifebeater_3-c_outline.png",
						2: "/attributes/pose2/05-tops/tattooshirt_4-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "whitetanktop",
			restrictions: { gender: "m" },
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/wifebeater_1-c_white.png",
						2: "/attributes/pose2/05-tops/wifebeater_1-c_white-g_m.png",
						3: "/attributes/pose3/03-top/wifebeater_1-c_white.png",
					},
					color: colors.clothing.white,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/wifebeater_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/wifebeater_3-c_outline.png",
						2: "/attributes/pose2/05-tops/wifebeater_2-c_outline.png",
						3: "/attributes/pose3/03-top/wifebeater_2-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "buttonup",
			restrictions: { gender: "m" },
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/buttonup_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/buttonup_1-v_clothing.png",
						3: "/attributes/pose3/03-top/buttonup_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/buttonup_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/buttonup_2-c_shadow.png",
						3: "/attributes/pose3/03-top/buttonup_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/buttonup_3-c_outline.png",
						2: "/attributes/pose2/05-tops/buttonup_3-c_outline.png",
						3: "/attributes/pose3/03-top/buttonup_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "jacket",
			layers: [
				{
					path: {
						2: "/attributes/pose2/05-tops/jacket_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						2: "/attributes/pose2/05-tops/jacket_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/jacket_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/jacket_3-v_clothing.png",
						3: "/attributes/pose3/03-top/jacket_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/jacket_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/jacket_4-c_shadow.png",
						3: "/attributes/pose3/03-top/jacket_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/jacket_3-c_outline.png",
						2: "/attributes/pose2/05-tops/jacket_5-c_outline.png",
						3: "/attributes/pose3/03-top/jacket_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "longt",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/longt_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/longt_1-v_clothing.png",
						3: "/attributes/pose3/03-top/longt_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/longt_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/longt_2-c_shadow.png",
						3: "/attributes/pose3/03-top/longt_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/longt_3-c_outline.png",
						2: "/attributes/pose2/05-tops/longt_3-c_outline.png",
						3: "/attributes/pose3/03-top/longt_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "longtstripe",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/longt_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/longtstripe_1-v_clothing.png",
						3: "/attributes/pose3/03-top/longt_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/longt_lines.png",
						2: "/attributes/pose2/05-tops/longtstripe_2-v_clothing.png",
						3: "/attributes/pose3/03-top/longt_stripes.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/longt_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/longtstripe_3-c_shadow.png",
						3: "/attributes/pose3/03-top/longt_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/longt_3-c_outline.png",
						2: "/attributes/pose2/05-tops/longtstripe_4-c_outline.png",
						3: "/attributes/pose3/03-top/longt_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "tshirt",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/tshirt_01-v_clothing.png",
						3: "/attributes/pose3/03-top/tshirt_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/tshirt_02-c_shadow.png",
						3: "/attributes/pose3/03-top/tshirt_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_3-c_outline.png",
						2: "/attributes/pose2/05-tops/tshirt_03-c_outline.png",
						3: "/attributes/pose3/03-top/tshirt_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "tshirtdot",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/tshirtdot_01-v_clothing.png",
						3: "/attributes/pose3/03-top/tshirt_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_dot.png",
						2: "/attributes/pose2/05-tops/tshirtdot_02-v_clothing.png",
						3: "/attributes/pose3/03-top/tshirt_dots.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/tshirtdot_03-c_shadow.png",
						3: "/attributes/pose3/03-top/tshirt_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_3-c_outline.png",
						2: "/attributes/pose2/05-tops/tshirtdot_04-c_outline.png",
						3: "/attributes/pose3/03-top/tshirt_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "tshirtsquiggle",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/tshirtsquiggle_01-v_clothing.png",
						3: "/attributes/pose3/03-top/tshirt_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_squiggles.png",
						2: "/attributes/pose2/05-tops/tshirtsquiggle_02-v_clothing.png",
						3: "/attributes/pose3/03-top/tshirt_squiggles.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/tshirtsquiggle_03-c_shadow.png",
						3: "/attributes/pose3/03-top/tshirt_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_3-c_outline.png",
						2: "/attributes/pose2/05-tops/tshirtsquiggle_04-c_outline.png",
						3: "/attributes/pose3/03-top/tshirt_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "tshirtwaves",
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/tshirtwaves_01-v_clothing.png",
						3: "/attributes/pose3/03-top/tshirt_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_waves.png",
						2: "/attributes/pose2/05-tops/tshirtwaves_02-v_clothing.png",
						3: "/attributes/pose3/03-top/tshirt_waves.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/tshirtwaves_03-c_shadow.png",
						3: "/attributes/pose3/03-top/tshirt_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tshirt_3-c_outline.png",
						2: "/attributes/pose2/05-tops/tshirtwaves_04-c_outline.png",
						3: "/attributes/pose3/03-top/tshirt_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "top",
			name: "bra",
			restrictions: { gender: "f" },
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/bra_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/bra_1-v_clothing.png",
						3: "/attributes/pose3/03-top/bra_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						2: "/attributes/pose2/05-tops/bra_2-c_shadow.png",
						3: "/attributes/pose3/03-top/bra_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/bra_2-c_outline.png",
						2: "/attributes/pose2/05-tops/bra_3-c_outline.png",
						3: "/attributes/pose3/03-top/bra_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "puffer",
			restrictions: { gender: "f" },
			layers: [
				{
					path: {
						2: "/attributes/pose2/05-tops/puffer_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/puffer_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/puffer_2-v_clothing.png",
						3: "/attributes/pose3/03-top/puffer_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/puffer_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/puffer_3-c_shadow.png",
						3: "/attributes/pose3/03-top/puffer_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/puffer_3-c_shadow.png",
						2: "/attributes/pose2/05-tops/puffer_4-c_shadow.png",
						3: "/attributes/pose3/03-top/puffer_3-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/puffer_4-c_outline.png",
						2: "/attributes/pose2/05-tops/puffer_5-c_outline.png",
						3: "/attributes/pose3/03-top/puffer_4-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "tank",
			restrictions: { gender: "f" },
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/tank_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/tank_1-v_clothing.png",
						3: "/attributes/pose3/03-top/bra_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tank_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/tank_2-c_shadow.png",
						3: "/attributes/pose3/03-top/bra_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/tank_3-c_outline.png",
						2: "/attributes/pose2/05-tops/tank_3-c_outline.png",
						3: "/attributes/pose3/03-top/bra_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "turtle",
			restrictions: { gender: "f" },
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/turtle_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/turtle_1-v_clothing.png",
						3: "/attributes/pose3/03-top/longt_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/turtle_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/turtle_2-c_shadow.png",
						3: "/attributes/pose3/03-top/longt_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/turtle_3-c_outline.png",
						2: "/attributes/pose2/05-tops/turtle_3-c_outline.png",
						3: "/attributes/pose3/03-top/longt_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "northstar",
			rarity: "mythic",
			restrictions: { gender: "m" },
			layers: [
				{
					path: {
						2: "/attributes/pose2/05-tops/northstar_1-v_clothing-g_m.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/northstar_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/northstar_2-v_clothing.png",
						3: "/attributes/pose3/03-top/northstar_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/northstar_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/northstar_3-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/northstar_3-c_outline.png",
						3: "/attributes/pose3/03-top/northstar_2-c_outline.png",
					},
					color: colors.default.black,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/northstar_4-c_black.png",
						2: "/attributes/pose2/05-tops/northstar_4-c_black.png",
					},
					color: colors.clothing.black,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/northstar_5-c_outline.png",
						2: "/attributes/pose2/05-tops/northstar_5-c_outline.png",
					},
					color: colors.default.black,
				},
				{
					path: {
						2: "/attributes/pose2/05-tops/northstar_6-c_skinshadow.png",
					},
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/northstar_6-c_gray.png",
						2: "/attributes/pose2/05-tops/northstar_7-c_gray.png",
						3: "/attributes/pose3/03-top/northstar_3-c_gray.png",
					},
					color: colors.hair.gray,
				},
				{
					path: {
						2: "/attributes/pose2/05-tops/northstar_8-c_black.png",
					},
					color: colors.clothing.black,
				},
				{
					path: {
						1: "/attributes/pose1/13-top/northstar_7-c_shadow.png",
						2: "/attributes/pose2/05-tops/northstar_9-c_shadow.png",
						3: "/attributes/pose3/03-top/northstar_4-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/northstar_8-c_outline.png",
						2: "/attributes/pose2/05-tops/northstar_10-c_outline.png",
						3: "/attributes/pose3/03-top/northstar_5-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "leatherjacket",
			layers: [
				{
					path: {
						2: "/attributes/pose2/05-tops/leatherjacket_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/leatherjacket_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/leatherjacket_2-v_clothing.png",
						3: "/attributes/pose3/03-top/leatherjacket_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/leatherjacket_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/leatherjacket_3-c_shadow.png",
						3: "/attributes/pose3/03-top/leatherjacket_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/leatherjacket_3-c_outline.png",
						2: "/attributes/pose2/05-tops/leatherjacket_4-c_outline.png",
						3: "/attributes/pose3/03-top/leatherjacket_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "top",
			name: "beach",
			restrictions: { gender: "f" },
			rarity: "rare",
			hides: ["bottom"],
			layers: [
				{
					path: {
						1: "/attributes/pose1/13-top/summer_1-v_clothing.png",
						2: "/attributes/pose2/05-tops/beach_1-v_clothing.png",
						3: "/attributes/pose3/03-top/beach_1-v_clothing.png",
					},
					colorType: "clothing",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/summer_2-c_shadow.png",
						2: "/attributes/pose2/05-tops/beach_2-c_shadow.png",
						3: "/attributes/pose3/03-top/beach_2-c_shadow.png",
					},
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/13-top/summer_3-c_outline.png",
						2: "/attributes/pose2/05-tops/beach_3-c_outline.png",
						3: "/attributes/pose3/03-top/beach_3-c_outline.png",
					},
					color: colors.default.black,
				},
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
	"whitetanktop",
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
