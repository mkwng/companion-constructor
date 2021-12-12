import { Companion as PrismaCompanion } from ".prisma/client";
import { rgbToHex } from "../../../data/colors";
import { apiToKeys, keysToCompanion } from "../../../data/helpers";
import prisma from "../../../lib/prisma";

export default async function apiCompanions(req, res) {
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				let prismaResponse: PrismaCompanion = await prisma.companion.findUnique({
					where: { tokenId: parseInt(req.query.id) },
				});
				if (!prismaResponse) {
					return res.status(404).json({
						error: "Companion not found",
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
						const {
							id,
							createdAt,
							updatedAt,
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
							token_id: id,
							name: companion.name || `Companion #${id}`,
							image: `https://${
								process.env.RAILWAY_STATIC_URL || process.env.NEXT_PUBLIC_URL
							}/api/companion.png?id=${id}`,
							external_url: `https://${process.env.NEXT_PUBLIC_URL}/companion/${id}`,
							background_color: rgbToHex(companion.properties.background),
							description:
								"Boxed in a small, wooden box, this companion is a bit of a mystery.",
							attributes,
						});
				}
			} catch (e) {
				res.status(500).json({ message: e.message });
			}
			break;
		case "POST":
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
