-- Add FAILED enum value
ALTER TYPE "CheckoutStatus" ADD VALUE IF NOT EXISTS 'FAILED';

-- Add notes column
ALTER TABLE "Order"
ADD COLUMN IF NOT EXISTS "notes" TEXT;

-- Add paymentIntentId
ALTER TABLE "Order"
ADD COLUMN IF NOT EXISTS "paymentIntentId" TEXT;

-- Make paymentIntentId unique
CREATE UNIQUE INDEX IF NOT EXISTS "Order_paymentIntentId_key"
ON "Order"("paymentIntentId");

-- Add price to OrderMenuItem
ALTER TABLE "OrderMenuItem"
ADD COLUMN IF NOT EXISTS "price" DOUBLE PRECISION NOT NULL DEFAULT 0;