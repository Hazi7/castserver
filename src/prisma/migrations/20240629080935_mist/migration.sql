/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Post`;
