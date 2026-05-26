/*
  Warnings:

  - You are about to drop the `MenuItemImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenuItemImage" DROP CONSTRAINT "MenuItemImage_menuItemId_fkey";

-- AlterTable
ALTER TABLE "EventCategory" ADD COLUMN     "publicId" TEXT;

-- DropTable
DROP TABLE "MenuItemImage";

-- CreateTable
CREATE TABLE "ItemImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemImage" ADD CONSTRAINT "ItemImage_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
