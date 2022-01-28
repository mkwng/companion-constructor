import { Companion as PrismaCompanion } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ownerAddress } from "../../../components/contract";
import { colors, rgbToHex } from "../../../data/colors";
import { apiToKeys, getDifferences, keysToCompanion, messageToSign, zeroPad } from "../../../data/helpers";
import { updateCompanion } from "../../../data/operations";
import { randomCompanion } from "../../../data/random";
import { Companion } from "../../../data/types";
import prisma from "../../../lib/prisma";
import { companionContract, web3 } from "../../../lib/web3";

const isRevealed = true;

interface UpdateCompanion {
	uneditedCompanion?: Companion;
	companion?: Companion;
	hash?: string;
	type?: "fillEmpty" | "customize";
	signature: string;
	address: string;
	coupon?: string;
}
const confirmHash = async (hash: string, requiredFee: string) => {
	const receipt = await web3.eth.getTransactionReceipt(hash);
	// Check the amount of $CSHIP sent matches the required fee...
	// const decoded = web3.eth.abi.decodeLog(
	// 	[
	// 		{
	// 			internalType: "address",
	// 			name: "recipient",
	// 			type: "address",
	// 		},
	// 		{
	// 			internalType: "uint256",
	// 			name: "amount",
	// 			type: "uint256",
	// 		},
	// 	],
	// 	receipt.logs[0].data,
	// 	receipt.logs[0].topics.slice(1)
	// );
	// console.log(decoded);
	// const value = decoded.amount;
	if (receipt) {
		return true;
	} else {
		return false;
	}
};

