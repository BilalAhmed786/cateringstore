"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/(frontend)/components/ui/sheet";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(frontend)/components/ui/tabs";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

import { useGetPackageDetails } from "@/app/(frontend)/admin/packages/hooks/usegetsinglepackage";

import { SelectedPackageItems } from "./SelectedPackageItems";
import { AllMenuItemsTab } from "./AllMenuItemsTab";

import { useCartStore } from "@/app/(frontend)/store/useCartStore";
import { PackageCustomizeSheetProps } from "../types/type";
import { usePackageCustomization } from "../hooks/usePackageCustomization";

export function PackageCustomizeSheet({
  packageId,
  open,
  onOpenChange,
}: PackageCustomizeSheetProps) {
  const { data: packageData, isLoading } =
    useGetPackageDetails(packageId!);

  const { addCustomizedPackage } = useCartStore();

  const {
    selectedItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    addMenuItem,
  } = usePackageCustomization(packageData);

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="h-screen w-full overflow-auto p-4 sm:max-w-5xl"
      >
        <SheetHeader>
          <SheetTitle>
            Customize Package
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="py-20 text-center">
            Loading...
          </div>
        ) : (
          <div className="mt-6 space-y-6">

            {/* Package Info */}

            <div>
              <h2 className="text-2xl font-bold">
                {packageData?.name}
              </h2>

              <p className="text-muted-foreground">
                {packageData?.description}
              </p>
            </div>

            {/* Tabs */}

            <Tabs defaultValue="selected">

              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="selected">
                  Package Items
                </TabsTrigger>

                <TabsTrigger value="all">
                  All Menu Items
                </TabsTrigger>
              </TabsList>

              <TabsContent value="selected">
                <SelectedPackageItems
                  items={selectedItems}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeItem}
                />
              </TabsContent>

              <TabsContent value="all">
                <AllMenuItemsTab
                  selectedItems={selectedItems}
                  onAddItem={addMenuItem}
                />
              </TabsContent>

            </Tabs>

            {/* Summary */}

            <div className="rounded-xl border p-5">

              <div className="flex justify-between">
                <span>Total Menu Items</span>

                <span>{selectedItems.length}</span>
              </div>

              <div className="mt-3 flex justify-between">
                <span>Total Price</span>

                <span className="font-bold">
                  Rs {totalPrice.toFixed(2)}
                </span>
              </div>

            </div>

            <UniButton
              className="w-full"
              label="Add Customized Package To Cart"
              onClick={() => {
                if (!packageData) return;

                addCustomizedPackage(
                  packageData,
                  selectedItems,
                  totalPrice
                );

                onOpenChange(false);
              }}
            />

          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}