import { NextApiRequest, NextApiResponse } from "next";
import { companionAddress, priceCustomEth, priceEth } from "../../components/contract";
import { createCompanion } from "../../data/operations";
import { randomCompanion } from "../../data/random";
import prisma from "../../lib/prisma";
import { web3 } from "../../lib/web3";

const recheckMint = async (hash, requiredFee, companionId) => {
	const transaction = await web3.eth.getTransaction(hash);
	if (transaction?.transactionIndex && transaction?.blockNumber) {
		if (parseInt(transaction.value) < parseInt(requiredFee)) {
			return {
				error: "Not enough ETH sent",
			};
		}
		const receipt = await web3.eth.getTransactionReceipt(hash);
		if (receipt.to.toLowerCase() !== companionAddress.toLowerCase()) {
			return {
				error: "Transaction not sent to Companion contract",
			};
		}
		const companionIds = [];
		for (let i = 0; i < receipt.logs.length; i++) {
			const tokenId = web3.utils.hexToNumber(receipt.logs[i].topics[3]);
			if (typeof tokenId === 'number' && !isNaN(tokenId)) {
				let query;
				if (companionId) {
					query = prisma.companion.update({
						where: { id: companionId },
						data: { tokenId },
					});
				} else {
					query = createCompanion({
						tokenId,
						companion: { ...randomCompanion(), name: "Randomly Generated Companion" },
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
			await prisma.transactions.update({
				where: { hash },
				data: {
					complete: true,
				},
			});
			return {
				companionIds,
			};
		} else {
			return {
				error: "Something went wrong",
			};
		}
	} else {
		return {
			error: "Transaction not mined",
		};
	}
};

export default async function sign(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "POST":
			const incompletes = await prisma.transactions.findMany({
				where: { complete: false },
			});
			const promises = incompletes.map(async (transaction) => {
				const { hash, companionId } = transaction;
				return await recheckMint(
					hash,
					transaction.txnType == "mintCustom" || transaction.txnType == "mintRandom"
						? web3.utils.toWei(priceCustomEth + "", "ether")
						: web3.utils.toWei(priceEth * 1 + "", "ether"),
					companionId
				);
			});
			const results = await Promise.all(promises);
			res.status(200).json({
				results,
			});
			break;
		case "GET":
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
