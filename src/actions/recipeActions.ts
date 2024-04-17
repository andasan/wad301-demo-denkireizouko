"use server";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const addRecipeItemAction = async (
	recipeItem: Prisma.RecipeCreateInput,
) => {
	return await prisma.recipe.create({
		data: recipeItem,
	});
};

export const getRecipeItemsAction = async () => {
	return await prisma.recipe.findMany();
};

export const removeRecipeItemAction = async (recipeItemId: string) => {
	await prisma.recipe.delete({
		where: {
			id: recipeItemId,
		},
	});
};
