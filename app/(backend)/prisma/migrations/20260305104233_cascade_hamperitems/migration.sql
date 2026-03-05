-- DropForeignKey
ALTER TABLE "HamperItem" DROP CONSTRAINT "HamperItem_hamperId_fkey";

-- AddForeignKey
ALTER TABLE "HamperItem" ADD CONSTRAINT "HamperItem_hamperId_fkey" FOREIGN KEY ("hamperId") REFERENCES "Hamper"("id") ON DELETE CASCADE ON UPDATE CASCADE;
