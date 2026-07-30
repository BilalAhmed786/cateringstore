import { useEffect, useMemo, useState } from "react";

import { Package } from "@/app/(frontend)/admin/packages/types/type";
import { PackageItem } from "../types/type";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";

export function usePackageCustomization(packageData?: Package) {
  const [selectedItems, setSelectedItems] = useState<PackageItem[]>([]);

  useEffect(() => {
    if (!packageData) return;
    function asyncDatahandle(data: PackageItem[]) {
      setSelectedItems(data);
    }
    asyncDatahandle(packageData.items);
  }, [packageData]);

  const increaseQuantity = (id: string) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.length <= 2 ? prev : prev.filter((item) => item.id !== id),
    );
  };

  const addMenuItem = (menuItem: GridItem) => {
    if (!packageData) return;

    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.menuItem.id === menuItem.id);

      if (existing) {
        return prev.map((item) =>
          item.menuItem.id === menuItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          packageId: packageData.id,
          menuItemId: menuItem.id,
          quantity: 1,
          menuItem,
        },
      ];
    });
  };

  const subtotal = useMemo(
    () =>
      selectedItems.reduce(
        (sum, item) => sum + (item.menuItem.price ?? 0) * item.quantity,
        0,
      ),
    [selectedItems],
  );

  const totalPrice = useMemo(() => {
    if (!packageData) return subtotal;

    return subtotal - subtotal * ((packageData.discountValue ?? 0) / 100);
  }, [subtotal, packageData]);

  return {
    selectedItems,
    subtotal,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    addMenuItem,
  };
}
