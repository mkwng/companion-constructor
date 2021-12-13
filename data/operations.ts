import prisma from "../lib/prisma";
import { flattenCompanion } from "./helpers";
import { Companion } from "./types";

export const createCompanion = async ({
	companion,
	tokenId,
}: {
	companion: Companion;
	tokenId: number;
}) => {
	return await prisma.companion.create({
		data: tokenId
			? { ...flattenCompanion(companion) }
			: {
					tokenId,
					...flattenCompanion(companion),
			  },
	});
};

export const updateCompanion = async ({
	companion,
	id,
}: {
	companion: Companion;
	id: number;
}) => {
	return await prisma.companion.update({
		where: { id },
		// data: flattenCompanion(companion),
	});
};
