import { NextApiRequest, NextApiResponse } from "next";
import { messageToSign } from "../../data/helpers";
import { web3 } from "../../lib/web3";

export default async function sign(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "GET":
			const recover = web3.eth.accounts.recover(messageToSign, req.query.signature as string);
			if (recover === req.query.address) {
				const result = {
					message: "Get request received",
					address: req.query.address,
					signature: req.query.signature,
				};
				res.status(200).json(result);
			}
			// Not allowed
			res.status(403).json({
				error: "Signature is not valid",
			});
			break;
		case "POST":
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
