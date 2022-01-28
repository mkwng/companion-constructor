import { NextApiRequest, NextApiResponse } from "next";
import { companionAddress, priceCustomEth, priceEth } from "../../components/contract";
import { Companion } from "../../data/types";
import { web3 } from "../../lib/web3";
import { randomCompanion } from "../../data/random";
import { createCompanion, incrementCustomCounter } from "../../data/operations";
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
			if (hashUsed?.complete) {
				return res.status(400).json({
					error: "Hash already used",
				});
			}

			const requiredFee =
				mintType == "custom"
					? web3.utils.toWei(priceCustomEth + "", "ether")
					: web3.utils.toWei(priceEth * mintQty + "", "ether");

			const checkMintStatus = async () => {
				const transaction = await web3.eth.getTransaction(hash);
				if (transaction?.transactionIndex && transaction?.blockNumber) {
					console.log("Transaction mined");
					if (parseInt(transaction.value) < parseInt(requiredFee)) {
						return res.status(400).json({
							error: "Not enough ETH sent",
						});
						return;
					}
					const receipt = await web3.eth.getTransactionReceipt(hash);
					if (receipt.to.toLowerCase() !== companionAddress.toLowerCase()) {
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
								// Todo: Check if there are any "mythic" variants applied...

								if (hashUsed && hashUsed.companionId) {
									query = prisma.companion.update({
										where: { id: hashUsed.companionId },
										data: { tokenId },
									});
								} else {
									query = createCompanion({
										tokenId,
										companion: { ...companion, name: "Custom Companion" },
									});
								}
							} else {
								query = createCompanion({
									tokenId,
									companion: { ...randomCompanion(), name: "Randomly Generated Companion" },
								});
							}
							incrementCustomCounter();
							const result = await query;
							companionIds.push(result.tokenId);
						} else {
							console.error("Invalid companion id", tokenId);
							continue;
						}
					}
					if (companionIds.length == receipt.logs.length) {
						if (!hashUsed) {
							await prisma.transactions.create({
								data: {
									hash,
									date: new Date(),
									txnType: mintType == "custom" ? "mintCustom" : "mintRandom",
									txnValue: requiredFee,
								},
							});
						} else {
							await prisma.transactions.update({
								where: { hash },
								data: {
									complete: true,
								},
							});
						}

						prisma.counters.upsert({
							where: { name: "total" },
							create: { value: companionIds[companionIds.length - 1] },
							data: { value: companionIds[companionIds.length - 1] },
						});

						return res.status(200).json({
							companionIds,
						});
					} else {
						return res.status(400).json({
							error: "Something went wrong",
						});
					}
				} else {
					console.log("Transaction not yet mined");
					if (companion?.properties.background) {
						const incompleteCompanion = await createCompanion({
							companion,
						});
						console.log(`Incomplete companion id = ${incompleteCompanion.id}`);
						await prisma.transactions.create({
							data: {
								hash,
								date: new Date(),
								txnType: "mintCustom",
								txnValue: requiredFee,
								complete: false,
								companionId: incompleteCompanion.id,
							},
						});
					}
					// await new Promise((resolve) => setTimeout(resolve, 5000));
					// return await checkMintStatus();
					return res.status(200).json({
						status: "transaction started, waiting for it to finish",
					});
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
