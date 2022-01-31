import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const eyes: AttributeDictionary = {
	name: "eyes",
	needsTranslation: true,
	variants: [
		{
			attribute: "eyes",
			name: "visitor",
			rarity: "oneofone",
			layers: [
				{
					path: "/attributes/face/06-eyes/alien_1-c_outline.png",

					color: colors.default.black,
				},
				{
					path: "/attributes/face/06-eyes/alien_2-c_white.png",

					color: colors.default.white,
				},
			],
		},
		{
			attribute: "eyes",
			name: "bags",
			rarity: "uncommon",
			layers: [
				{
					path: "/attributes/face/06-eyes/bags_1-c_outline.png",

					color: colors.default.black,
				},
				{
					path: "/attributes/face/06-eyes/bags_2-c_skin-b_multiply.png",

					color: colors.skin["5"],
					blendMode: "multiply",
				},
			],
		},
		{
			attribute: "eyes",
			name: "closed",
			rarity: "rare",
			layers: [
				{
					path: "/attributes/face/06-eyes/closed_1-c_outline.png",

					color: colors.default.black,
				},
				{
					path: "/attributes/face/06-eyes/closed_2-c_skin-b_multiply.png",

					color: colors.skin["5"],
					blendMode: "multiply",
				},
			],
		},
		{
			attribute: "eyes",
			name: "dart",
			rarity: "common",
			restrictions: { gender: "f" },
			layers: [
				{
					path: "/attributes/face/06-eyes/dart-c_outline-g_f.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "eyes",
			name: "default",
			rarity: "common",
			layers: [
				{
					path: "/attributes/face/06-eyes/default-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "eyes",
			name: "heart",
			rarity: "rare",
			layers: [
				{
					path: "/attributes/face/06-eyes/heart-c_red.png",
					color: colors.default.red,
				},
			],
		},
		{
			attribute: "eyes",
			name: "open",
			rarity: "rare",
			layers: [
				{
					path: "/attributes/face/06-eyes/open_1-c_white.png",

					color: colors.default.white,
				},
				{
					path: "/attributes/face/06-eyes/open_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "eyes",
			name: "smile",
			rarity: "common",
			layers: [
				{
					path: "/attributes/face/06-eyes/smile-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "eyes",
			name: "squint",
			rarity: "common",
			layers: [
				{
					path: "/attributes/face/06-eyes/squint_1-c_outline.png",

					color: colors.default.black,
				},
				{
					path: "/attributes/face/06-eyes/squint_2-c_skin-b_multiply.png",

					color: colors.skin["5"],
					blendMode: "multiply",
				},
			],
		},
		{
			attribute: "eyes",
			name: "tired",
			rarity: "uncommon",
			layers: [
				{
					path: "/attributes/face/06-eyes/tired_1-c_skin-b_multiply.png",

					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/06-eyes/tired_2-c_outline.png",

					color: colors.default.black,
				},
			],
		},
		{
			attribute: "eyes",
			name: "x",
			rarity: "rare",
			layers: [
				{
					path: "/attributes/face/06-eyes/x-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			attribute: "eyes",
			name: "shady",
			rarity: "uncommon",
			layers: [
				{
					path: "/attributes/face/06-eyes/shady_1-c_white.png",
					color: colors.default.white,
				},
				{
					path: "/attributes/face/06-eyes/shady_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},
	],
};

let eyesVariants = [
	"visitor",
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
