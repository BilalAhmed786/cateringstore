"use client";

import { Dispatch, SetStateAction } from "react";

import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";

interface IncludedItemsTabProps {
  items: GridItem[];
  setItems: Dispatch<SetStateAction<GridItem[]>>;
}

export function IncludedItemsTab({
  items,
  setItems,
}: IncludedItemsTabProps) {
  return (
    <div className="space-y-6">
      <StorefrontGrid
        items={items}
        type="menuitem"
        isLoading={false}
        renderActions={(item) => (
          <UniButton
            label="Remove"
            variant="destructive"
            onClick={() =>
              setItems((prev) =>
                prev.filter((i) => i.id !== item.id)
              )
            }
          />
        )}
      />
    </div>
  );
}