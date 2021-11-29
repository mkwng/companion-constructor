import prisma from "../../../lib/prisma";

export default async function apiCompanions(req, res) {
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				const companion = await prisma.companion.findUnique({
					where: { id: parseInt(req.query.id) },
				});
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
