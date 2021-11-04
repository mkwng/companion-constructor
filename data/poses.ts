import { background } from "./attributes/background";
import { bodyBack, bodyFront } from "./attributes/body";
import { neck } from "./attributes/neck";
import { face } from "./attributes/face";
import { blemish } from "./attributes/blemish";
import { outline } from "./attributes/outline";
import { hair } from "./attributes/hair";
import { eyes } from "./attributes/eyes";
import { brows } from "./attributes/brows";
import { mouth } from "./attributes/mouth";
import { eyewear } from "./attributes/eyewear";
import { headwear } from "./attributes/headwear";
import { nose } from "./attributes/nose";
import { AttributeDictionary, AttributeType } from "./types";

export const attributes: {
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
};

export const poses: { [key: string]: AttributeDictionary[] } = {
	"1": [
		attributes.background,
		attributes.bodyBack,
		attributes.neck,
		attributes.face,
		attributes.blemish,
		attributes.outline,
		attributes.hair,
		attributes.eyes,
		attributes.brows,
		attributes.mouth,
		attributes.eyewear,
		attributes.headwear,
		attributes.nose,
		attributes.bodyFront,
	],
	"2": [
		attributes.background,
		attributes.bodyBack,
		attributes.neck,
		attributes.face,
		attributes.blemish,
		attributes.outline,
		attributes.hair,
		attributes.eyes,
		attributes.brows,
		attributes.mouth,
		attributes.eyewear,
		attributes.headwear,
		attributes.nose,
		attributes.bodyFront,
	],
	"3": [
		attributes.background,
		attributes.bodyBack,
		attributes.neck,
		attributes.face,
		attributes.blemish,
		attributes.outline,
		attributes.hair,
		attributes.eyes,
		attributes.brows,
		attributes.mouth,
		attributes.eyewear,
		attributes.headwear,
		attributes.nose,
		attributes.bodyFront,
	],
	"4": [
		attributes.background,
		attributes.bodyBack,
		attributes.neck,
		attributes.face,
		attributes.blemish,
		attributes.outline,
		attributes.hair,
		attributes.eyes,
		attributes.brows,
		attributes.mouth,
		attributes.eyewear,
		attributes.headwear,
		attributes.nose,
	],
};
