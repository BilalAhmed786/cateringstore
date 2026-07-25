"use client";

import { useEffect, useState } from "react";

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
import { AllMenuItemsTab } from "./AllMenuItemsTab";
import { SelectedPackageItems } from "./SelectedPackageItems";
import { useCartStore } from "@/app/(frontend)/store/useCartStore";
import { MenuItem,Package } from "@/app/(frontend)/admin/packages/types/type";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";
import { PackageCustomizeSheetProps } from "../types/type";




export function PackageCustomizeSheet({
  packageId,
  open,
  onOpenChange,
}: PackageCustomizeSheetProps) {
  const { data: packageData, isLoading } = useGetPackageDetails(packageId!);
  const [selectedItems, setSelectedItems] = useState<(MenuItem | GridItem)[]>([]);
  const { addCustomizedPackage } = useCartStore();

  useEffect(() => {
    if (!packageData) return;
    function gathermenuitem(data:Package) {
      setSelectedItems(data?.items?.map((item) => item.menuItem));
    }
    gathermenuitem(packageData);
  }, [packageData]);

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + (item.price ?? 0),
    0,
  );
  const totalPrice =
    subtotal - subtotal * ((packageData?.discountValue ?? 0) / 100); //every pacakge has some discounted value

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-4 h-screen overflow-auto sm:max-w-5xl"
      >
        <SheetHeader>
          <SheetTitle>Customize Package</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="py-20 text-center">Loading...</div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Package Info */}

            <div>
              <h2 className="text-2xl font-bold">{packageData?.name}</h2>

              <p className="text-muted-foreground">
                {packageData?.description}
              </p>
            </div>

            {/* Tabs */}

            <Tabs defaultValue="selected">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="selected">Package Items</TabsTrigger>

                <TabsTrigger value="all">All Menu Items</TabsTrigger>
              </TabsList>

              {/* Selected */}

              <TabsContent value="selected">
                <SelectedPackageItems
                  items={selectedItems}
                  onRemove={(id) =>
                    selectedItems.length > 2 &&
                    setSelectedItems((prev) => prev.filter((i) => i.id !== id))
                  }
                />
              </TabsContent>

              {/* All */}

              <TabsContent value="all">
                <AllMenuItemsTab
                  selectedItems={selectedItems}
                  onAddItem={(item) =>
                    setSelectedItems((prev) => [...prev, item])
                  }
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

                <span className="font-bold">Rs {totalPrice}</span>
              </div>
            </div>

            <UniButton
              className="w-full"
              label="Add Customized Package To Cart"
              onClick={() => {
                if (!packageData) return;
                    addCustomizedPackage(packageData,selectedItems,totalPrice);
                    onOpenChange(false);
              }}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
