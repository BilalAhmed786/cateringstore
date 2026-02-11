/*
  Warnings:

  - You are about to drop the column `price` on the `Hamper` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Package` table. All the data in the column will be lost.
  - Added the required column `finalPrice` to the `Hamper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Hamper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalPrice` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- AlterTable
ALTER TABLE "Hamper" DROP COLUMN "price",
ADD COLUMN     "discountType" "DiscountType",
ADD COLUMN     "discountValue" DOUBLE PRECISION,
ADD COLUMN     "finalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "originalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Package" DROP COLUMN "price",
ADD COLUMN     "discountType" "DiscountType",
ADD COLUMN     "discountValue" DOUBLE PRECISION,
ADD COLUMN     "finalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "originalPrice" DOUBLE PRECISION NOT NULL;
