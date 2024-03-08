/*
  Warnings:

  - You are about to alter the column `birthday` on the `userprofile` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `UserProfile` MODIFY `birthday` DATETIME NULL;
