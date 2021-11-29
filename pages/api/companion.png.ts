import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import sharp from "sharp";
import { getColor, getLayers, getPath, keysToCompanion } from "../../data/helpers";
import { Companion, RGBColor } from "../../data/types";
import prisma from "../../lib/prisma";

const imageCache = new NodeCache();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Example url query:
	// http://localhost:3000/api/companion.png?pose=2&gender=m&skinColor=0&hairColor=purple&backgroundColor=yellow&hair=crop&eyes=open&brows=bushy&mouth=handlebars&nose=hook&headwear=cap&headwearColor1=red&headwearColor2=blue
	// http://localhost:3000/api/companion.png?pose=2&gender=f&skinColor=0&hairColor=purple&backgroundColor=bga&hair=crop&eyes=dart&brows=bushy&mouth=handlebars&nose=hook&headwear=cap&headwearColor1=red&headwearColor2=blue
	let optimized: Buffer = await imageCache.get(req.url);

	if (optimized) {
		console.log(`Successfully used cache for ${req.url}`);
	}

	if (!optimized) {
		let companion: Companion | null;
		if (req.query.id && typeof req.query.id === "string") {
			companion = await prisma.companion.findUnique({
				where: { id: parseInt(req.query.id) },
			});
		} else {
			companion = keysToCompanion(req.query);
		}
		const layers = getLayers(companion);

		const imageBuffers = layers.map(async ([layer]) => {
			const path = getPath(layer, companion.properties.pose);
			let imageBuffer: Buffer = await imageCache.get(path);
			if (!imageBuffer) {
				imageBuffer = (
					await axios({
						url:
							"https://" +
							process.env.RAILWAY_STATIC_URL +
							getPath(layer, companion.properties.pose),
						responseType: "arraybuffer",
					})
				).data as Buffer;
				imageCache.set(path, imageBuffer);
			}
			return imageBuffer;
		});
		const results = await Promise.all(imageBuffers);

		const final = await results.reduce(
			async (current, next, i) => {
				let color: RGBColor | undefined;
				const [layer, selection, needsTranslation] = layers[i];

				if ("color" in layer) {
					color = layer.color;
				} else if ("colorType" in layer) {
					color = getColor(layer, companion, selection);
				}

				let input: Buffer = next;

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

		optimized = await sharp(final)
			.flatten()
			.png()
			// .png({ compressionLevel: 8, quality: 80 })
			.toBuffer();

		imageCache.set(req.url, optimized);
	}

	res.setHeader("Content-Type", "image/png");
	res.setHeader("Content-Length", optimized.length);
	res.setHeader("Cache-Control", "public, max-age=31536000");
	res.status(200);
	res.end(optimized);
}
