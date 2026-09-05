"use client";

import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useParams } from "next/navigation";

import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";
import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";
import { ProductDetailsSheet } from "@/app/(frontend)/components/reusables/storefront-grid/ProductDetailsSheet";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useInfiniteScroll } from "@/app/(frontend)/components/reusables/hooks/useInfiniteScroll";
import { useGetHampers } from "@/app/(frontend)/admin/hampers/hooks/usegethampers";
import { useGetSingleHamperDetails } from "@/app/(frontend)/admin/hampers/hooks/usegetsinglehamper";
import { useCartStore } from "@/app/(frontend)/store/useCartStore";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";
import { useGetHamperReviews } from "../../hook/useGetHamperReviews";
import { useCreateHamperReview } from "../../hook/useCreateHamperReview";
import type { Metadata } from 'next';
// Your client UI component

type Props = {
  params: Promise<{ categoryid: string }>;
};

// 1. Dynamic Metadata Generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryid } = await params;

  // Format dynamic slug (e.g., "luxury-hampers" -> "Luxury Hampers")
  const categoryTitle = categoryid
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${categoryTitle} Hampers`, // Renders as: "Luxury Hampers | Catering Store"
    description: `Shop our exclusive range of ${categoryTitle} hampers, gift boxes, and seasonal packages.`,
    openGraph: {
      title: `${categoryTitle} Hampers | Catering Store`,
      description: `Explore and order premium ${categoryTitle} hampers online.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function HamperCategoryBrowser() {
  const params = useParams();

  const categoryId = params.categoryid as string;

  // ---------------------------------------
  // Hamper Filters
  // ---------------------------------------

  const [search, setSearch] = useState("");

  const [priceRange, setPriceRange] =
    useState<[number, number]>([0, 5000]);

  // ---------------------------------------
  // Review Filters
  // ---------------------------------------

  const [rating, setRating] = useState("all");

  const [sort, setSort] =
    useState<"asc" | "desc">("desc");

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const [page, setPage] = useState(1);

  const [items, setItems] =
    useState<GridItem[]>([]);

  // ---------------------------------------
  // Selected Hamper
  // ---------------------------------------

  const [selectedHamperId, setSelectedHamperId] =
    useState<string | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  // ---------------------------------------
  // Debounce
  // ---------------------------------------

  const debouncedSearch =
    useDebounce(search, 500);

  const debouncedPrice =
    useDebounce(priceRange, 500);

  // ---------------------------------------
  // Hampers
  // ---------------------------------------

  const {
    data,
    isLoading,
    isFetching,
  } = useGetHampers({
    page,
    limit: 4,
    category: categoryId,
    search: debouncedSearch,
    minPrice: debouncedPrice[0],
    maxPrice: debouncedPrice[1],
  });

  // ---------------------------------------
  // Hamper Details
  // ---------------------------------------

  const {
    data: hamperDetails,
    isLoading: isDetailsLoading,
  } = useGetSingleHamperDetails(
    selectedHamperId ?? "",
  );

  // ---------------------------------------
  // Hamper Reviews
  // ---------------------------------------

  const {
    data: reviewData,
    isLoading: isReviewsLoading,
  } = useGetHamperReviews(
    selectedHamperId ?? "",
    rating,
    sort,
  );

  // ---------------------------------------
  // Create Review
  // ---------------------------------------

  const { createReview } =
    useCreateHamperReview(
      selectedHamperId ?? "",
    );

  // ---------------------------------------
  // Cart
  // ---------------------------------------

  const { addItem } = useCartStore();

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const hasMore =
    items.length < (data?.total ?? 0);

  useEffect(() => {
    if (!data) return;

    function Dataretreive(data:GridItem[]){
    if (page === 1) {
      setItems(data);
    } else {
      setItems((prev) => [
        ...prev,
        ...data,
      ]);
    }

    }
    Dataretreive(data.items)

  }, [data, page]);

  // ---------------------------------------
  // Search
  // ---------------------------------------

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setPage(1);
  };

  // ---------------------------------------
  // Price
  // ---------------------------------------

  const handlePriceChange = (
    value: [number, number],
  ) => {
    setPriceRange(value);
    setPage(1);
  };

  // ---------------------------------------
  // Infinite Scroll
  // ---------------------------------------

  useInfiniteScroll({
    loading: isFetching,
    hasMore,
    onLoadMore: () =>
      setPage((p) => p + 1),
  });

  // ---------------------------------------
  // Review Submit
  // ---------------------------------------

  const handleReviewSubmit = async (
    formData: FieldValues,
  ) => {
    if (!selectedHamperId) return;

    await createReview({
      hamperId: selectedHamperId,
      rating: Number(formData.rating),
      comment: formData.comment || null,
    });
  };

  // ---------------------------------------
  // Details Sheet
  // ---------------------------------------

  const handleDetailsOpenChange = (
    open: boolean,
  ) => {
    if (!open) {
      setRating("all");
      setSort("desc");
    }

    setDetailsOpen(open);
  };

  return (
    <div className="space-y-8 pt-28">

      {/* -------------------------------- */}
      {/* Filters */}
      {/* -------------------------------- */}

      <div className="flex flex-col items-center gap-6">

        <div className="w-full max-w-2xl px-4">
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
            placeholder: "Search...",
            classname: "lg:w-5xl sm:w-xl",
          }}
        />

      </div>

      {/* -------------------------------- */}
      {/* Hampers */}
      {/* -------------------------------- */}

      <div className="relative mx-7">
        <StorefrontGrid
          items={items}
          type="hamper"
          isLoading={
            isLoading && page === 1
          }
          onItemClick={(item) => {
            setSelectedHamperId(item.id);
            setDetailsOpen(true);
          }}
          renderActions={(item) => (
            <UniButton
              label="Add To Cart"
              onClick={() =>
                addItem(item, "hamper")
              }
            />
          )}
        />
      </div>

      <ShoppingCart />

      {/* -------------------------------- */}
      {/* Hamper Details + Reviews */}
      {/* -------------------------------- */}

      <ProductDetailsSheet
        data={hamperDetails}
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
    </div>
  );
}