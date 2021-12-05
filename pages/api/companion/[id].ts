import { Companion as PrismaCompanion } from ".prisma/client";
import { colors, rgbToHex } from "../../../data/colors";
import { apiToKeys, companionToUrl, keysToCompanion } from "../../../data/helpers";
import prisma from "../../../lib/prisma";

export default async function apiCompanions(req, res) {
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				const companionKeys: PrismaCompanion = await prisma.companion.findUnique({
					where: { id: parseInt(req.query.id) },
				});
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
				} = companionKeys;
				const attributes = [];
				for (const key in rest) {
					if (rest[key]) {
						attributes.push({
							trait_type: key,
							value: rest[key],
						});
					}
				}
				const companion = keysToCompanion(apiToKeys(companionKeys));
				const response = {
					token_id: companionKeys.id,
					name: companion.name || `Companion #${companionKeys.id}`,
					image: `${process.env.RAILWAY_STATIC_URL}/api/companion.png?id=${companionKeys.id}`,
					external_url: `${process.env.RAILWAY_STATIC_URL}/companion/${companionKeys.id}`,
					background_color: rgbToHex(companion.properties.background),
					description: "Boxed in a small, wooden box, this companion is a bit of a mystery.",
					attributes,
				};
				res.status(200).json(companion);
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
