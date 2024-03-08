/*
  Warnings:

  - You are about to drop the column `isVerified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserProfile` MODIFY `first_name` VARCHAR(50) NULL,
    MODIFY `last_name` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `isVerified`,
    ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false;
