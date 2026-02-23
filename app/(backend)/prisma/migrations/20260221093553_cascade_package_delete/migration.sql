-- DropForeignKey
ALTER TABLE "PackageItem" DROP CONSTRAINT "PackageItem_packageId_fkey";

-- AddForeignKey
ALTER TABLE "PackageItem" ADD CONSTRAINT "PackageItem_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;
