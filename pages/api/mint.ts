import { NextApiRequest, NextApiResponse } from "next";
import { priceCustomEth, priceEth } from "../../components/contract";
import { Companion } from "../../data/types";
import { web3 } from "../../lib/web3";
import prisma from "../../lib/prisma";
import { flattenCompanion } from "../../data/helpers";
import { randomCompanion } from "../../data/random";

interface Transaction {
	hash: string;
	mintType: "random" | "custom";
	mintQty: number;
	companion?: Companion;
}

export default async function sign(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "POST":
			const { hash, mintType, mintQty, companion } = req.body as Transaction;
			const requiredFee =
				mintType == "custom"
					? web3.utils.toWei(priceCustomEth + "", "ether")
					: web3.utils.toWei(priceEth * mintQty + "", "ether");

			const checkMintStatus = async () => {
				const transaction = await web3.eth.getTransaction(hash);
				if (transaction.transactionIndex) {
					if (parseInt(transaction.value) < parseInt(requiredFee)) {
						res.status(400).json({
							error: "Not enough ETH sent",
						});
						return;
					}
					const receipt = await web3.eth.getTransactionReceipt(hash);
					const companionIds = [];
					for (let i = 0; i < receipt.logs.length; i++) {
						const companionId = web3.utils.hexToNumber(receipt.logs[i].topics[3]);
						if (!isNaN(companionId)) {
							let query;
							if (mintType == "custom" && companion) {
								query = prisma.companion.create({
									data: {
										id: companionId,
										...flattenCompanion(companion),
									},
								});
							} else {
								query = prisma.companion.create({
									data: {
										id: companionId,
										...flattenCompanion(randomCompanion()),
									},
								});
							}
							const result = await query;
							companionIds.push(result.id);
						} else {
							continue;
						}
					}
					if (companionIds.length == receipt.logs.length) {
						res.status(200).json({
							companionId: companionIds[0],
						});
					} else {
						res.status(400).json({
							error: "Something went wrong",
						});
					}
				} else {
					await new Promise((resolve) => setTimeout(resolve, 5000));
					return await checkMintStatus();
				}
			};
			return await checkMintStatus();

			break;
		case "GET":
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
