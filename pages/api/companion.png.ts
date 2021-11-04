import axios from "axios";
import sharp from "sharp";
import { blemish } from "../../data/attributes/blemish";
import { brows } from "../../data/attributes/brows";
import { eyes } from "../../data/attributes/eyes";
import { eyewear } from "../../data/attributes/eyewear";
import { hair } from "../../data/attributes/hair";
import { headwear } from "../../data/attributes/headwear";
import { mouth } from "../../data/attributes/mouth";
import { nose } from "../../data/attributes/nose";
import { colors } from "../../data/colors";
import { companionExample } from "../../data/example";
import { getColor, getLayers, getPath } from "../../data/helpers";
import { AttributeDictionary, Pose, RGBColor } from "../../data/types";

const attributes: { [key: string]: AttributeDictionary } = {
	blemish,
	hair,
	eyes,
	brows,
	mouth,
	eyewear,
	headwear,
	nose,
};

const colorRegEx = /Color\d/g;

// Returns the
export default async function handler(req, res) {
	// Example url query:
	// http://localhost:3000/api/companion.png?pose=2&gender=m&skinColor=0&hairColor=purple&backgroundColor=yellow&hair=crop&eyes=open&brows=bushy&mouth=handlebars&nose=hook&headwear=cap&headwearColor1=red&headwearColor2=blue
	// http://localhost:3000/api/companion.png?pose=2&gender=f&skinColor=0&hairColor=purple&backgroundColor=bga&hair=crop&eyes=dart&brows=bushy&mouth=handlebars&nose=hook&headwear=cap&headwearColor1=red&headwearColor2=blue
	const companion = companionExample;
	for (const key in req.query) {
		switch (key) {
			case "pose":
				if (!(req.query[key] in Pose)) {
					throw new Error(`${key} not valid`);
				}
				companion.properties.pose = Number(req.query[key]);
				break;
			case "gender":
				if (req.query[key] !== "f" && req.query[key] !== "m") {
					throw new Error(`${key} not valid`);
				}
				companion.properties.gender = req.query[key];
				break;
			case "skinColor":
			case "hairColor":
			case "backgroundColor":
				const propName = key.replace("Color", "");
				const color = colors[propName][req.query[key]];
				if (!color) {
					throw new Error(`${key} not valid`);
				}
				companion.properties[propName] = color;
				break;
			default:
				if (key.match(colorRegEx)) {
					continue;
				}
				if (!(key in attributes)) {
					throw new Error(`${key} not valid`);
				}
				const match = attributes[key].variants.find(
					(variant) => variant.name === req.query[key]
				);
				if (!match) {
					throw new Error(`${key} not valid`);
				}
				companion.attributes[key] = {
					name: req.query[key],
				};
				let i = 1;
				let colorList: RGBColor[] = [];
				while (req.query[key + "Color" + i]) {
					colorList.push(colors.clothing[req.query[key + "Color" + i++]]);
				}
				if (colorList.length > 0) {
					companion.attributes[key].color = colorList;
				}
		}
	}
	const layers = getLayers(companion);

	const imageBuffers = layers.map(async ([layer]) => {
		return (
			await axios({
				url: process.env.NEXT_PUBLIC_URL + getPath(layer, companion.properties.pose),
				responseType: "arraybuffer",
			})
		).data as Buffer;
	});
	const results = await Promise.all(imageBuffers);

	const final = await results.reduce(
		async (current, next, i) => {
			let color: RGBColor | undefined;
			const [layer, selection] = layers[i];

			if ("color" in layer) {
				color = layer.color;
			} else if ("colorType" in layer) {
				color = getColor(layer, companion, selection?.color);
			}

			if (color) {
				// let's do things
				const plain = await sharp({
					create: {
						width: 2048,
						height: 2048,
						channels: 3,
						background: color,
					},
				})
					.png()
					.toBuffer();
				const intermediate = await sharp(next)
					.composite([{ input: plain, blend: "in" }])
					.toBuffer();
				return sharp(await current)
					.composite([{ input: intermediate, blend: layer.blendMode || "over" }])
					.toBuffer();
			} else {
				return sharp(await current)
					.composite([{ input: next, blend: layer.blendMode || "over" }])
					.toBuffer();
			}
		},
		sharp({
			create: {
				width: 2048,
				height: 2048,
				channels: 4,
				background: { r: 255, g: 255, b: 255, alpha: 0 },
			},
		})
			.png()
			.toBuffer()
	);

	const optimized = await sharp(final)
		.resize({ width: 960 })
		.flatten()
		.png({ compressionLevel: 9, quality: 50 })
		.toBuffer();

	res.setHeader("Content-Type", "image/jpg");
	res.setHeader("Content-Length", optimized.length);
	res.end(optimized);
}
