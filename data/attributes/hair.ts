import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const hair: AttributeDictionary = {
	name: "hair",
	needsTranslation: true,
	variants: [
		{
			attribute: "hair",
			name: "alfalfa",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/05-hair/alfalfa_1-v_hair-g_m.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/alfalfa_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "anime",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/anime_1-c_skin-b_multiply-g_f-a_0.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/05-hair/anime_2-v_hair.png",

					colorType: "hair",
				},
			],
		},
		{
			attribute: "hair",
			name: "balding",
			restrictions: { gender: "m", headShape: "flat" },
			layers: [
				{
					path: "face/05-hair/balding_1-v_hair-g_m.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/balding_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "braided",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/braided_1-v_hair-g_f-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/braided_2-v_clothing.png",

					colorType: "clothing",
				},
				{
					path: "face/05-hair/braided_3-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "braids",
			restrictions: { gender: "f", headShape: "flat" },
			layers: [
				{
					path: "face/05-hair/braids-v_hair-g_f-q_5.png",
					colorType: "hair",
				},
			],
		},
		{
			attribute: "hair",
			name: "crew",
			restrictions: { gender: "m", headShape: "flat" },
			layers: [
				{
					path: "face/05-hair/crew-v_hair-g_m.png",
					colorType: "hair",
				},
			],
		},
		{
			attribute: "hair",
			name: "crop",
			restrictions: { gender: "m", headShape: "flat" },
			layers: [
				{
					path: "face/05-hair/crop-v_hair-g_m.png",
					colorType: "hair",
				},
			],
		},
		{
			attribute: "hair",
			name: "dreads",
			restrictions: { gender: "m", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/dreads_1-c_skin-b_multiply-g_m-a_0.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/05-hair/dreads_2-v_hair.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/dreads_3-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "fade",
			restrictions: { gender: "m", headShape: "flat" },
			layers: [
				{
					path: "face/05-hair/fade_1-v_hair-g_m.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/fade_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "flip",
			restrictions: { headShape: "big" },
			layers: [
				{
					path: "face/05-hair/flip_1-c_skin-b_multiply-a_0.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{ path: "face/05-hair/flip_2-v_hair.png", colorType: "hair" },
				{
					path: "face/05-hair/flip_3-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "frizzlong",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/frizzlong_1-v_hair-g_f-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/frizzlong_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "frizzshort",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/frizzshort_1-v_hair-g_f-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/frizzshort_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "fuzz",
			restrictions: { headShape: "flat", gender: "m" },
			layers: [
				{
					path: "face/05-hair/fuzz_1-v_hair-g_m-q_5.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/fuzz_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "kpop",
			restrictions: { gender: "m", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/kpop_1-c_skin-b_multiply-g_m-a_0.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{ path: "face/05-hair/kpop_2-v_hair.png", colorType: "hair" },
			],
		},
		{
			attribute: "hair",
			name: "kunoichi",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/kunoichi_1-c_skin-b_multiply-g_f-a_0.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/05-hair/kunoichi_2-v_hair.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/kunoichi_3-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "kunoichilong",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/kunoichilong_1-c_skin-b_multiply-g_f-a_0.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/05-hair/kunoichilong_2-v_hair.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/kunoichilong_3-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "locks",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/05-hair/locks_1-v_hair-g_m-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/locks_2-v_clothing.png",

					colorType: "clothing",
				},
				{
					path: "face/05-hair/locks_3-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "long",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/long_1-v_hair-g_f-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/long_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "longstraight",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/longstraight_1-c_skin-b_multiply-g_f-a_0.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/05-hair/longstraight_2-v_hair.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/longstraight_3-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "mickey",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/mickey_1-v_hair-g_f-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/mickey_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "mohawk",
			layers: [
				{
					path: "face/05-hair/mohawk_1-v_hair-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/mohawk_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "ponylong",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/ponylong_1-c_skin-b_multiply-g_f-a_0.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/05-hair/ponylong_2-v_hair.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/ponylong_3-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "samurai",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/05-hair/samurai_1-v_hair-g_m-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/samurai_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "samurailong",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/05-hair/samurailong_1-v_hair-g_m-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/samurailong_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "shiny",
			restrictions: { headShape: "big" },
			layers: [
				{
					path: "face/05-hair/shiny_1-v_hair-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/shiny_2-c_outline.png",

					color: colors.default.black,
				},
				{
					path: "face/05-hair/shiny_3-c_white.png",

					color: colors.default.white,
				},
			],
		},
		{
			attribute: "hair",
			name: "short",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/short_1-v_hair-g_f-a_0.png",

					colorType: "hair",
				},
				{
					path: "face/05-hair/short_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "hair",
			name: "waveshort",
			restrictions: { gender: "f" },
			layers: [
				{
					path: "face/05-hair/waveshort_1-c_skin-b_multiply-g_f-a_0.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/05-hair/waveshort_2-v_hair.png",

					colorType: "hair",
				},
			],
		},
		{
			attribute: "hair",
			name: "headband",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/05-hair/headband_1-v_clothing-g_m.png",
					colorType: "clothing",
				},
				{ path: "face/05-hair/headband_2-v_hair.png", colorType: "hair" },
				{
					path: "face/05-hair/headband_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},
	],
};

let hairVariants = [
	"alfalfa",
	"anime",
	"balding",
	"braided",
	"braids",
	"crew",
	"crop",
	"dreads",
	"fade",
	"flip",
	"frizzlong",
	"frizzshort",
	"fuzz",
	"kpop",
	"kunoichi",
	"kunoichilong",
	"locks",
	"long",
	"longstraight",
	"mickey",
	"mohawk",
	"ponylong",
	"samurai",
	"samurailong",
	"shiny",
	"short",
	"waveshort",
	"headband",
] as const;
export type HairVariant = typeof hairVariants[number];
