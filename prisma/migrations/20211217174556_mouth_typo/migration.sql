/*
  Warnings:

  - You are about to drop the column `moutColors` on the `Companion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Companion` DROP COLUMN `moutColors`,
    ADD COLUMN `mouthColors` VARCHAR(191) NULL;
