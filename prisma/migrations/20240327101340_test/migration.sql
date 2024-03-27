/*
  Warnings:

  - You are about to drop the column `address` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "address",
ADD COLUMN     "addressdddd" TEXT;
