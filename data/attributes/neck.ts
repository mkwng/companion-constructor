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
					path: "pose2/02-neck/fneck_1-g_f-v_skin.png",
					colorType: "skin",
				},
				{
					path: "pose2/02-neck/fneck_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
			],
		},

		{
			attribute: "neck",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "pose2/02-neck/mneck_1-g_m-v_skin.png",
					colorType: "skin",
				},
				{
					path: "pose2/02-neck/mneck_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
			],
		},
	],
};
