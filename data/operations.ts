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
	const prevCompanionData: PrismaCompanion = (
		await prisma.companion.findMany({
			where: { tokenId },
		})
	)[0];

	const newCompanionFlat = flattenCompanion(companion);
	const prevCompanionFlat = prevCompanionData ? flattenCompanion(keysToCompanion(apiToKeys(prevCompanionData))) : {};

	// replace all attributes that prevCompanion has that companion does not with null values
	Object.keys(prevCompanionFlat).forEach((key) => {
		if (!newCompanionFlat[key]) {
			newCompanionFlat[key] = null;
		}
	});

	if (prevCompanionData) {
		return await prisma.companion.update({
			where: { id: prevCompanionData?.id },
			data: { ...newCompanionFlat, iteration: (prevCompanionData.iteration || 0) + 1 },
		});
	} else {
		return await prisma.companion.create({
			data: {
				tokenId,
				iteration: 0,
				...newCompanionFlat,
			},
		});
	}
};

export const incrementCustomCounter = async () => {
	const customs = await prisma.counters.findUnique({
		where: { name: "custom" },
	});
	console.log(customs);
	if (!customs) {
		return await prisma.counters.create({
			data: { name: "custom", value: 321 },
		});
	} else {
		return await prisma.counters.update({
			where: { name: "custom" },
			data: { value: (customs?.value || 321) + 1 },
		});
	}
};
