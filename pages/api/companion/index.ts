import { flattenCompanion } from "../../../data/helpers";
import { Companion } from "../../../data/types";
import prisma from "../../../lib/prisma";

export default async function apiCompanions(req, res) {
	const { method } = req;
	switch (method) {
		case "GET":
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
		case "POST":
			const companion = await prisma.companion.create({
				data: flattenCompanion(req.body as Companion),
			});

			res.status(200).json(companion);
			break;
	}
}
