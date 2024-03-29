import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const headwear: AttributeDictionary = {
	name: "headwear",
	needsTranslation: true,
	isOptional: true,
	appearsIn: 0.125,
	variants: [
		{
			attribute: "headwear",
			name: "beanie",
			restrictions: { headShape: "flat" },
			layers: [
				{
					path: "/attributes/face/10-accessories/beanie_1-v_clothing-a_1.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/beanie_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "headwear",
			name: "cap",
			restrictions: { headShape: "flat" },
			layers: [
				{
					path: "/attributes/face/10-accessories/cap_1-c_skin-b_multiply-a_1.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/10-accessories/cap_2-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/cap_3-c_outline.png",
					color: colors.default.black,
				},
				{
					path: "/attributes/face/10-accessories/cap_4_v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/cap_5-c_outline.png",
					color: colors.default.black,
				},
				{
					path: "/attributes/face/10-accessories/cap_6-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "headwear",
			name: "goggles",
			rarity: "rare",
			layers: [
				{
					path: "/attributes/face/10-accessories/goggles_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/goggles_2-v_clothing-b_multiply.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/goggles_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "headwear",
			name: "halo",
			rarity: "rare",
			layers: [
				{
					path: "/attributes/face/10-accessories/halo-c_yellow.png",
					color: colors.default.yellow,
				},
			],
		},

		{
			attribute: "headwear",
			name: "earphones",
			layers: [
				{
					path: "/attributes/face/10-accessories/earphones_1-v_clothing.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/10-accessories/earphones_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "headwear",
			name: "headphones",
			restrictions: { headShape: "big" },
			layers: [
				{
					path: "/attributes/face/10-accessories/headphones_1-v_clothing-a_0.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/headphones_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "headwear",
			name: "hijab",
			restrictions: { headShape: "flat", profileShape: "flat", gender: "f" },
			hides: ["hair"],
			rarity: "oneofone",
			layers: [
				{
					path: "/attributes/face/10-accessories/hijab_1-v_clothing-destination_over.png",
					colorType: "inherit",
					blendMode: "destination-over",
					batch: ["head"],
				},
				{
					path: "/attributes/face/10-accessories/hijab_1-v_clothing-g_f-a_1.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/hijab_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "headwear",
			name: "horns",
			rarity: "rare",
			layers: [
				{
					path: "/attributes/face/10-accessories/horns_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/10-accessories/horns_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "headwear",
			name: "ranger",
			rarity: "uncommon",
			restrictions: { headShape: "flat" },
			layers: [
				{
					path: "/attributes/face/10-accessories/ranger_1-v_clothing-a_1.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/ranger_2-b_multiply.png",
					color: colors.default.black,
				},
				{
					path: "/attributes/face/10-accessories/ranger_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "headwear",
			name: "turban",
			rarity: "uncommon",
			restrictions: { headShape: "flat", gender: "m" },
			hides: ["hair"],
			layers: [
				{
					path: "/attributes/face/10-accessories/turban_1-v_clothing-destination_over.png",
					colorType: "inherit",
					blendMode: "destination-over",
					batch: ["head"],
				},
				{
					path: "/attributes/face/10-accessories/turban_1-v_clothing-g_m-a_1.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/turban_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "headwear",
			name: "bucket",
			rarity: "uncommon",
			restrictions: { headShape: "flat" },
			layers: [
				{
					path: "/attributes/face/10-accessories/bucket_1-v_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
					batch: ["head"],
				},
				{
					path: "/attributes/face/10-accessories/bucket_2-v_clothing-destination_over.png",
					colorType: "inherit",
					blendMode: "destination-over",
					batch: ["head", "hat"],
				},
				{
					path: "/attributes/face/10-accessories/bucket_2-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/bucket_3-c_shadow.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/10-accessories/bucket_4-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/10-accessories/bucket_5-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "headwear",
			name: "cat",
			rarity: "rare",
			layers: [
				{
					path: "/attributes/face/10-accessories/cat_1.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/10-accessories/cat_2.png",
					color: colors.skin[4],
				},
			],
		},
	],
};

let headwearVariants = [
	"beanie",
	"cap",
	"earphones",
	"goggles",
	"halo",
	"headphones",
	"hijab",
	"horns",
	"ranger",
	"turban",
	"bucket",
	"cat",
] as const;
export type HeadwearVariant = typeof headwearVariants[number];
