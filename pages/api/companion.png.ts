import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import NodeCache from "node-cache";
import { apiToKeys, drawLayer, getLayers, getPath, keysToCompanion } from "../../data/helpers";
import { AttributeSelection, Companion, LayerWithData, Pose, RGBColor } from "../../data/types";
import prisma from "../../lib/prisma";

const imageCache = new NodeCache();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Example url query:
	// http://localhost:3000/api/companion.png?pose=2&gender=m&skinColor=0&hairColor=purple&backgroundColor=yellow&hair=crop&eyes=open&brows=bushy&mouth=handlebars&nose=hook&headwear=cap&headwearColor1=red&headwearColor2=blue
	// http://localhost:3000/api/companion.png?pose=2&gender=f&skinColor=0&hairColor=purple&backgroundColor=bga&hair=crop&eyes=dart&brows=bushy&mouth=handlebars&nose=hook&headwear=cap&headwearColor1=red&headwearColor2=blue

	const { w, h } = {
		w: req.query.size ? parseInt(req.query.size as string) || 1024 : 1024,
		h: req.query.size ? parseInt(req.query.size as string) || 1024 : 1024,
	};
	const ratio = w / 2048;

	const applyColor = async (input: Buffer, color: RGBColor): Promise<Buffer> => {
		if (!input) return input;
		const result = await sharp(input)
			.composite([
				{
					input: await sharp({
						create: {
							width: w,
							height: h,
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
		return result;
	};
	const applyTransformation = async (input: Buffer, pose: Pose): Promise<Buffer> => {
		let result: Buffer;
		switch (pose) {
			case 1:
				result = await sharp({
					create: {
						width: w,
						height: h,
						channels: 4,
						background: { r: 255, g: 255, b: 255, alpha: 0 },
					},
				})
					.png()
					.composite([
						{
							input: await sharp(input).flop().toBuffer(),
							top: Math.round(-15 * ratio),
							left: Math.round(-261 * ratio),
						},
					])
					.toBuffer();
				break;
			case 2:
				result = input;
				break;
			case 3:
				result = await sharp({
					create: {
						width: w,
						height: h,
						channels: 4,
						background: { r: 255, g: 255, b: 255, alpha: 0 },
					},
				})
					.png()
					.composite([{ input, left: Math.round(521 * ratio), top: Math.round(-313 * ratio) }])
					.toBuffer();
				break;
			case 4:
				result = await sharp({
					create: {
						width: w,
						height: h,
						channels: 4,
						background: { r: 255, g: 255, b: 255, alpha: 0 },
					},
				})
					.png()
					.composite([
						{
							input: await sharp(input).flip().rotate(90).toBuffer(),
							top: 0,
							left: Math.round(246 * ratio),
						},
					])
					.toBuffer();
				break;
		}
		return result;
	};

	const query = req.query;

	let optimized: Buffer;

	let companion: Companion | null;
	const batches: Set<string> = new Set();
	if (typeof query.id === "string" && !isNaN(parseFloat(query.id))) {
		const result = (
			await prisma.companion.findMany({
				where: { tokenId: parseInt(query.id) },
			})
		)[0];
		if (!result) {
			const boxBuffer = (
				await axios({
					url: "https://companioninabox.art/box.png",
					responseType: "arraybuffer",
				})
			).data as Buffer;
			res.setHeader("Content-Type", "image/png");
			res.setHeader("Content-Length", boxBuffer.length);
			res.status(200);
			res.end(boxBuffer);
			return;
		} else {
			companion = keysToCompanion(apiToKeys(result));
		}
	} else {
		companion = keysToCompanion(query);
	}
	if (!companion?.properties?.pose) {
		const boxBuffer = (
			await axios({
				url: "https://companioninabox.art/box.png",
				responseType: "arraybuffer",
			})
		).data as Buffer;
		res.setHeader("Content-Type", "image/png");
		res.setHeader("Content-Length", boxBuffer.length);
		res.status(200);
		res.end(boxBuffer);
		return;
	}
	const layers = getLayers(companion);

	const imageBuffers = layers.map(async ([layer]) => {
		const gottenPath = getPath(layer, companion.properties.pose);

		let imgBuffer: Buffer = await imageCache.get(gottenPath);
		if (!imgBuffer) {
			imgBuffer = (
				await axios({
					url: "https://companioninabox.art" + gottenPath,
					responseType: "arraybuffer",
				})
			).data as Buffer;
			imageCache.set(gottenPath, imgBuffer);
		}
		const metadata = await sharp(imgBuffer).metadata();
		if (metadata.width !== w || metadata.height !== h) {
			return sharp(imgBuffer).resize(w, h).toBuffer();
		}
		return sharp(imgBuffer).toBuffer();
	});
	const results = await Promise.all(imageBuffers);

	const layersWithData: [LayerWithData, AttributeSelection?, boolean?][] = layers.map(([layer, ...rest], i) => {
		return [
			{
				imgData: results[i],
				...layer,
			},
			...rest,
		];
	});

	const final = await layersWithData.reduce(
		async (canvas, [layer], i) => {
			await canvas;
			if (layer.batch) {
				if (layer.batch?.length && layer.batch.some((item) => batches.has(item))) {
					return canvas;
				}
			}

			const result = await drawLayer({
				companion,
				canvas: await canvas,
				layers: layersWithData,
				drawIndex: i,
				usedBatches: batches,
				paint: (input: Buffer, target: Buffer, blendMode) => {
					const blend = blendMode
						? ((): "multiply" | "dest-over" | "over" => {
								switch (blendMode) {
									case "multiply":
										return "multiply";
									case "destination-over":
										return "dest-over";
									default:
										return "over";
								}
						  })()
						: "over";
					const result = sharp(target).composite([{ input, blend }]).toBuffer();
					return result;
				},
				createCanvas: () => {
					return sharp({
						create: {
							width: w,
							height: h,
							channels: 4,
							background: { r: 255, g: 255, b: 255, alpha: 0 },
						},
					})
						.png()
						.toBuffer();
				},
				replaceColor: applyColor,
				translateImage: applyTransformation,
				debugEscape: async (buffer) => {
					optimized = await sharp(buffer).flatten().png({ compressionLevel: 8, quality: 80 }).toBuffer();
					res.setHeader("Content-Type", "image/png");
					res.setHeader("Content-Length", optimized.length);
					res.setHeader("Cache-Control", "public, max-age=31536000");
					res.status(200);
					res.end(optimized);
					return;
				},
				debugDeep: false,
			});
			return result;
		},
		sharp({
			create: {
				width: w,
				height: h,
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
		.toBuffer();

	res.setHeader("Content-Type", "image/png");
	res.setHeader("Content-Length", optimized.length);
	res.status(200);
	res.end(optimized);
}
