import Web3 from "web3";

export default async function sign(req, res) {
	console.log(req);
	const { method } = req;
	switch (method) {
		case "GET":
			res.status(200).json({
				message: "Get request received",
				address: req.address,
				signature: req.signature,
			});
			break;
		case "POST":
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
