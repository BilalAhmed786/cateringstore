/*
  Warnings:

  - Added the required column `publicId` to the `MenuItemImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItemImage" ADD COLUMN     "publicId" TEXT NOT NULL;
