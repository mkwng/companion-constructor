import { colors } from "../colors";
import { AttributeDictionary } from "../helpers";

export const headwear: AttributeDictionary = {
	needsTranslation: true,
	isOptional: true,
	variants: [
		{
			name: "beanie",
			restrictions: { headShape: "flat" },
			layers: [
				{
					path: "face/10-accessories/beanie_1-v_clothing-a_1.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/10-accessories/beanie_2-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
			],
		},

		{
			name: "cap",
			restrictions: { headShape: "flat" },
			layers: [
				{
					path: "face/10-accessories/cap_1-c_skin-b_multiply-a_1.png",
					colorType: "skinShadow",
					order: 1,
				},
				{
					path: "face/10-accessories/cap_2-v_clothing.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/10-accessories/cap_3-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
				{
					path: "face/10-accessories/cap_4_v_clothing.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/10-accessories/cap_5-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
				{
					path: "face/10-accessories/cap_6-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
			],
		},

		{
			name: "goggles",
			layers: [
				{
					path: "face/10-accessories/goggles_1-v_clothing.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/10-accessories/goggles_2-v_clothing-b_multiply.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/10-accessories/goggles_3-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
			],
		},

		{
			name: "halo",
			layers: [
				{
					path: "face/10-accessories/halo-c_yellow.png",
					color: colors.default.yellow,
					order: 1,
				},
			],
		},

		{
			name: "headphones",
			restrictions: { headShape: "big" },
			layers: [
				{
					path: "face/10-accessories/headphones_1-v_clothing-a_0.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/10-accessories/headphones_2-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
			],
		},

		{
			name: "hijab",
			restrictions: { headShape: "flat" },
			layers: [
				{
					path: "face/10-accessories/hijab_1-v_clothing-g_f-a_1.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/10-accessories/hijab_2-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
			],
		},

		{
			name: "horns",
			layers: [
				{
					path: "face/10-accessories/horns_1-c_white.png",
					color: colors.default.white,
					order: 1,
				},
				{
					path: "face/10-accessories/horns_2-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
			],
		},

		{
			name: "ranger",
			restrictions: { headShape: "flat" },
			layers: [
				{
					path: "face/10-accessories/ranger_1-v_clothing-a_1.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/10-accessories/ranger_2-b_multiply.png",
					color: colors.default.black,
					order: 1,
				},
				{
					path: "face/10-accessories/ranger_3-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
			],
		},

		{
			name: "turban",
			restrictions: { headShape: "flat" },
			layers: [
				{
					path: "face/10-accessories/turban_1-v_clothing-g_m-a_1.png",
					colorType: "clothing",
					order: 1,
				},
				{
					path: "face/10-accessories/turban_2-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
			],
		},
	],
};

let headwearVariants = [
	"beanie",
	"cap",
	"goggles",
	"halo",
	"headphones",
	"hijab",
	"horns",
	"ranger",
	"turban",
] as const;
export type HeadwearVariant = typeof headwearVariants[number];
