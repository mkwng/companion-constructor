import { NextApiRequest, NextApiResponse } from "next";
import { ownerAddress } from "../../../../components/contract";
import { messageToSign } from "../../../../data/helpers";
import { updateCompanion } from "../../../../data/operations";
import { web3 } from "../../../../lib/web3";

export default async function apiCompanions(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "POST":
			const { companion } = req.body;
			const { id: tokenId } = req.query;
			if (typeof tokenId !== "string") {
				return res.status(400).json({ error: "tokenId should be a string" });
			}

			try {
				const { signature, address } = req.body;
				const recover = web3.eth.accounts.recover(
					messageToSign + "\n\nUpdate companion",
					signature
				);
				if (recover !== ownerAddress) {
					throw new Error("Signature is not valid");
				}
				await updateCompanion({
					tokenId: parseInt(tokenId),
					companion,
				});
				return res.status(200).json({
					message: "Successfully updated",
				});
			} catch (error) {
				return res.status(400).json({ error: error.message });
			}
	}
}
