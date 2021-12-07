import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const mouth: AttributeDictionary = {
	name: "mouth",
	needsTranslation: true,
	variants: [
		{
			attribute: "mouth",
			name: "aged",
			layers: [
				{
					path: "/attributes/face/08-mouth/aged_1-c_skin-b_multiply-g_m.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/aged_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "bigsmile",
			layers: [
				{
					path: "/attributes/face/08-mouth/bigsmile_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/bigsmile_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/08-mouth/bigsmile_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "grimace",
			layers: [
				{
					path: "/attributes/face/08-mouth/grimace_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/grimace_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/08-mouth/grimace_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "neutral",
			layers: [
				{
					path: "/attributes/face/08-mouth/neutral_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/neutral_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "neutrallips",
			restrictions: { gender: "f" },
			layers: [
				{
					path: "/attributes/face/08-mouth/neutrallips_1-c_skin-b_multiply-g_f.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/neutrallips_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "nyan",
			restrictions: { gender: "f" },
			layers: [
				{
					path: "/attributes/face/08-mouth/nyan-g_f-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "openfrown",
			layers: [
				{
					path: "/attributes/face/08-mouth/openfrown_1-c_skin-b_multiply-g_m.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/openfrown_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "opensmile",
			layers: [
				{
					path: "/attributes/face/08-mouth/opensmile_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/opensmile_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "pout",
			layers: [
				{
					path: "/attributes/face/08-mouth/pout_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/pout_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "slightfrown",
			layers: [
				{
					path: "/attributes/face/08-mouth/slightfrown_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/slightfrown_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "slightsmile",
			layers: [
				{
					path: "/attributes/face/08-mouth/slightsmile_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/slightsmile_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "slighttilt",
			layers: [
				{
					path: "/attributes/face/08-mouth/slighttilt_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/slighttilt_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "smilelips",
			restrictions: { gender: "f" },
			layers: [
				{
					path: "/attributes/face/08-mouth/smilelips_1-c_skin-b_multiply-g_f.png",
					colorType: "clothing",
				},
				{
					path: "/attributes/face/08-mouth/smilelips_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "mouth",
			name: "smileside",
			layers: [
				{
					path: "/attributes/face/08-mouth/smileside_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/smileside_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/08-mouth/smileside_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "subtlesmile",
			layers: [
				{
					path: "/attributes/face/08-mouth/subtlesmile_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/subtlesmile_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "teethy",
			layers: [
				{
					path: "/attributes/face/08-mouth/teethy_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/teethy_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/08-mouth/teethy_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "tongue",
			layers: [
				{
					path: "/attributes/face/08-mouth/tongue_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/08-mouth/tongue_2.png",
				},
				{
					path: "/attributes/face/08-mouth/tongue_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "mouth",
			name: "widesmile",
			layers: [
				{
					path: "/attributes/face/08-mouth/widesmile_1-c_outline.png",
					color: colors.default.black,
				},
				{
					path: "/attributes/face/08-mouth/widesmile_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
			],
		},
		{
			attribute: "mouth",
			name: "openteeth",
			layers: [
				{ path: "/attributes/face/08-mouth/beard2_3-c_white.png", color: colors.default.white },
				{
					path: "/attributes/face/08-mouth/beard2_4-c_outline.png",
					color: colors.default.black,
				},
			],
		},
	],
};

export const facialhair: AttributeDictionary = {
	name: "facialhair",
	isOptional: true,
	appearsIn: 0.05,
	needsTranslation: true,
	variants: [
		{
			attribute: "facialhair",
			name: "beard",
			restrictions: { gender: "m" },
			hides: ["mouth"],
			layers: [
				{
					path: "/attributes/face/08-mouth/beard-v_hair-g_m.png",
					colorType: "hair",
				},
			],
		},

		{
			attribute: "facialhair",
			name: "fumanchu",
			restrictions: { gender: "m" },
			hides: ["mouth"],
			layers: [
				{
					path: "/attributes/face/08-mouth/fumanchu_1-v_hair-g_m.png",
					colorType: "hair",
				},
				{
					path: "/attributes/face/08-mouth/fumanchu_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
			],
		},

		{
			attribute: "facialhair",
			name: "handlebars",
			restrictions: { gender: "m" },
			hides: ["mouth"],
			layers: [
				{
					path: "/attributes/face/08-mouth/handlebars_1-v_hair-g_m.png",
					colorType: "hair",
				},
				{
					path: "/attributes/face/08-mouth/handlebars_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
			],
		},
		{
			attribute: "facialhair",
			name: "thinpatch",
			restrictions: { gender: "m" },
			hides: ["mouth"],
			layers: [
				{
					path: "/attributes/face/08-mouth/thinpatch_1-v_hair.png",
					colorType: "hair",
				},
				{
					path: "/attributes/face/08-mouth/thinpatch_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
			],
		},

		{
			attribute: "facialhair",
			name: "beardsmile",
			restrictions: { gender: "m" },
			hides: ["mouth"],
			layers: [
				{
					path: "/attributes/face/08-mouth/beard2_1-c_shadow-g_m.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{ path: "/attributes/face/08-mouth/beard2_2-v_hair-g_m.png", colorType: "hair" },
				{ path: "/attributes/face/08-mouth/beard2_3-c_white.png", color: colors.default.white },
				{
					path: "/attributes/face/08-mouth/beard2_4-c_outline.png",
					color: colors.default.black,
				},
			],
		},
	],
};

let facialhairVariants = [
	"beard",
	"fumanchu",
	"handlebars",
	"thinpatch",
	"beardsmile",
] as const;
export type FacialhairVariant = typeof facialhairVariants[number];

let mouthVariants = [
	"aged",
	"bigsmile",
	"grimace",
	"neutral",
	"neutrallips",
	"nyan",
	"openfrown",
	"opensmile",
	"pout",
	"slightfrown",
	"slightsmile",
	"slighttilt",
	"smilelips",
	"smileside",
	"subtlesmile",
	"teethy",
	"tongue",
	"widesmile",
	"openteeth",
] as const;
export type MouthVariant = typeof mouthVariants[number];
