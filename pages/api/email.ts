import { NextApiRequest, NextApiResponse } from "next";
import sanitize from "sanitize-html";

import prisma from "../../lib/prisma";

export default async function apiCompanions(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "POST":
			const { email } = req.body;

			try {
				await prisma.emails.create({
					data: { email: sanitize(email) },
				});
				return res.status(200).json({
					message: "Successfully updated",
				});
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}
	}
}
