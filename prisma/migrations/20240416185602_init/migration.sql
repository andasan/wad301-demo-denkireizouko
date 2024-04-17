/*
  Warnings:

  - Changed the type of `ingredientId` on the `ShoppingList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ShoppingList" DROP COLUMN "ingredientId",
ADD COLUMN     "ingredientId" INTEGER NOT NULL;
