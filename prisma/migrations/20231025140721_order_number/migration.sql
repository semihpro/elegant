-- AlterTable
ALTER TABLE `brands` ADD COLUMN `order_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `colors` ADD COLUMN `order_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `connectuses` ADD COLUMN `order_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `galleries` ADD COLUMN `order_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `order_number` VARCHAR(191) NULL;
