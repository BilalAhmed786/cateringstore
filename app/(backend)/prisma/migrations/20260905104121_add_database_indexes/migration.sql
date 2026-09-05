-- CreateIndex
CREATE INDEX "Event_categoryId_available_createdAt_idx" ON "Event"("categoryId", "available", "createdAt");

-- CreateIndex
CREATE INDEX "Event_finalPrice_idx" ON "Event"("finalPrice");

-- CreateIndex
CREATE INDEX "EventCategory_createdAt_idx" ON "EventCategory"("createdAt");

-- CreateIndex
CREATE INDEX "EventReview_eventId_createdAt_idx" ON "EventReview"("eventId", "createdAt");

-- CreateIndex
CREATE INDEX "Hamper_categoryId_available_createdAt_idx" ON "Hamper"("categoryId", "available", "createdAt");

-- CreateIndex
CREATE INDEX "Hamper_finalPrice_idx" ON "Hamper"("finalPrice");

-- CreateIndex
CREATE INDEX "HamperCategory_createdAt_idx" ON "HamperCategory"("createdAt");

-- CreateIndex
CREATE INDEX "MenuCategory_createdAt_idx" ON "MenuCategory"("createdAt");

-- CreateIndex
CREATE INDEX "MenuItem_categoryId_available_createdAt_idx" ON "MenuItem"("categoryId", "available", "createdAt");

-- CreateIndex
CREATE INDEX "MenuItem_price_idx" ON "MenuItem"("price");

-- CreateIndex
CREATE INDEX "MenuItemReview_menuItemId_createdAt_idx" ON "MenuItemReview"("menuItemId", "createdAt");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "Order_status_createdAt_idx" ON "Order"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Order_userId_createdAt_idx" ON "Order"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Package_available_createdAt_idx" ON "Package"("available", "createdAt");

-- CreateIndex
CREATE INDEX "Package_finalPrice_idx" ON "Package"("finalPrice");

-- CreateIndex
CREATE INDEX "PackageReview_packageId_createdAt_idx" ON "PackageReview"("packageId", "createdAt");

-- CreateIndex
CREATE INDEX "TastingInquiry_status_createdAt_idx" ON "TastingInquiry"("status", "createdAt");

-- CreateIndex
CREATE INDEX "TastingInquiry_userId_idx" ON "TastingInquiry"("userId");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");
