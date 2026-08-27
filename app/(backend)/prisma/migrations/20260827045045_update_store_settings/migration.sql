/*
  Warnings:

  - You are about to drop the column `status` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `storeName` on the `StoreSettings` table. All the data in the column will be lost.
  - Added the required column `name` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoreSettings" DROP COLUMN "status",
DROP COLUMN "storeName",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "storeStatus" "StoreStatus" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "website" TEXT;
