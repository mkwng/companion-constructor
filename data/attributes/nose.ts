import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const nose: AttributeDictionary = {
	name: "nose",
	needsTranslation: true,
	variants: [
		{
			attribute: "nose",
			name: "button",
			layers: [
				{
					path: "/attributes/face/11-nose/button-c_outline-g_f.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "dotline",
			layers: [
				{
					path: "/attributes/face/11-nose/dotline_1-c_skin-b_multiply-g_f.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/dotline_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "dotshadow",
			layers: [
				{
					path: "/attributes/face/11-nose/dotshadow_1-c_skin-b_multiply-g_f.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/dotshadow_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "freckly",
			layers: [
				{
					path: "/attributes/face/11-nose/freckly_1-c_skin-b_multiply-g_f.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/freckly_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "hook",
			layers: [
				{
					path: "/attributes/face/11-nose/hook_1-v_skin-g_m.png",
					colorType: "skin",
				},
				{
					path: "/attributes/face/11-nose/hook_1-c_skin-b_multiply-g_m.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/hook_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "longdown",
			layers: [
				{
					path: "/attributes/face/11-nose/longdown_1-v_skin.png",
					colorType: "skin",
				},
				{
					path: "/attributes/face/11-nose/longdown_2-c_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/longdown_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "longstraight",
			layers: [
				{
					path: "/attributes/face/11-nose/longstraight_1-v_skin.png",
					colorType: "skin",
				},
				{
					path: "/attributes/face/11-nose/longstraight_2-c_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/longstraight_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "longup",
			layers: [
				{
					path: "/attributes/face/11-nose/longup_1-v_skin.png",
					colorType: "skin",
				},
				{
					path: "/attributes/face/11-nose/longup_2-c_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/longup_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "nostrils",
			layers: [
				{
					path: "/attributes/face/11-nose/nostrils-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "pointed",
			layers: [
				{
					path: "/attributes/face/11-nose/pointed_1-c_skin-b_multiply-g_m.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/pointed_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "wavenarrow",
			layers: [
				{
					path: "/attributes/face/11-nose/wavenarrow_1-c_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/wavenarrow_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "wavewide",
			layers: [
				{
					path: "/attributes/face/11-nose/wavewide_1-c_skin-b_multiply-g_m.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/wavewide_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			attribute: "nose",
			name: "wobble",
			layers: [
				{
					path: "/attributes/face/11-nose/wobble_1-c_skin-b_multiply.png",
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: "/attributes/face/11-nose/wobble_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},
	],
};
let noseVariants = [
	"button",
	"dotline",
	"dotshadow",
	"freckly",
	"hook",
	"longdown",
	"longstraight",
	"longup",
	"nostrils",
	"pointed",
	"wavenarrow",
	"wavewide",
	"wobble",
] as const;
export type NoseVariant = typeof noseVariants[number];
