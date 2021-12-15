/*
  Warnings:

  - You are about to drop the column `txnQty` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `txnValue` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transactions` DROP COLUMN `txnQty`,
    ADD COLUMN `txnValue` VARCHAR(191) NOT NULL;
