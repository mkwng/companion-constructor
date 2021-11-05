import axios from "axios";
import sharp from "sharp";
import { colors } from "../../data/colors";
import { companionExample } from "../../data/example";
import { getColor, getLayers, getPath, selectableAttributes } from "../../data/helpers";
import { Pose, RGBColor } from "../../data/types";

const colorRegEx = /Color\d/g;

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
				if (!(key in selectableAttributes)) {
					throw new Error(`${key} not valid`);
				}
				const match = selectableAttributes[key].variants.find(
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
				url:
					"https://" +
					process.env.RAILWAY_STATIC_URL +
					getPath(layer, companion.properties.pose),
				responseType: "arraybuffer",
			})
		).data as Buffer;
	});
	const results = await Promise.all(imageBuffers);

	const final = await results.reduce(
		async (current, next, i) => {
			let color: RGBColor | undefined;
			const [layer, selection, needsTranslation] = layers[i];

			if ("color" in layer) {
				color = layer.color;
			} else if ("colorType" in layer) {
				color = getColor(layer, companion, selection?.color);
			}

			let input = next;

			if (color) {
				input = await sharp(input)
					.composite([
						{
							input: await sharp({
								create: {
									width: 2048,
									height: 2048,
									channels: 3,
									background: color,
								},
							})
								.png()
								.toBuffer(),
							blend: "in",
						},
					])
					.toBuffer();
			}
			if (needsTranslation) {
				switch (companion.properties.pose) {
					case 1:
						input = await sharp({
							create: {
								width: 2048,
								height: 2048,
								channels: 4,
								background: { r: 255, g: 255, b: 255, alpha: 0 },
							},
						})
							.png()
							.composite([
								{ input: await sharp(input).flop().toBuffer(), top: -15, left: -261 },
							])
							.toBuffer();
						break;
					case 2:
						break;
					case 3:
						input = await sharp({
							create: {
								width: 2048,
								height: 2048,
								channels: 4,
								background: { r: 255, g: 255, b: 255, alpha: 0 },
							},
						})
							.png()
							.composite([{ input, left: 521, top: -313 }])
							.toBuffer();
						break;
					case 4:
						input = await sharp({
							create: {
								width: 2048,
								height: 2048,
								channels: 4,
								background: { r: 255, g: 255, b: 255, alpha: 0 },
							},
						})
							.png()
							.composite([
								{ input: await sharp(input).flip().rotate(90).toBuffer(), top: 0, left: 246 },
							])
							.toBuffer();
						break;
				}
			}
			return sharp(await current)
				.composite([{ input, blend: layer.blendMode || "over" }])
				.toBuffer();
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
		.png({ compressionLevel: 8, quality: 80 })
		.toBuffer();

	res.setHeader("Content-Type", "image/png");
	res.setHeader("Content-Length", optimized.length);
	res.setHeader("Cache-Control", "public, max-age=31536000");
	res.status(200);
	res.end(optimized);
}
