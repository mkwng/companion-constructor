import { colors } from "../colors";
import { AttributeDictionary } from "../helpers";

export const bodyBack: AttributeDictionary = {
	name: "bodyBack",
	variants: [
		{
			restrictions: { pose: "1" },
			layers: [
				{
					path: "pose1/01-legs/base_01-v_skin.png",
					colorType: "skin",
					order: 1,
				},
				{
					path: "pose1/01-legs/base_02-c_skin-b_multiply.png",

					colorType: "skinShadow",
					order: 2,
				},
				{
					path: "pose1/01-legs/base_03-c_outline.png",
					color: colors.default.black,
					order: 3,
				},
			],
		},

		{
			restrictions: { pose: "2" },
			layers: [
				{
					path: "pose2/01-body/base_1-v_skin.png",
					colorType: "skin",
					order: 1,
				},
				{
					path: "pose2/01-body/base_2-c_skin-b_multiply.png",
					colorType: "skinShadow",
					order: 2,
				},
				{
					path: "pose2/01-body/base_3-c_outline.png",
					color: colors.default.black,
					order: 3,
				},
			],
		},

		{
			restrictions: { pose: "3" },
			layers: [
				{
					path: "pose3/00-torso/base_1-v_skin.png",
					colorType: "skin",
					order: 1,
				},
				{
					path: "pose3/00-torso/base_2-c_skin-b_multiply.png",
					colorType: "skinShadow",
					order: 2,
				},
			],
		},

		{
			restrictions: { pose: "4" },
			layers: [
				{
					path: "pose4/01-body/base_1-v_skin.png",
					colorType: "skin",
					order: 1,
				},
				{
					path: "pose4/01-body/base_2-c_skin-b_multiply.png",
					colorType: "skinShadow",
					order: 2,
				},
				{
					path: "pose4/01-body/base_3-c_outline.png",
					color: colors.default.black,
					order: 3,
				},
			],
		},
	],
};
export const bodyFront: AttributeDictionary = {
	name: "bodyFront",
	variants: [
		{
			restrictions: { pose: "1" },
			layers: [
				{
					path: "pose1/12-torso/base_1-v_skin.png",
					colorType: "skin",
					order: 1,
				},
				{
					path: "pose1/12-torso/base_2-c_skin-b_multiply.png",
					colorType: "skinShadow",
					order: 1,
				},
				{
					path: "pose1/12-torso/base_3-c_outline.png",
					color: colors.default.black,
					order: 2,
				},
			],
		},

		{
			restrictions: { pose: "2" },
			layers: [
				{
					path: "pose2/04-arms/base_1-v_skin.png",
					colorType: "skin",
					order: 1,
				},
				{
					path: "pose2/04-arms/base_2-c_outline.png",
					color: colors.default.black,
					order: 1,
				},
			],
		},

		{
			restrictions: { pose: "3" },
			layers: [
				{
					path: "pose3/09-body/base_1-v_skin.png",
					colorType: "skin",
					order: 1,
				},
				{
					path: "pose3/09-body/base_2-c_skin-b_multiply.png",
					colorType: "skinShadow",
					order: 2,
				},
				{
					path: "pose3/09-body/base_3-c_outline.png",
					color: colors.default.black,
					order: 3,
				},
			],
		},
	],
};
