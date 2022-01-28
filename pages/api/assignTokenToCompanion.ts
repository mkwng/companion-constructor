import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function transaction(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "PUT") {
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	if (!req.body.companionId || !req.body.tokenId) {
		return res.status(400).json({ error: "companionId and tokenId are required" });
	}
	await prisma.companion.update({
		where: { id: parseInt(req.body.companionId) },
		data: { tokenId: parseInt(req.body.tokenId) },
	});
	return res.status(200).json({
		message: "Companion updated",
	});
}
