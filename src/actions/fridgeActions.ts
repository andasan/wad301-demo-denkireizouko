"use server";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const addFridgeItemAction = async (
	fridgeItem: Prisma.FridgeItemCreateInput,
) => {
	return await prisma.fridgeItem.create({
		data: fridgeItem,
	});
};

export const getFridgeItemsAction = async () => {
	return await prisma.fridgeItem.findMany();
};

export const removeFridgeItemAction = async (fridgeItemId: string) => {
	return await prisma.fridgeItem.delete({
		where: {
			id: fridgeItemId,
		},
	});
};
