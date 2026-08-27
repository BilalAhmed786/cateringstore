/*
  Warnings:

  - You are about to drop the column `city` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `StoreSettings` table. All the data in the column will be lost.
  - Added the required column `storeName` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "StoreSettings" DROP COLUMN "city",
DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "name",
DROP COLUMN "website",
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'PKR',
ADD COLUMN     "maintenanceMessage" TEXT,
ADD COLUMN     "status" "StoreStatus" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "storeName" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'Asia/Karachi';
