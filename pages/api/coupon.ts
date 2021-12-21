import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function coupon(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "GET":
			if (req.query.code) {
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
			} else {
				// Get all coupons
				const coupons = await prisma.coupon.findMany();
				return res.status(200).json({
					message: "Coupons found",
					coupons,
				});
			}
		case "PUT":
			if (typeof req.body.code !== "string") {
				return res.status(400).json({ error: "code should be a string" });
			}
			const coupon = await prisma.coupon.findUnique({ where: { code: req.body.code } });
			await prisma.coupon.update({
				where: {
					code: req.body.code,
				},
				data: {
					used: coupon.used ? false : true,
				},
			});
			return res.status(200).json({
				message: "Coupon updated",
			});
			break;
		case "POST":
			if (Array.isArray(req.body.code)) {
				const allcreates = req.body.code.map(async (code) => {
					if (typeof code !== "string") {
						return res.status(400).json({ error: "code should be a string" });
					}
					await prisma.coupon.create({
						data: {
							code,
							used: false,
						},
					});
				});
				await Promise.all(allcreates);
				return res.status(200).json({
					message: "Coupons created",
				});
			} else if (typeof req.body.code === "string") {
				await prisma.coupon.create({
					data: {
						code: req.body.code,
						used: false,
					},
				});
				return res.status(200).json({
					message: "Coupon created",
				});
			}
			return res.status(400).json({ error: "code should be a string" });
			break;
		case "DELETE":
			if (typeof req.body.code !== "string") {
				return res.status(400).json({ error: "code should be a string" });
			}
			await prisma.coupon.delete({
				where: {
					code: req.body.code,
				},
			});
			return res.status(200).json({
				message: "Coupon deleted",
			});
			break;
	}
}
