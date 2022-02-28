import { colors } from "../colors";
import {Attribute, AttributeDictionary} from "../types";

export const brows: AttributeDictionary = {
	name: Attribute.Brows,
	needsTranslation: true,
	variants: [
		{
			attribute: Attribute.Brows,
			name: "bushy",
			layers: [{ path: "/attributes/face/07-brows/bushy-v_hair.png", colorType: "hair" }],
		},
		{
			attribute: Attribute.Brows,
			name: "quizzical",
			layers: [
				{
					path: "/attributes/face/07-brows/quizzical-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: Attribute.Brows,
			name: "quote",
			layers: [{ path: "/attributes/face/07-brows/quote-v_hair.png", colorType: "hair" }],
		},
		{
			attribute: Attribute.Brows,
			name: "regular",
			layers: [{ path: "/attributes/face/07-brows/regular-v_hair.png", colorType: "hair" }],
		},
		{
			attribute: Attribute.Brows,
			name: "thicksad",
			layers: [{ path: "/attributes/face/07-brows/thicksad-v_hair.png", colorType: "hair" }],
		},
		{
			attribute: Attribute.Brows,
			name: "thin",
			layers: [{ path: "/attributes/face/07-brows/thin-v_hair.png", colorType: "hair" }],
		},
		{
			attribute: Attribute.Brows,
			name: "triangle",
			layers: [{ path: "/attributes/face/07-brows/triangle-v_hair.png", colorType: "hair" }],
		},
		{
			attribute: Attribute.Brows,
			name: "unifuzz",
			layers: [{ path: "/attributes/face/07-brows/unifuzz-v_hair.png", colorType: "hair" }],
		},
		{
			attribute: Attribute.Brows,
			name: "unismooth",
			layers: [{ path: "/attributes/face/07-brows/unismooth-v_hair.png", colorType: "hair" }],
		},
		{
			attribute: Attribute.Brows,
			name: "angry",
			layers: [{ path: "/attributes/face/07-brows/angry-v_hair.png", colorType: "hair" }],
		},
		{
			attribute: Attribute.Brows,
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
