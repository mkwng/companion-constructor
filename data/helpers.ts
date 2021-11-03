import { BlemishVariant } from "./attributes/blemish";
import { BrowsVariant } from "./attributes/brows";
import { EyesVariant } from "./attributes/eyes";
import { EyewearVariant } from "./attributes/eyewear";
import { HairVariant } from "./attributes/hair";
import { HeadwearVariant } from "./attributes/headwear";
import { MouthVariant } from "./attributes/mouth";
import { NoseVariant } from "./attributes/nose";

export type AttributeType =
	| "background"
	| "bodyBack"
	| "neck"
	| "face"
	| "blemish"
	| "outline"
	| "hair"
	| "eyes"
	| "brows"
	| "mouth"
	| "eyewear"
	| "headwear"
	| "nose"
	| "bodyFront";

type Pose = 1 | 2 | 3 | 4;
type Gender = "m" | "f";
type HeadShape = "big" | "flat";

export interface Variant {
	name?: string;
	restrictions?: Restrictions;
	layers: (LayerDynamic | LayerStatic)[];
}
interface Restrictions {
	gender?: Gender;
	pose?: Pose;
	headShape?: HeadShape;
}
interface Layer {
	order?: number;
	path: string | [string, string, string, string];
}
interface LayerDynamic extends Layer {
	colorType:
		| "hair"
		| "skin"
		| "skinShadow"
		| "skinShadowDark"
		| "clothing"
		| "background"
		| "static";
}
interface LayerStatic extends Layer {
	color: RGBColor;
}
export interface Composition {
	name: string;
	restrictions?: Restrictions;
	attributes: AttributeDictionary[];
}

export interface AttributeDictionary {
	needsTranslation?: boolean;
	isOptional?: boolean;
	variants: Variant[];
}
export interface RGBColor {
	r: number;
	g: number;
	b: number;
}

export interface AttributeSelection {
	name?: string;
	color?: RGBColor | RGBColor[];
}
interface BlemishSelection extends AttributeSelection {
	name: BlemishVariant;
}
interface HairAttributeSelection extends AttributeSelection {
	name: HairVariant;
}
interface EyesAttributeSelection extends AttributeSelection {
	name: EyesVariant;
}
interface BrowsAttributeSelection extends AttributeSelection {
	name: BrowsVariant;
}
interface MouthAttributeSelection extends AttributeSelection {
	name: MouthVariant;
}
interface EyewearAttributeSelection extends AttributeSelection {
	name: EyewearVariant;
}
interface HeadwearAttributeSelection extends AttributeSelection {
	name: HeadwearVariant;
}
interface NoseAttributeSelection extends AttributeSelection {
	name: NoseVariant;
}

export interface Companion {
	name: string;
	properties: {
		gender: Gender;
		pose: Pose;
		skin: RGBColor;
		hair: RGBColor;
	};
	attributes: {
		background: AttributeSelection;
		blemish?: BlemishSelection;
		hair: HairAttributeSelection;
		eyes: EyesAttributeSelection;
		brows: BrowsAttributeSelection;
		mouth: MouthAttributeSelection;
		eyewear?: EyewearAttributeSelection;
		headwear?: HeadwearAttributeSelection;
		nose: NoseAttributeSelection;
	};
}
