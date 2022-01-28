import { NextApiRequest, NextApiResponse } from "next";
import { incrementCustomCounter } from "../../data/operations";
import prisma from "../../lib/prisma";

export default async function customCount(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	let customs = await prisma.counters.findUnique({
		where: { name: "custom" },
	});

	if (!customs) {
		return await prisma.counters.create({
			data: { name: "custom", value: 321 },
		});
	}

	let total = await prisma.counters.findUnique({
		where: { name: "total" },
	});
	if (!total) {
		return await prisma.counters.create({
			data: { name: "total", value: 510 },
		});
	}

	if (!customs) {
		customs = await incrementCustomCounter();
	}

	return res.status(200).json({
		custom: customs.value,
		total: total.value,
	});
}
