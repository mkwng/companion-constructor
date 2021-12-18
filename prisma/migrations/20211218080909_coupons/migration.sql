-- CreateTable
CREATE TABLE `Coupon` (
    `code` VARCHAR(191) NOT NULL,
    `used` BOOLEAN NOT NULL,

    UNIQUE INDEX `Coupon_code_key`(`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
