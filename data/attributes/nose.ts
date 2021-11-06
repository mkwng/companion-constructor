import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const nose: AttributeDictionary = {
	name: "nose",
	needsTranslation: true,
	variants: [
		{
			name: "button",
			layers: [
				{
					path: "face/11-nose/button-c_outline-g_f.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "dotline",
			layers: [
				{
					path: "face/11-nose/dotline_1-c_skin-b_multiply-g_f.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/dotline_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "dotshadow",
			layers: [
				{
					path: "face/11-nose/dotshadow_1-c_skin-b_multiply-g_f.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/dotshadow_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "freckly",
			layers: [
				{
					path: "face/11-nose/freckly_1-c_skin-b_multiply-g_f.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/freckly_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "hook",
			layers: [
				{
					path: "face/11-nose/hook_1-v_skin-g_m.png",
					colorType: "skin",
				},
				{
					path: "face/11-nose/hook_1-c_skin-b_multiply-g_m.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/hook_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "longdown",
			layers: [
				{
					path: "face/11-nose/longdown_1-v_skin.png",
					colorType: "skin",
				},
				{
					path: "face/11-nose/longdown_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/longdown_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "longstraight",
			layers: [
				{
					path: "face/11-nose/longstraight_1-v_skin.png",
					colorType: "skin",
				},
				{
					path: "face/11-nose/longstraight_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/longstraight_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "longup",
			layers: [
				{
					path: "face/11-nose/longup_1-v_skin.png",
					colorType: "skin",
				},
				{
					path: "face/11-nose/longup_2-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/longup_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "mask",
			layers: [
				{
					path: "face/11-nose/mask_1-v_clothing.png",
					colorType: "clothing",
				},
				{ path: "face/11-nose/mask_2.png", color: colors.skin["1"], blendMode: "multiply" },
				{
					path: "face/11-nose/mask_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "nostrils",
			layers: [
				{
					path: "face/11-nose/nostrils-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "pointed",
			layers: [
				{
					path: "face/11-nose/pointed_1-c_skin-b_multiply-g_m.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/pointed_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "wavenarrow",
			layers: [
				{
					path: "face/11-nose/wavenarrow_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/wavenarrow_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "wavewide",
			layers: [
				{
					path: "face/11-nose/wavewide_1-c_skin-b_multiply-g_m.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/wavewide_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "wobble",
			layers: [
				{
					path: "face/11-nose/wobble_1-c_skin-b_multiply.png",
					color: colors.skin["1"],
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/wobble_2-c_outline.png",
					color: colors.default.black,
				},
			],
		},

		{
			name: "fullmask",
			layers: [
				{
					path: "face/11-nose/fullmask_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "face/11-nose/fullmask_2-v_clothing-b_multiply.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/fullmask_3-c_outline.png",
					color: colors.default.black,
				},
			],
		},
		{
			name: "warrior",
			layers: [
				{
					path: "face/11-nose/warrior_1-v_clothing.png",
					colorType: "clothing",
				},
				{
					path: "face/11-nose/warrior_2-c_white.png",
					color: colors.default.white,
				},
				{
					path: "face/11-nose/warrior_3-c_black-b_multiply.png",
					color: colors.default.gray,
					blendMode: "multiply",
				},
				{
					path: "face/11-nose/warrior_4-c_white.png",
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
	"mask",
	"nostrils",
	"pointed",
	"wavenarrow",
	"wavewide",
	"wobble",
	"fullmask",
	"warrior",
] as const;
export type NoseVariant = typeof noseVariants[number];
