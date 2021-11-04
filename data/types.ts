import { BlemishVariant } from "./attributes/blemish";
import { BrowsVariant } from "./attributes/brows";
import { EyesVariant } from "./attributes/eyes";
import { EyewearVariant } from "./attributes/eyewear";
import { HairVariant } from "./attributes/hair";
import { HeadwearVariant } from "./attributes/headwear";
import { MouthVariant } from "./attributes/mouth";
import { NoseVariant } from "./attributes/nose";

export enum Pose {
	Lookback = 1,
	Laydown,
	Leanback,
	Headdown,
}

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

type Gender = "m" | "f";
type HeadShape = "big" | "flat";

export interface Variant {
	name?: string;
	restrictions?: Restrictions;
	layers: Layer[];
}
interface Restrictions {
	gender?: Gender;
	pose?: Pose;
	headShape?: HeadShape;
}
interface LayerBase {
	blendMode?: "multiply";
	path:
		| string
		| {
				"1": string;
				"2": string;
				"3": string;
				"4": string;
		  };
}
interface LayerDynamic extends LayerBase {
	colorType: "hair" | "skin" | "clothing" | "background";
}
interface LayerStatic extends LayerBase {
	color: RGBColor;
}

export type Layer = LayerBase | LayerDynamic | LayerStatic;

export interface AttributeDictionary {
	name: string;
	needsTranslation?: boolean;
	isOptional?: boolean;
	variants: Variant[];
}
export interface RGBColor {
	r: number;
	g: number;
	b: number;
}

export interface AttributeSelectionBase {
	color?: RGBColor[];
}
interface BlemishSelection extends AttributeSelectionBase {
	name: BlemishVariant;
}
interface HairSelection extends AttributeSelectionBase {
	name: HairVariant;
}
interface EyesSelection extends AttributeSelectionBase {
	name: EyesVariant;
}
interface BrowsSelection extends AttributeSelectionBase {
	name: BrowsVariant;
}
interface MouthSelection extends AttributeSelectionBase {
	name: MouthVariant;
}
interface EyewearSelection extends AttributeSelectionBase {
	name: EyewearVariant;
}
interface HeadwearSelection extends AttributeSelectionBase {
	name: HeadwearVariant;
}
interface NoseSelection extends AttributeSelectionBase {
	name: NoseVariant;
}

export type AttributeSelection =
	| AttributeSelectionBase
	| BlemishSelection
	| HairSelection
	| EyesSelection
	| BrowsSelection
	| MouthSelection
	| EyewearSelection
	| HeadwearSelection
	| NoseSelection;

export interface Companion {
	name: string;
	properties: {
		gender: Gender;
		pose: Pose;
		skin: RGBColor;
		hair: RGBColor;
		background: RGBColor;
	};
	attributes: {
		blemish?: BlemishSelection;
		hair: HairSelection;
		eyes: EyesSelection;
		brows: BrowsSelection;
		mouth: MouthSelection;
		eyewear?: EyewearSelection;
		headwear?: HeadwearSelection;
		nose: NoseSelection;
	};
}
