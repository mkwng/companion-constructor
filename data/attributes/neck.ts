import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const neck: AttributeDictionary = {
	name: "neck",
	needsTranslation: true,
	variants: [
		{
			attribute: "neck",
			restrictions: { gender: "f" },
			layers: [
				{
					path: "/attributes/pose2/02-neck/fneck_1-g_f-v_skin.png",
					colorType: "skin",
					batch: ["head"],
				},
				{
					path: "/attributes/pose2/02-neck/fneck_2-c_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
		},

		{
			attribute: "neck",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "/attributes/pose2/02-neck/mneck_1-g_m-v_skin.png",
					colorType: "skin",
					batch: ["head"],
				},
				{
					path: "/attributes/pose2/02-neck/mneck_2-c_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
		},
		{
			attribute: "neck",
			restrictions: { gender: "w" },
			layers: [
				{
					path: "/attributes/pose2/02-neck/mneck_1-g_m-v_skin.png",
					colorType: "skin",
					batch: ["head"],
				},
				{
					path: "/attributes/pose2/02-neck/mneck_2-c_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
		},
	],
};
