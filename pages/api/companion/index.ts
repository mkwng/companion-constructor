import { flattenCompanion } from "../../../data/helpers";
import { Companion } from "../../../data/types";
import prisma from "../../../lib/prisma";

export default async function apiCompanions(req, res) {
	const { method } = req;
	switch (method) {
		case "GET":
			const contractMetadata = {
				name: "Companion-in-a-Box",
				description: "A companion in a box, for your convenience.",
				// "image": "https://companioninabox.art/image.png",
				external_link: "https://companioninabox.art",
				seller_fee_basis_points: 1000,
				fee_recipient: "0xe99F64eA8EF1b0072aCcB7eA00a6C7478C62f92c",
			};
			res.status(200).json(contractMetadata);
			break;
		case "POST":
			const companion = await prisma.companion.create({
				data: flattenCompanion(req.body as Companion),
			});

			res.status(200).json(companion);
			break;
	}
}
