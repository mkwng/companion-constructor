/*
  Warnings:

  - A unique constraint covering the columns `[tokenId]` on the table `Companion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Companion_tokenId_key` ON `Companion`(`tokenId`);
