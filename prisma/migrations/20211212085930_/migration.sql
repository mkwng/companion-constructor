/*
  Warnings:

  - A unique constraint covering the columns `[tokenId]` on the table `Companion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tokenId` to the `Companion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Companion` ADD COLUMN `tokenId` INTEGER NOT NULL;
UPDATE `Companion` SET tokenId = id;

-- CreateTable
CREATE TABLE `Transactions` (
    `hash` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `txnType` VARCHAR(191) NOT NULL,
    `txnQty` INTEGER NOT NULL,

    UNIQUE INDEX `Transactions_hash_key`(`hash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Companion_tokenId_key` ON `Companion`(`tokenId`);
