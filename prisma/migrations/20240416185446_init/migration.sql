/*
  Warnings:

  - You are about to drop the column `quantity` on the `ShoppingList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShoppingList" DROP COLUMN "quantity",
ADD COLUMN     "amount" INTEGER,
ADD COLUMN     "unit" TEXT;
