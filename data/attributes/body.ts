import { colors } from "../colors";
import { AttributeDictionary } from "../types";

export const bodyBack: AttributeDictionary = {
	name: "bodyBack",
	variants: [
		{
			attribute: "bodyBack",
			layers: [
				{
					path: {
						1: "/attributes/pose1/01-legs/base_01-v_skin.png",
						2: "/attributes/pose2/01-body/base_1-v_skin.png",
						3: "/attributes/pose3/00-torso/base_1-v_skin.png",
						4: "/attributes/pose4/01-body/base_1-v_skin.png",
					},
					colorType: "skin",
				},
				{
					path: {
						1: "/attributes/pose1/01-legs/base_02-c_skin-b_multiply.png",
						2: "/attributes/pose2/01-body/base_2-c_skin-b_multiply.png",
						3: "/attributes/pose3/00-torso/base_2-c_skin-b_multiply.png",
						4: "/attributes/pose4/01-body/base_2-c_skin-b_multiply.png",
					},

					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/01-legs/base_03-c_outline.png",
						2: "/attributes/pose2/01-body/base_3-c_outline.png",
						4: "/attributes/pose4/01-body/base_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
	],
};
export const bodyFront: AttributeDictionary = {
	name: "bodyFront",
	variants: [
		{
			attribute: "bodyFront",
			layers: [
				{
					path: {
						1: "/attributes/pose1/12-torso/base_1-v_skin.png",
						2: "/attributes/pose2/04-arms/base_1-v_skin.png",
						3: "/attributes/pose3/09-body/base_1-v_skin.png",
					},
					colorType: "skin",
				},
				{
					path: {
						1: "/attributes/pose1/12-torso/base_2-c_skin-b_multiply.png",
						3: "/attributes/pose3/09-body/base_2-c_skin-b_multiply.png",
					},
					color: colors.skin["5"],
					blendMode: "multiply",
				},
				{
					path: {
						1: "/attributes/pose1/12-torso/base_3-c_outline.png",
						2: "/attributes/pose2/04-arms/base_2-c_outline.png",
						3: "/attributes/pose3/09-body/base_3-c_outline.png",
					},
					color: colors.default.black,
				},
			],
		},
	],
};
