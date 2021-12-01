import { BlemishVariant } from "./attributes/blemish";
import { BottomVariant } from "./attributes/bottom";
import { BrowsVariant } from "./attributes/brows";
import { EyesVariant } from "./attributes/eyes";
import { EyewearVariant } from "./attributes/eyewear";
import { HairVariant } from "./attributes/hair";
import { HeadwearVariant } from "./attributes/headwear";
import { MaskVariant } from "./attributes/mask";
import { MouthVariant } from "./attributes/mouth";
import { NoseVariant } from "./attributes/nose";
import { ShoesVariant } from "./attributes/shoes";
import { TopVariant } from "./attributes/top";

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
	| "bodyFront"
	| "top"
	| "bottom"
	| "mask"
	| "shoes";

type Gender = "m" | "f";
type HeadShape = "big" | "flat";
type ProfileShape = "flat" | "encroached";
type Rarity = "common" | "uncommon" | "rare" | "mythic";

export interface Variant {
	attribute?: AttributeType;
	name?: string;
	restrictions?: Restrictions;
	layers: Layer[];
	rarity?: Rarity;
	hides?: AttributeType[];
}

export interface Restrictions {
	gender?: Gender;
	pose?: Pose;
	headShape?: HeadShape;
	profileShape?: ProfileShape;
}
interface LayerBase {
	blendMode?: "multiply" | "destination-over";
	path:
		| string
		| {
				"1"?: string;
				"2"?: string;
				"3"?: string;
				"4"?: string;
		  };
}
interface LayerDynamic extends LayerBase {
	colorType: "hair" | "skin" | "clothing" | "background" | "inherit";
}
interface LayerStatic extends LayerBase {
	color: RGBColor;
}

export type Layer = LayerBase | LayerDynamic | LayerStatic;

export interface AttributeDictionary {
	name: AttributeType;
	needsTranslation?: boolean;
	isOptional?: boolean;
	appearsIn?: number;
	variants: Variant[];
}
export interface RGBColor {
	r: number;
	g: number;
	b: number;
}

export interface AttributeSelectionBase {
	color?: RGBColor[];
	colorIndex?: number;
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
interface TopSelection extends AttributeSelectionBase {
	name: TopVariant;
}
interface BottomSelection extends AttributeSelectionBase {
	name: BottomVariant;
}
interface MaskSelection extends AttributeSelectionBase {
	name: MaskVariant;
}
interface ShoesSelection extends AttributeSelectionBase {
	name: ShoesVariant;
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
	| NoseSelection
	| TopSelection
	| BottomSelection
	| MaskSelection
	| ShoesSelection;

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
		top?: TopSelection;
		bottom?: BottomSelection;
		mask?: MaskSelection;
		shoes?: ShoesSelection;
	};
}
