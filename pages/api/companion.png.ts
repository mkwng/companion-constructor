import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import sharp from "sharp";
import { apiToKeys, drawLayer, getLayers, getPath, keysToCompanion } from "../../data/helpers";
import { AttributeSelection, Companion, LayerWithData, Pose, RGBColor } from "../../data/types";
import prisma from "../../lib/prisma";

const imageCache = new NodeCache();
const applyColor = async (input: Buffer, color: RGBColor): Promise<Buffer> => {
	return await sharp(input)
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
};
const applyTransformation = async (input: Buffer, pose: Pose): Promise<Buffer> => {
	switch (pose) {
		case 1:
			return await sharp({
				create: {
					width: 2048,
					height: 2048,
					channels: 4,
					background: { r: 255, g: 255, b: 255, alpha: 0 },
				},
			})
				.png()
				.composite([{ input: await sharp(input).flop().toBuffer(), top: -15, left: -261 }])
				.toBuffer();
		case 2:
			return input;
		case 3:
			return await sharp({
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
		case 4:
			return await sharp({
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
	}
};

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
		const batches: string[] = [];
		if (req.query.id && typeof req.query.id === "string") {
			const result = await prisma.companion.findUnique({
				where: { id: parseInt(req.query.id) },
			});
			companion = keysToCompanion(apiToKeys(result));
		} else {
			companion = keysToCompanion(req.query);
		}
		if (!companion?.properties?.pose) {
			res.status(404).send("No companion found");
			return;
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

		const layersWithData: [LayerWithData, AttributeSelection?, boolean?][] = layers.map(
			([layer, ...rest], i) => {
				return [
					{
						imgData: results[i],
						...layer,
					},
					...rest,
				];
			}
		);

		const final = await layers.reduce(
			async (canvas, [layer], i) => {
				if (layer.batch) {
					if (batches.includes(layer.batch)) {
						return canvas;
					}
					batches.push(layer.batch);
				}

				return await drawLayer({
					companion,
					canvas: await canvas,
					layers: layersWithData,
					drawIndex: i,
					recurseBatches: true,
					paint: (input, target, blendMode) => {
						target = target as Buffer;
						input = input as Buffer;
						const blend = blendMode
							? ((): "multiply" | "dest-over" | "over" => {
									switch (layer.blendMode) {
										case "multiply":
											return "multiply";
										case "destination-over":
											return "dest-over";
										default:
											return "over";
									}
							  })()
							: "over";
						return sharp(target).composite([{ input, blend }]).toBuffer();
					},
					createCanvas: () => {
						return sharp({
							create: {
								width: 2048,
								height: 2048,
								channels: 4,
								background: { r: 255, g: 255, b: 255, alpha: 0 },
							},
						})
							.png()
							.toBuffer();
					},
					replaceColor: applyColor,
					translateImage: applyTransformation,
				});
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

		optimized = await sharp(final as Buffer)
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
