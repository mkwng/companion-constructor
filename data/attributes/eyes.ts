import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const eyes: AttributeDictionary = {
	name: "eyes",
	needsTranslation: true,
	variants: [
		{
			name: "bags",
			layers: [
				{
					path: "face/06-eyes/bags_1-c_outline.png",

					color: colors.default.black,
				},
				{
					path: "face/06-eyes/bags_2-c_skin-b_multiply.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
			],
		},
		{
			name: "closed",
			layers: [
				{
					path: "face/06-eyes/closed_1-c_outline.png",

					color: colors.default.black,
				},
				{
					path: "face/06-eyes/closed_2-c_skin-b_multiply.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
			],
		},
		{
			name: "dart",
			restrictions: { gender: "f" },
			layers: [
				{
					path: "face/06-eyes/dart-c_outline-g_f.png",
					color: colors.default.black,
				},
			],
		},
		{
			name: "default",
			layers: [
				{
					path: "face/06-eyes/default-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			name: "heart",
			layers: [
				{
					path: "face/06-eyes/heart-c_red.png",
					color: colors.default.red,
				},
			],
		},
		{
			name: "open",
			layers: [
				{
					path: "face/06-eyes/open_1-c_white.png",

					color: colors.default.white,
				},
				{
					path: "face/06-eyes/open_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			name: "smile",
			layers: [
				{
					path: "face/06-eyes/smile-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			name: "squint",
			layers: [
				{
					path: "face/06-eyes/squint_1-c_outline.png",

					color: colors.default.black,
				},
				{
					path: "face/06-eyes/squint_2-c_skin-b_multiply.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
			],
		},
		{
			name: "tired",
			layers: [
				{
					path: "face/06-eyes/tired_1-c_skin-b_multiply.png",

					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/06-eyes/tired_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			name: "x",
			layers: [
				{
					path: "face/06-eyes/x-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			name: "shady",
			layers: [
				{
					path: "face/06-eyes/shady_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "face/06-eyes/shady_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},
	],
};

let eyesVariants = [
	"bags",
	"closed",
	"dart",
	"default",
	"heart",
	"open",
	"smile",
	"squint",
	"tired",
	"x",
	"shady",
] as const;
export type EyesVariant = typeof eyesVariants[number];
