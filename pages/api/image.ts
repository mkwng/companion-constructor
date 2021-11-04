import axios from "axios";
import sharp from "sharp";

// Returns the
export default async function handler(req, res) {
	const path = "http://localhost:3000/attributes/pose1/01-legs/base_01-v_skin.png";
	const input = (await axios({ url: path, responseType: "arraybuffer" })).data as Buffer;

	const buffer = await sharp(input).toBuffer();

	res.setHeader("Content-Type", "image/png");
	res.setHeader("Content-Length", buffer.length);
	res.end(buffer);
}
