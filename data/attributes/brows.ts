import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const brows: AttributeDictionary = {
	name: "brows",
	needsTranslation: true,
	variants: [
		{
			name: "bushy",
			layers: [{ path: "/attributes/face/07-brows/bushy-v_hair.png", colorType: "hair" }],
		},
		{
			name: "quizzical",
			layers: [
				{
					path: "/attributes/face/07-brows/quizzical-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			name: "quote",
			layers: [{ path: "/attributes/face/07-brows/quote-v_hair.png", colorType: "hair" }],
		},
		{
			name: "regular",
			layers: [{ path: "/attributes/face/07-brows/regular-v_hair.png", colorType: "hair" }],
		},
		{
			name: "thicksad",
			layers: [{ path: "/attributes/face/07-brows/thicksad-v_hair.png", colorType: "hair" }],
		},
		{
			name: "thin",
			layers: [{ path: "/attributes/face/07-brows/thin-v_hair.png", colorType: "hair" }],
		},
		{
			name: "triangle",
			layers: [{ path: "/attributes/face/07-brows/triangle-v_hair.png", colorType: "hair" }],
		},
		{
			name: "unifuzz",
			layers: [{ path: "/attributes/face/07-brows/unifuzz-v_hair.png", colorType: "hair" }],
		},
		{
			name: "unismooth",
			layers: [{ path: "/attributes/face/07-brows/unismooth-v_hair.png", colorType: "hair" }],
		},
		{
			name: "angry",
			layers: [{ path: "/attributes/face/07-brows/angry-v_hair.png", colorType: "hair" }],
		},
		{
			name: "neutral",
			layers: [
				{
					path: "/attributes/face/07-brows/neutral-c_outline.png",
					color: colors.default.black,
				},
			],
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
	"angry",
	"neutral",
] as const;
export type BrowsVariant = typeof browsVariants[number];
