import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const brows: AttributeDictionary = {
	name: "brows",
	needsTranslation: true,
	variants: [
		{
			name: "bushy",
			layers: [{ path: "face/07-brows/bushy-v_hair.png", colorType: "hair" }],
		},
		{
			name: "quizzical",
			layers: [
				{
					path: "face/07-brows/quizzical-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			name: "quote",
			layers: [{ path: "face/07-brows/quote-v_hair.png", colorType: "hair" }],
		},
		{
			name: "regular",
			layers: [{ path: "face/07-brows/regular-v_hair.png", colorType: "hair" }],
		},
		{
			name: "thicksad",
			layers: [{ path: "face/07-brows/thicksad-v_hair.png", colorType: "hair" }],
		},
		{
			name: "thin",
			layers: [{ path: "face/07-brows/thin-v_hair.png", colorType: "hair" }],
		},
		{
			name: "triangle",
			layers: [{ path: "face/07-brows/triangle-v_hair.png", colorType: "hair" }],
		},
		{
			name: "unifuzz",
			layers: [{ path: "face/07-brows/unifuzz-v_hair.png", colorType: "hair" }],
		},
		{
			name: "unismooth",
			layers: [{ path: "face/07-brows/unismooth-v_hair.png", colorType: "hair" }],
		},
	],
};
let browsVariants = [
	"bushy",
	"quizzical",
	"quote",
	"regular",
	"thicksad",
	"thin",
	"triangle",
	"unifuzz",
	"unismooth",
] as const;
export type BrowsVariant = typeof browsVariants[number];
