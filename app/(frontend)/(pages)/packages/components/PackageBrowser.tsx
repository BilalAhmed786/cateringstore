"use client";

import { useState } from "react";

import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";
import { ProductDetailsSheet } from "@/app/(frontend)/components/reusables/storefront-grid/ProductDetailsSheet";
import { PackageCustomizeSheet } from "./PackageCustomizeSheet";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

import { useGetPackages } from "@/app/(frontend)/admin/packages/hooks/usegetpackages";
import { useGetPackageDetails } from "@/app/(frontend)/admin/packages/hooks/usegetsinglepackage";

import { useCartStore } from "@/app/(frontend)/store/useCartStore";

export function PackageBrowser() {
  const { data, isLoading } = useGetPackages();

  const packages = data?.items ?? [];

  const [selectedPackageId, setSelectedPackageId] =
    useState<string | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [customizeOpen, setCustomizeOpen] = useState(false);

  const { addItem } = useCartStore();

  const {
    data: packageDetails,
    isLoading: isDetailsLoading,
  } = useGetPackageDetails(selectedPackageId ?? "");

  return (
    <div className="space-y-8 pt-28">
      <div className="relative mx-7">
        <StorefrontGrid
          items={packages}
          isLoading={isLoading}
          onItemClick={(pkg) => {
            setSelectedPackageId(pkg.id);
            setDetailsOpen(true);
          }}
          renderSubtitle={(pkg) => (
            <span>
              {pkg.items?.length ?? 0} Menu Items Included
            </span>
          )}
          renderActions={(pkg) => (
            <>
              <UniButton
                label="Add To Cart"
                onClick={() => addItem(pkg)}
              />

              <UniButton
                label="Customize"
                variant="outline"
                onClick={() => {
                  setSelectedPackageId(pkg.id);
                  setCustomizeOpen(true);
                }}
              />
            </>
          )}
        />
      </div>

      <ShoppingCart />

      <ProductDetailsSheet
        data={packageDetails}
        isLoading={isDetailsLoading}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <PackageCustomizeSheet
        packageId={selectedPackageId}
        open={customizeOpen}
        onOpenChange={setCustomizeOpen}
      />
    </div>
  );
}