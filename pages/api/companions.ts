import prisma from "../../lib/prisma";

export default async function apiCompanions(req, res) {
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				const companions = await prisma.companion.findMany({
					orderBy: { tokenId: "desc" },
					take: parseInt(req.query.take) || 1000,
					skip: parseInt(req.query.skip) || 0,
				});
				res.status(200).json(companions);
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
