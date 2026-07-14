-- AlterTable
ALTER TABLE "EventMenuItem" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "EventPackage" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
