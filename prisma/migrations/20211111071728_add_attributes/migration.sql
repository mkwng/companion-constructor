/*
  Warnings:

  - Added the required column `backgroundColor` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bottom` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brows` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eyes` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hair` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hairColor` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mouth` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nose` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pose` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skinColor` to the `Companion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Companion` ADD COLUMN `backgroundColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `blemish` VARCHAR(191) NULL,
    ADD COLUMN `bottom` VARCHAR(191) NOT NULL,
    ADD COLUMN `brows` VARCHAR(191) NOT NULL,
    ADD COLUMN `eyes` VARCHAR(191) NOT NULL,
    ADD COLUMN `eyewear` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `hair` VARCHAR(191) NOT NULL,
    ADD COLUMN `hairColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `headwear` VARCHAR(191) NULL,
    ADD COLUMN `mask` VARCHAR(191) NULL,
    ADD COLUMN `mouth` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `nose` VARCHAR(191) NOT NULL,
    ADD COLUMN `pose` VARCHAR(191) NOT NULL,
    ADD COLUMN `shoes` VARCHAR(191) NULL,
    ADD COLUMN `skinColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `top` VARCHAR(191) NULL;
