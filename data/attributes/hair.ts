import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const hair: AttributeDictionary = {
	name: "hair",
	needsTranslation: true,
	variants: [
		{
			name: "alfalfa",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/05-hair/alfalfa_1-v_hair-g_m.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/alfalfa_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "anime",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/anime_1-c_skin-b_multiply-g_f-a_0.png",
					order: 1,
					colorType: "skinShadow",
				},
				{
					path: "face/05-hair/anime_2-v_hair.png",
					order: 2,
					colorType: "hair",
				},
			],
		},
		{
			name: "balding",
			restrictions: { gender: "m", headShape: "flat" },
			layers: [
				{
					path: "face/05-hair/balding_1-v_hair-g_m.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/balding_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "braided",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/braided_1-v_hair-g_f-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/braided_2-v_clothing.png",
					order: 2,
					colorType: "clothing",
				},
				{
					path: "face/05-hair/braided_3-c_outline.png",
					order: 3,
					color: colors.default.black,
				},
			],
		},
		{
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
			name: "dreads",
			restrictions: { gender: "m", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/dreads_1-c_skin-b_multiply-g_m-a_0.png",
					order: 1,
					colorType: "skinShadow",
				},
				{
					path: "face/05-hair/dreads_2-v_hair.png",
					order: 2,
					colorType: "hair",
				},
				{
					path: "face/05-hair/dreads_3-c_outline.png",
					order: 3,
					color: colors.default.black,
				},
			],
		},
		{
			name: "fade",
			restrictions: { gender: "m", headShape: "flat" },
			layers: [
				{
					path: "face/05-hair/fade_1-v_hair-g_m.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/fade_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "flip",
			restrictions: { headShape: "big" },
			layers: [
				{
					path: "face/05-hair/flip_1-c_skin-b_multiply-a_0.png",
					order: 1,
					colorType: "skinShadow",
				},
				{ path: "face/05-hair/flip_2-v_hair.png", order: 2, colorType: "hair" },
				{
					path: "face/05-hair/flip_3-c_outline.png",
					order: 3,
					color: colors.default.black,
				},
			],
		},
		{
			name: "frizzlong",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/frizzlong_1-v_hair-g_f-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/frizzlong_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "frizzshort",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/frizzshort_1-v_hair-g_f-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/frizzshort_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "fuzz",
			restrictions: { headShape: "flat" },
			layers: [
				{
					path: "face/05-hair/fuzz_1-v_hair-g_m-q_5.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/fuzz_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "kpop",
			restrictions: { gender: "m", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/kpop_1-c_skin-b_multiply-g_m-a_0.png",
					order: 1,
					colorType: "skinShadow",
				},
				{ path: "face/05-hair/kpop_2-v_hair.png", order: 2, colorType: "hair" },
			],
		},
		{
			name: "kunoichi",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/kunoichi_1-c_skin-b_multiply-g_f-a_0.png",
					order: 1,
					colorType: "skinShadow",
				},
				{
					path: "face/05-hair/kunoichi_2-v_hair.png",
					order: 2,
					colorType: "hair",
				},
				{
					path: "face/05-hair/kunoichi_3-c_outline.png",
					order: 3,
					color: colors.default.black,
				},
			],
		},
		{
			name: "kunoichilong",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/kunoichilong_1-c_skin-b_multiply-g_f-a_0.png",
					order: 1,
					colorType: "skinShadow",
				},
				{
					path: "face/05-hair/kunoichilong_2-v_hair.png",
					order: 2,
					colorType: "hair",
				},
				{
					path: "face/05-hair/kunoichilong_3-c_outline.png",
					order: 3,
					color: colors.default.black,
				},
			],
		},
		{
			name: "locks",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/05-hair/locks_1-v_hair-g_m-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/locks_2-v_clothing.png",
					order: 2,
					colorType: "clothing",
				},
				{
					path: "face/05-hair/locks_3-c_outline.png",
					order: 3,
					color: colors.default.black,
				},
			],
		},
		{
			name: "long",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/long_1-v_hair-g_f-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/long_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "longstraight",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/longstraight_1-c_skin-b_multiply-g_f-a_0.png",
					order: 1,
					colorType: "skinShadow",
				},
				{
					path: "face/05-hair/longstraight_2-v_hair.png",
					order: 2,
					colorType: "hair",
				},
				{
					path: "face/05-hair/longstraight_3-c_outline.png",
					order: 3,
					color: colors.default.black,
				},
			],
		},
		{
			name: "mickey",
			restrictions: { gender: "f" },
			layers: [
				{
					path: "face/05-hair/mickey_1-v_hair-g_f-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/mickey_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "mohawk",
			layers: [
				{
					path: "face/05-hair/mohawk_1-v_hair-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/mohawk_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "ponylong",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/ponylong_1-c_skin-b_multiply-g_f-a_0.png",
					order: 1,
					colorType: "skinShadow",
				},
				{
					path: "face/05-hair/ponylong_2-v_hair.png",
					order: 2,
					colorType: "hair",
				},
				{
					path: "face/05-hair/ponylong_3-c_outline.png",
					order: 3,
					color: colors.default.black,
				},
			],
		},
		{
			name: "samurai",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/05-hair/samurai_1-v_hair-g_m-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/samurai_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "samurailong",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "face/05-hair/samurailong_1-v_hair-g_m-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/samurailong_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "shiny",
			restrictions: { headShape: "big" },
			layers: [
				{
					path: "face/05-hair/shiny_1-v_hair-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/shiny_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
				{
					path: "face/05-hair/shiny_3-c_white.png",
					order: 3,
					color: colors.default.white,
				},
			],
		},
		{
			name: "short",
			restrictions: { gender: "f", headShape: "big" },
			layers: [
				{
					path: "face/05-hair/short_1-v_hair-g_f-a_0.png",
					order: 1,
					colorType: "hair",
				},
				{
					path: "face/05-hair/short_2-c_outline.png",
					order: 2,
					color: colors.default.black,
				},
			],
		},
		{
			name: "waveshort",
			restrictions: { gender: "f" },
			layers: [
				{
					path: "face/05-hair/waveshort_1-c_skin-b_multiply-g_f-a_0.png",
					order: 1,
					colorType: "skinShadow",
				},
				{
					path: "face/05-hair/waveshort_2-v_hair.png",
					order: 2,
					colorType: "hair",
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
] as const;
export type HairVariant = typeof hairVariants[number];
