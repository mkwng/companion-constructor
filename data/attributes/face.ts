import { AttributeDictionary } from "../helpers";

export const face: AttributeDictionary = {
	name: "face",
	needsTranslation: true,
	variants: [
		{
			restrictions: {
				gender: "m",
			},
			layers: [
				{
					order: 1,
					path: "face/01-base/mhead_1-g_m-v_skin.png",
					colorType: "skin",
				},
				{
					order: 2,
					path: "face/01-base/mhead_2-c_skin-b_multiply.png",
					colorType: "skinShadow",
				},
			],
		},
		{
			restrictions: {
				gender: "f",
			},
			layers: [
				{
					order: 1,
					path: "face/01-base/fhead_1-g_f-v_skin.png",
					colorType: "skin",
				},
				{
					order: 2,
					path: "face/01-base/fhead_2-c_skin-b_multiply.png",
					colorType: "skinShadow",
				},
			],
		},
	],
};
