import { NextApiRequest, NextApiResponse } from "next";
import { updateCompanion } from "../../../../data/operations";

export default async function apiCompanions(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "POST":
			const { companion } = req.body;
			const { id: tokenId } = req.query;
			if (typeof tokenId !== "string") {
				return res.status(400).json({ error: "tokenId should be a string" });
			}

			await updateCompanion({
				tokenId: parseInt(tokenId),
				companion,
			});
			return res.status(200).json({
				message: "Successfully updated",
			});
	}
}
