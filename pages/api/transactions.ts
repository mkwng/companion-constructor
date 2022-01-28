import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function transaction(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "GET":
			if (req.query.hash) {
				const txn = await prisma.transactions.findUnique({
					where: {
						hash: req.query.hash,
					},
				});
				if (!txn) {
					return res.status(400).json({ error: "Hash does not exist" });
				}
				return res.status(200).json({
					message: "Transaction found",
					transaction: txn,
				});
			} else {
				// Get all coupons
				const transactions = await prisma.transactions.findMany({
					where: { complete: false },
				});
				return res.status(200).json({
					message: "transactions found",
					transactions,
				});
			}
		case "PUT":
			if (typeof req.body.hash !== "string") {
				return res.status(400).json({ error: "hash should be a string" });
			}
			const txn = await prisma.transactions.findUnique({ where: { hash: req.body.hash } });
			await prisma.transactions.update({
				where: {
					hash: req.body.hash,
				},
				data: {
					complete: txn.complete ? false : true,
				},
			});
			return res.status(200).json({
				message: "Transaction updated",
			});
			break;
		case "DELETE":
			if (typeof req.body.hash !== "string") {
				return res.status(400).json({ error: "hash should be a string" });
			}
			await prisma.transactions.delete({
				where: {
					hash: req.body.hash,
				},
			});
			return res.status(200).json({
				message: "Transaction deleted",
			});
			break;
	}
}
