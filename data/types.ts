import { AccessoryVariant } from "./attributes/accessory";
import { BlemishVariant } from "./attributes/blemish";
import { BottomVariant } from "./attributes/bottom";
import { BrowsVariant } from "./attributes/brows";
import { EyesVariant } from "./attributes/eyes";
import { EyewearVariant } from "./attributes/eyewear";
import { HairVariant } from "./attributes/hair";
import { HeadwearVariant } from "./attributes/headwear";
import { MaskVariant } from "./attributes/mask";
import { FacialhairVariant, MouthVariant } from "./attributes/mouth";
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
	| "facialhair"
	| "eyewear"
	| "headwear"
	| "nose"
	| "bodyFront"
	| "top"
	| "bottom"
	| "mask"
	| "shoes"
	| "accessory";

type Gender = "m" | "f" | "w";
type HeadShape = "big" | "flat";
type ProfileShape = "flat" | "encroached";
export type Rarity = "common" | "uncommon" | "rare" | "mythic" | "oneofone";

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
	batch?: string[];
}
export interface LayerDynamic extends LayerBase {
	colorType: "hair" | "skin" | "clothing" | "background" | "inherit";
}
export interface LayerStatic extends LayerBase {
	color: RGBColor;
}

export type Layer = LayerBase | LayerDynamic | LayerStatic;

interface LayerBaseWithData extends LayerBase {
	imgData: HTMLImageElement | HTMLCanvasElement | Buffer;
}
export interface LayerDynamicWithData extends LayerBaseWithData {
	colorType: "hair" | "skin" | "clothing" | "background" | "inherit";
}
export interface LayerStaticWithData extends LayerBaseWithData {
	color: RGBColor;
}

export type LayerWithData = LayerBaseWithData | LayerDynamicWithData | LayerStaticWithData;

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
interface FacialhairSelection extends AttributeSelectionBase {
	name: FacialhairVariant;
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
interface AccessorySelection extends AttributeSelectionBase {
	name: AccessoryVariant;
}

export type AttributeSelection =
	| AttributeSelectionBase
	| BlemishSelection
	| HairSelection
	| EyesSelection
	| BrowsSelection
	| MouthSelection
	| FacialhairSelection
	| EyewearSelection
	| HeadwearSelection
	| NoseSelection
	| TopSelection
	| BottomSelection
	| MaskSelection
	| ShoesSelection;

export interface Companion {
	tokenId?: number;
	name?: string;
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
		facialhair?: FacialhairSelection;
		eyewear?: EyewearSelection;
		headwear?: HeadwearSelection;
		nose: NoseSelection;
		top?: TopSelection;
		bottom?: BottomSelection;
		mask?: MaskSelection;
		shoes?: ShoesSelection;
		accessory?: AccessorySelection;
	};
}
