import { Companion as PrismaCompanion } from "@prisma/client";
import prisma from "../lib/prisma";
import { apiToKeys, flattenCompanion } from "./helpers";
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
	prevCompanion,
	tokenId,
}: {
	companion: Companion;
	prevCompanion?: Companion;
	tokenId: number;
}) => {
	const newCompanionFlat = flattenCompanion(companion);
	let prevCompanionFlat;
	if (prevCompanion) {
		// replace all attributes that prevCompanion has that companion does not with null values
		prevCompanionFlat = flattenCompanion(prevCompanion);
	} else {
		// if no new companion, get it from the database
		const prevCompanion: PrismaCompanion = await prisma.companion.findUnique({
			where: {
				tokenId,
			},
		});
		prevCompanionFlat = apiToKeys(prevCompanion);
	}
	Object.keys(prevCompanionFlat).forEach((key) => {
		if (!newCompanionFlat[key]) {
			newCompanionFlat[key] = null;
		}
	});
	return await prisma.companion.update({
		where: { tokenId },
		data: { ...newCompanionFlat },
	});
};
