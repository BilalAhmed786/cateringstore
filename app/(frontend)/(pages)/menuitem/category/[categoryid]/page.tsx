"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";
import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";
import { ProductDetailsSheet } from "@/app/(frontend)/components/reusables/storefront-grid/ProductDetailsSheet";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useGetMenuItems } from "@/app/(frontend)/admin/menu-items/hooks/useGetMenuItems";

export default function CategoryMenuItemsPage() {
  const params = useParams();
  const categoryId = params.categoryid as string;

  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  const { data, isLoading } = useGetMenuItems({
    category: categoryId,
    search: debouncedSearch,
    minPrice: debouncedPriceRange[0],
    maxPrice: debouncedPriceRange[1],
  });

  const menuItems = data?.items ?? [];

  return (
    <div className="space-y-8 pt-28">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Category Menu Items</h1>
        <p className="mt-2 text-muted-foreground">
          Browse all menu items in this category.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full max-w-xs">
          <PriceFilter
            value={priceRange}
            onChange={setPriceRange}
            min={0}
            max={5000}
            step={100}
          />
        </div>

        <EntityFilters
          search={{
            value: search,
            onChange: setSearch,
            placeholder: "Search menu items...",
            classname: "lg:w-5xl sm:w-xl",
          }}
        />
      </div>

      {/* Grid */}
      <div className="relative mx-7">
        <StorefrontGrid
          items={menuItems}
          isLoading={isLoading}
          onItemClick={(item) => {
            setSelectedItemId(item.id);
            setOpen(true);
          }}
        />
      </div>

      {/* Shopping Cart */}
      <ShoppingCart />

      {/* Product Details */}
      <ProductDetailsSheet
        open={open}
        onOpenChange={setOpen}
        menuItemId={selectedItemId}
      />
    </div>
  );
}