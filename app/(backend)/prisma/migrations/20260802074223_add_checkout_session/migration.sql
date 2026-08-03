-- CreateEnum
CREATE TYPE "CheckoutStatus" AS ENUM ('PENDING', 'COMPLETED', 'EXPIRED');

-- CreateTable
CREATE TABLE "CheckoutSession" (
    "id" TEXT NOT NULL,
    "paymentIntentId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "notes" TEXT,
    "cart" JSONB NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" "CheckoutStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutSession_paymentIntentId_key" ON "CheckoutSession"("paymentIntentId");
