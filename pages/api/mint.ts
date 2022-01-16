import { NextApiRequest, NextApiResponse } from "next";
import { companionAddress, priceCustomEth, priceEth } from "../../components/contract";
import { Companion } from "../../data/types";
import { companionContract, web3 } from "../../lib/web3";
import { randomCompanion } from "../../data/random";
import { createCompanion } from "../../data/operations";
import prisma from "../../lib/prisma";

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

			const hashUsed = await prisma.transactions.findUnique({
				where: { hash },
			});
			if (hashUsed) {
				throw new Error("Hash already used");
			}

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
					if (receipt.to !== companionAddress) {
						return res.status(400).json({
							error: "Transaction not sent to Companion contract",
						});
					}
					const companionIds = [];
					for (let i = 0; i < receipt.logs.length; i++) {
						const tokenId = web3.utils.hexToNumber(receipt.logs[i].topics[3]);
						if (!isNaN(tokenId)) {
							let query;
							if (mintType == "custom" && companion) {
								query = createCompanion({
									tokenId,
									companion,
								});
							} else {
								query = createCompanion({
									tokenId,
									companion: randomCompanion(),
								});
							}
							const result = await query;
							companionIds.push(result.tokenId);
						} else {
							console.error("Invalid companion id", tokenId);
							continue;
						}
					}
					if (companionIds.length == receipt.logs.length) {
						await prisma.transactions.create({
							data: {
								hash,
								date: new Date(),
								txnType: "customization",
								txnValue: requiredFee,
							},
						});
						res.status(200).json({
							companionIds,
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
