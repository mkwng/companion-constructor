import { blemish } from "./blemish";
import { hair } from "./hair";
import { eyes } from "./eyes";
import { brows } from "./brows";
import { mouth } from "./mouth";
import { eyewear } from "./eyewear";
import { headwear } from "./headwear";
import { nose } from "./nose";
import { top } from "./top";
import { bottom } from "./bottom";
import { mask } from "./mask";
import { AttributeDictionary, AttributeType } from "../types";
import { background } from "./background";
import { bodyBack, bodyFront } from "./body";
import { neck } from "./neck";
import { face } from "./face";
import { outline } from "./outline";

export const allAttributes: {
	[attribute in AttributeType]: AttributeDictionary;
} = {
	background,
	bodyBack,
	neck,
	face,
	blemish,
	outline,
	hair,
	eyes,
	brows,
	mouth,
	eyewear,
	headwear,
	nose,
	bodyFront,
	top,
	bottom,
	mask,
};

export const selectableAttributes: { [key: string]: AttributeDictionary } = {
	blemish,
	hair,
	eyes,
	brows,
	mouth,
	eyewear,
	headwear,
	nose,
	top,
	bottom,
	mask,
};
export const selectableAttributesArray: AttributeDictionary[] = [
	blemish,
	hair,
	eyes,
	brows,
	mouth,
	eyewear,
	headwear,
	nose,
	top,
	bottom,
	mask,
];
