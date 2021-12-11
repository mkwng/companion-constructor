import prisma from "../lib/prisma";
import { flattenCompanion } from "./helpers";
import { Companion } from "./types";

export const createCompanion = async ({
	companion,
	id,
}: {
	companion: Companion;
	id?: number;
}) => {
	return await prisma.companion.create({
		data: id
			? { ...flattenCompanion(companion) }
			: {
					id,
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
