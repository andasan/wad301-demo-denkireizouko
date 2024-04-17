/*
  Warnings:

  - Added the required column `ingredientId` to the `ShoppingList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShoppingList" ADD COLUMN     "ingredientId" TEXT NOT NULL;
