/*
  Warnings:

  - Added the required column `userId` to the `TastingInquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TastingInquiry" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TastingInquiry" ADD CONSTRAINT "TastingInquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
