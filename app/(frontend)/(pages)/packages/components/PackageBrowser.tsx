"use client";

import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";
import { ProductDetailsSheet } from "@/app/(frontend)/components/reusables/storefront-grid/ProductDetailsSheet";
import { PackageCustomizeSheet } from "./PackageCustomizeSheet";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";

import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useInfiniteScroll } from "@/app/(frontend)/components/reusables/hooks/useInfiniteScroll";

import { useGetPackages } from "@/app/(frontend)/admin/packages/hooks/usegetpackages";
import { useGetPackageDetails } from "@/app/(frontend)/admin/packages/hooks/usegetsinglepackage";

import { useCartStore } from "@/app/(frontend)/store/useCartStore";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";

import { useCreatePackageReview } from "../hooks/useCreatePackageReview";
import { useGetPackageReviews } from "../hooks/useGetPackageReviews";

export function PackageBrowser() {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<GridItem[]>([]);

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  // ---------------------------------------
  // Review Filters
  // ---------------------------------------

  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const debouncedSearch = useDebounce(search, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  // ---------------------------------------
  // Packages
  // ---------------------------------------

  const { data, isLoading, isFetching } = useGetPackages({
    page,
    limit: 4,
    search: debouncedSearch,
    minPrice: debouncedPriceRange[0],
    maxPrice: debouncedPriceRange[1],
  });

  const { addItem } = useCartStore();

  // ---------------------------------------
  // Package Details
  // ---------------------------------------

  const { data: packageDetails, isLoading: isDetailsLoading } =
    useGetPackageDetails(selectedPackageId ?? "");

  // ---------------------------------------
  // Package Reviews
  // ---------------------------------------

  const { data: reviewData, isLoading: isReviewsLoading } =
    useGetPackageReviews({ selectedPackageId, rating, sort });

  // ---------------------------------------
  // Create Package Review
  // ---------------------------------------

  const { mutateAsync: createReview } = useCreatePackageReview();

  const handleReviewSubmit = async (formData: FieldValues) => {
    if (!selectedPackageId) return;

    await createReview({
      packageId: selectedPackageId,
      rating: Number(formData.rating),
      comment: formData.comment || null,
    });
  };

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const hasMore = items.length < (data?.total ?? 0);

  useEffect(() => {
    if (!data) return;

    function Dataretreive(data:GridItem[]) {
      if (page === 1) {
        setItems(data);
      } else {
        setItems((prev) => [...prev, ...data]);
      }
    }

    Dataretreive(data.items)
  }, [data, page]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    setPage(1);
  };

  // ---------------------------------------
  // Reset review filters when closing
  // ---------------------------------------

  const handleDetailsOpenChange = (value: boolean) => {
    if (!value) {
      setRating("all");
      setSort("desc");
    }

    setDetailsOpen(value);
  };

  useInfiniteScroll({
    loading: isFetching,
    hasMore,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  return (
    <div className="space-y-8 pt-28">
      {/* Filters */}

      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-xs">
          <PriceFilter
            value={priceRange}
            onChange={handlePriceChange}
            min={0}
            max={5000}
            step={100}
          />
        </div>

        <EntityFilters
          search={{
            value: search,
            onChange: handleSearchChange,
            placeholder: "Search packages...",
            classname: "sm:w-xl lg:w-5xl",
          }}
        />
      </div>

      {/* Grid */}

      <div className="relative mx-7">
        <StorefrontGrid
          items={items}
          type="package"
          isLoading={isLoading && page === 1}
          onItemClick={(pkg) => {
            setSelectedPackageId(pkg.id);
            setDetailsOpen(true);
          }}
          renderSubtitle={(pkg) => (
            <span>{pkg.items?.length ?? 0} Menu Items Included</span>
          )}
          renderActions={(pkg) => (
            <>
              <UniButton
                label="Add To Cart"
                onClick={() => addItem(pkg, "package")}
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

      {/* Package Details */}

      <ProductDetailsSheet
        data={packageDetails}
        isLoading={isDetailsLoading}
        open={detailsOpen}
        onOpenChange={handleDetailsOpenChange}
        reviewData={reviewData}
        isReviewsLoading={isReviewsLoading}
        rating={rating}
        sort={sort}
        onRatingChange={setRating}
        onSortChange={setSort}
        onReviewSubmit={handleReviewSubmit}
      />

      {/* Package Customization */}

      <PackageCustomizeSheet
        packageId={selectedPackageId}
        open={customizeOpen}
        onOpenChange={setCustomizeOpen}
      />
    </div>
  );
}