export default async function apiCompanions(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "PUT":
			const tokenId = req.query.id;
			if (typeof tokenId !== "string") {
				return res.status(400).json({ error: "tokenId should be a string" });
			}

			// Verify that the address owns the token
			if (req.body.address !== ownerAddress) {
				companionContract.methods
					.ownerOf(tokenId)
					.call()
					.then((owner) => {
						if (owner !== req.body.address) {
							return res.status(400).json({ error: "address is not the owner of the token" });
						}
					})
					.catch((err) => {
						return res.status(400).json({ error: err.message });
					});
			}

			if (req.body.type === "fillEmpty") {
				try {
					let prismaResponse: PrismaCompanion = (
						await prisma.companion.findMany({
							where: { tokenId: parseInt(tokenId) },
						})
					)[0];
					if (prismaResponse) {
						return res.status(400).json({ error: "Companion already exists" });
					}
					const { signature, address } = req.body as UpdateCompanion;
					const recover = web3.eth.accounts.recover(messageToSign + "\n\nGenerate random companion", signature);
					if (recover !== address) {
						throw new Error("Signature is not valid");
					}
					const result = await updateCompanion({
						tokenId: parseInt(tokenId),
						companion: randomCompanion(),
					});
					return res.status(200).json({
						message: "Successfully updated",
						companion: result,
					});
				} catch (error) {
					return res.status(400).json({ error: error.message });
				}
			} else if (req.body.type === "customize") {
				try {
					const { uneditedCompanion, companion, hash, signature, address, coupon } = req.body as UpdateCompanion;

					if (coupon) {
						const couponResult = await prisma.coupon.findUnique({
							where: { code: coupon },
						});
						if (!couponResult) {
							throw new Error("Coupon is invalid");
						}
						if (couponResult.used) {
							throw new Error("Coupon has already been used");
						}
						await prisma.coupon.update({
							where: { code: coupon },
							data: { used: true },
						});
					}
					const differences = getDifferences(uneditedCompanion, companion);
					const balance = coupon ? 0 : differences.reduce((acc, cur) => acc + cur.cost, 0);

					if (balance > 0) {
						let hashUsed;
						try {
							hashUsed = await prisma.transactions.findUnique({ where: { hash } });
						} catch (e) {
							console.error(e);
						} finally {
							if (hashUsed) {
								throw new Error("Hash already used");
							}

							const recover = web3.eth.accounts.recover(messageToSign + "\n\nAmount: " + balance + " $CSHIP", signature);
							if (recover !== address) {
								throw new Error("Signature is not valid");
							}

							const cost = balance + zeroPad;
							const confirmed = await confirmHash(hash, cost);
							if (confirmed) {
								await prisma.transactions.create({
									data: {
										hash,
										date: new Date(),
										txnType: "customization",
										txnValue: cost,
									},
								});
								await updateCompanion({
									tokenId: parseInt(tokenId),
									companion,
								});
								return res.status(200).json({
									message: "Successfully updated",
								});
							} else {
								throw new Error("Could not confirm that this transaction was completed");
							}
						}
					} else {
						// No cost, just update
						const recover = web3.eth.accounts.recover(messageToSign + "\n\nAmount: " + balance + " $CSHIP", signature);
						if (recover !== address) {
							throw new Error("Signature is not valid");
						}
						await updateCompanion({
							tokenId: parseInt(tokenId),
							companion,
						});
						return res.status(200).json({
							message: "Successfully updated",
						});
					}
				} catch (e) {
					res.status(400).json({
						error: e.message,
					});
					return;
				}
			}
			break;
		case "GET":
			try {
				if (typeof req.query.id !== "string") {
					throw new Error("Invalid query id");
				}
				if (req.query.id === "" || req.query.id === null || req.query.id === undefined) {
					res.status(405).end(`Not Allowed`);
				}
				let prismaResponse: PrismaCompanion = (
					await prisma.companion.findMany({
						where: { tokenId: parseInt(req.query.id) },
					})
				)[0];
				if (!prismaResponse) {
					return res.status(200).json({
						token_id: req.query.id,
						name: `Companion #${req.query.id}`,
						image: `https://companioninabox.art/box.png`,
						external_url: `https://companioninabox.art/`,
						background_color: rgbToHex(colors.background.red),
						description:
							"Your companion's still being packed and shipped. Please give up to 24 hours. Contact @companioninabox if there are any issues!.",
					});
				}
				switch (req.query.format) {
					case "prisma":
						return res.status(200).json(prismaResponse);
					case "keys":
						return res.status(200).json(apiToKeys(prismaResponse));
					case "companion":
						return res.status(200).json(keysToCompanion(apiToKeys(prismaResponse)));
					case "metadata":
					default:
						if (!isRevealed) {
							return res.status(200).json({
								token_id: req.query.id,
								name: `Companion #${req.query.id}`,
								image: `https://companioninabox.art/box.png`,
								external_url: `https://companioninabox.art/`,
								background_color: rgbToHex(colors.background.red),
								description: "Boxed in a small, wooden box, this companion is a bit of a mystery.",
							});
						}
						const {
							id,
							name,
							tokenId,
							iteration,
							createdAt,
							updatedAt,
							accessoryColors,
							hairColors,
							headwearColors,
							eyewearColors,
							maskColors,
							topColors,
							bottomColors,
							shoesColors,
							...rest
						} = prismaResponse;
						const attributes: {
							display_type?: string;
							trait_type: string;
							value: string | number;
						}[] = [
							{
								display_type: "date",
								trait_type: "birthday",
								value: createdAt.getTime(),
							},
							{
								display_type: "date",
								trait_type: "updated",
								value: updatedAt.getTime(),
							},
						];
						for (const key in rest) {
							if (rest[key]) {
								attributes.push({
									trait_type: key,
									value: rest[key],
								});
							}
						}
						const companion = keysToCompanion(apiToKeys(prismaResponse));
						return res.status(200).json({
							token_id: tokenId,
							name: `Companion #${tokenId}`,
							image: `https://${process.env.NEXT_PUBLIC_URL}/api/companion.png?id=${tokenId}&iteration=${iteration || 0}`,
							external_url: `https://companioninabox.art/companion/${tokenId}`,
							background_color: rgbToHex(companion.properties.background),
							description: "Boxed in a small, wooden box, this companion is a bit of a mystery.",
							attributes,
						});
				}
			} catch (e) {
				return res.status(500).json({ message: e.message });
			}
		case "POST":
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
