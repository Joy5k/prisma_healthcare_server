/*
  Warnings:

  - You are about to drop the column `addressdddd` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "addressdddd",
ADD COLUMN     "address" TEXT;
