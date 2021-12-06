import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const outline: AttributeDictionary = {
	name: "outline",
	needsTranslation: true,
	variants: [
		{
			attribute: "outline",
			restrictions: { gender: "f" },
			layers: [
				{
					path: "/attributes/face/03-outline/fhead-g_f-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "outline",
			restrictions: { gender: "m" },
			layers: [
				{
					path: "/attributes/face/03-outline/mhead-g_m-c_outline.png",
					color: colors.default.black,
				},
			],
		},
	],
};
