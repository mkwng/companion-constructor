import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function coupon(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "GET":
			// Check if coupon exists and has not been used
			const coupon = await prisma.coupon.findUnique({
				where: {
					code: req.query.code,
				},
			});
			if (!coupon) {
				return res.status(400).json({ error: "Coupon does not exist" });
			}
			if (coupon.used) {
				return res.status(400).json({ error: "Coupon has already been used" });
			}
			return res.status(200).json({
				message: "Coupon found",
				coupon: coupon,
			});
	}
}
