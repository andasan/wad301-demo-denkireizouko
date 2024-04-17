"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const addShoppingListAction = async (
  shoppingList: Prisma.ShoppingListCreateInput[],
) => {
  await prisma.shoppingList.createMany({
    data: shoppingList,
    skipDuplicates: true,
  });

  const ingredientIds = shoppingList.map((item) => item.ingredientId);

  return await prisma.shoppingList.findMany({
    where: {
      ingredientId: {
        in: ingredientIds,
      },
    },
  });
};

export const getShoppingListAction = async () => {
  return await prisma.shoppingList.findMany();
};

export const removeShoppingItemAction = async (ingredientId: string) => {
  return await prisma.shoppingList.delete({
    where: {
      id: ingredientId,
    },
  });
};
