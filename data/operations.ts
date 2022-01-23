import { Companion as PrismaCompanion } from "@prisma/client";
import prisma from "../lib/prisma";
import { apiToKeys, flattenCompanion, keysToCompanion } from "./helpers";
import { Companion } from "./types";

export const createCompanion = async ({ companion, tokenId }: { companion: Companion; tokenId?: number }) => {
	return await prisma.companion.create({
		data: {
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
		const prevCompanion: PrismaCompanion = (
			await prisma.companion.findMany({
				where: {
					tokenId,
				},
			})
		)[0];
		prevCompanionFlat = prevCompanion ? flattenCompanion(keysToCompanion(apiToKeys(prevCompanion))) : {};
	}
	Object.keys(prevCompanionFlat).forEach((key) => {
		if (!newCompanionFlat[key]) {
			newCompanionFlat[key] = null;
		}
	});
	const target = (
		await prisma.companion.findMany({
			where: { tokenId },
		})
	)[0];
	return await prisma.companion.upsert({
		where: { id: target.id },
		update: { ...newCompanionFlat },
		create: {
			tokenId,
			...newCompanionFlat,
		},
	});
};
