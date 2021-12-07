import { colors } from "../colors";
import { AttributeDictionary } from "../types";

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
					path: "/attributes/face/01-base/mhead_1-g_m-v_skin.png",
					colorType: "skin",
					batch: ["head"],
				},
				{
					path: "/attributes/face/01-base/mhead_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
		},
		{
			restrictions: {
				gender: "f",
			},
			layers: [
				{
					path: "/attributes/face/01-base/fhead_1-g_f-v_skin.png",
					colorType: "skin",
					batch: ["head"],
				},
				{
					path: "/attributes/face/01-base/fhead_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
		},
		{
			restrictions: {
				gender: "w",
			},
			layers: [
				{
					path: "/attributes/face/01-base/chead_1-v_skin.png",
					colorType: "skin",
					batch: ["head"],
				},
				{
					path: "/attributes/face/01-base/chead_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
					batch: ["head"],
				},
			],
		},
	],
};
