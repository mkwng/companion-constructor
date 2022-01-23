-- DropIndex
DROP INDEX `Companion_tokenId_key` ON `Companion`;

-- AlterTable
ALTER TABLE `Companion` MODIFY `tokenId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Transactions` ADD COLUMN `companionId` INTEGER NULL,
    ADD COLUMN `complete` BOOLEAN NOT NULL DEFAULT true;
