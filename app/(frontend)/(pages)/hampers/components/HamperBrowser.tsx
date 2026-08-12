"use client";

import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";
import { ProductDetailsSheet } from "@/app/(frontend)/components/reusables/storefront-grid/ProductDetailsSheet";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";

import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useInfiniteScroll } from "@/app/(frontend)/components/reusables/hooks/useInfiniteScroll";

import { useCartStore } from "@/app/(frontend)/store/useCartStore";

import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";
import { useGetHampers } from "@/app/(frontend)/admin/hampers/hooks/usegethampers";
import { useGetSingleHamperDetails } from "@/app/(frontend)/admin/hampers/hooks/usegetsinglehamper";
import { useHamperCategories } from "@/app/(frontend)/admin/categories/hamper/hooks/useHamperCategories";
import { useCreateHamperReview } from "../hook/useCreateHamperReview";



export function HamperBrowser() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    5000,
  ]);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<GridItem[]>([]);

  const [selectedHamperId, setSelectedHamperId] = useState<string | null>(
    null
  );

  const [detailsOpen, setDetailsOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  // ---------------------------------------
  // Hampers
  // ---------------------------------------

  const { data, isLoading, isFetching } = useGetHampers({
    page,
    limit: 4,
    category,
    search: debouncedSearch,
    minPrice: debouncedPriceRange[0],
    maxPrice: debouncedPriceRange[1],
  });

  // ---------------------------------------
  // Categories
  // ---------------------------------------

  const { data: cat } = useHamperCategories({
    page: 1,
    limit: 1000,
  });

  const categories = cat?.categories ?? [];

  // ---------------------------------------
  // Selected Hamper Details
  // ---------------------------------------

  const {
    data: hamperDetails,
    isLoading: isDetailsLoading,
  } = useGetSingleHamperDetails(selectedHamperId ?? "");

  // ---------------------------------------
  // Review
  // ---------------------------------------

  const { createReview } = useCreateHamperReview(selectedHamperId??"");

  // ---------------------------------------
  // Cart
  // ---------------------------------------

  const { addItem } = useCartStore();

  // ---------------------------------------
  // Infinite scroll
  // ---------------------------------------

  const hasMore = items.length < (data?.total ?? 0);

  useEffect(() => {
    if (!data) return;

      function retreiveData (data:GridItem[]){
         if (page === 1) {
      setItems(data);
    } else {
      setItems((prev) => [...prev, ...data]);
    }

      }
      retreiveData(data.items)
   
  }, [data, page]);

  // ---------------------------------------
  // Filters
  // ---------------------------------------

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    setPage(1);
  };

  // ---------------------------------------
  // Infinite Scroll
  // ---------------------------------------

  useInfiniteScroll({
    loading: isFetching,
    hasMore,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  // ---------------------------------------
  // Review Submit
  // ---------------------------------------

  const handleReviewSubmit = async (formData: FieldValues) => {
    if (!selectedHamperId) return;

    await createReview({
      hamperId: selectedHamperId,
      rating: Number(formData.rating),
      comment: formData.comment || null,
    });
  };

  return (
    <div className="space-y-8 pt-28">
      {/* Filters */}
      <div className="flex flex-col items-center space-y-8">
        <div className="flex w-full flex-col justify-center gap-10 px-5 lg:flex-row">
          <EntityFilters
            filters={[
              {
                key: "category",
                label: "Category",
                value: category,
                onChange: handleCategoryChange,
                options: [
                  {
                    label: "All",
                    value: "all",
                  },
                  ...categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  })),
                ],
              },
            ]}
          />

          <div className="w-full max-w-xs">
            <PriceFilter
              value={priceRange}
              onChange={handlePriceChange}
              min={0}
              max={5000}
              step={100}
            />
          </div>
        </div>

        <EntityFilters
          search={{
            value: search,
            onChange: handleSearchChange,
            placeholder: "Search hampers...",
            classname: "sm:w-xl lg:w-5xl",
          }}
        />
      </div>

      {/* Hampers */}
      <div className="relative mx-7">
        <StorefrontGrid
          items={items}
          type="hamper"
          isLoading={isLoading && page === 1}
          onItemClick={(hamper) => {
            setSelectedHamperId(hamper.id);
            setDetailsOpen(true);
          }}
          renderActions={(hamper) => (
            <UniButton
              label="Add To Cart"
              onClick={() => addItem(hamper, "hamper")}
            />
          )}
        />
      </div>

      <ShoppingCart />

      {/* Hamper Details + Reviews */}
      <ProductDetailsSheet
        data={hamperDetails}
        isLoading={isDetailsLoading}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onReviewSubmit={handleReviewSubmit}
      />
    </div>
  );
}