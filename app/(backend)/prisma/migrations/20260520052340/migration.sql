/*
  Warnings:

  - You are about to drop the column `title` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Hamper` table. All the data in the column will be lost.
  - Added the required column `name` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hamper" DROP CONSTRAINT "Hamper_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hamper" DROP COLUMN "eventId";

-- CreateTable
CREATE TABLE "EventMenuItem" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,

    CONSTRAINT "EventMenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPackage" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "EventPackage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventMenuItem_eventId_menuItemId_key" ON "EventMenuItem"("eventId", "menuItemId");

-- CreateIndex
CREATE UNIQUE INDEX "EventPackage_eventId_packageId_key" ON "EventPackage"("eventId", "packageId");

-- AddForeignKey
ALTER TABLE "EventMenuItem" ADD CONSTRAINT "EventMenuItem_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMenuItem" ADD CONSTRAINT "EventMenuItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPackage" ADD CONSTRAINT "EventPackage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPackage" ADD CONSTRAINT "EventPackage_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
