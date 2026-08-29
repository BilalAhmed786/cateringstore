"use client";

import Image from "next/image";
import { Loader2, Star } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/(frontend)/components/ui/sheet";

import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";
import { ReviewSection } from "@/app/(frontend)/components/reusables/reviewsection/reviewsection";
import { BaseSelect } from "@/app/(frontend)/components/reusables/filters/filterselect";
import { useGetStoreSettings } from "@/app/(frontend)/admin/settings/store/hooks/useGetStoreSettings";
import { ProductDetailsSheetProps } from "./types";

const ratingOptions = [
  { label: "All Ratings", value: "all" },
  { label: "5 Stars", value: "5" },
  { label: "4 Stars", value: "4" },
  { label: "3 Stars", value: "3" },
  { label: "2 Stars", value: "2" },
  { label: "1 Star", value: "1" },
];

const sortOptions = [
  { label: "Highest Rating", value: "desc" },
  { label: "Lowest Rating", value: "asc" },
];

export function ProductDetailsSheet({
  open,
  onOpenChange,
  data,
  isLoading,
  reviewData,
  isReviewsLoading,
  rating,
  sort,
  onRatingChange,
  onSortChange,
  onReviewSubmit,
}: ProductDetailsSheetProps) {

  const {data:storedata} = useGetStoreSettings()
   return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto sm:max-w-5xl"
      >
        <SheetHeader className="border-b">
          <SheetTitle>
            {data?.name ?? "Package Details"}
          </SheetTitle>
        </SheetHeader>

        {/* -------------------------------- */}
        {/* Loading */}
        {/* -------------------------------- */}

        {isLoading ? (
          <div className="flex h-full min-h-125 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        ) : !data ? (
          /* -------------------------------- */
          /* No Data */
          /* -------------------------------- */

          <div className="flex h-full min-h-125 items-center justify-center text-muted-foreground">
            No details found.
          </div>
        ) : (
          <div className="space-y-10 p-6">

            {/* -------------------------------- */}
            {/* Cover Image */}
            {/* -------------------------------- */}

            <div className="relative h-105 overflow-hidden rounded-xl">
              <Image
                src={data.image || "/placeholder.png"}
                alt={data.name}
                fill
                sizes="(max-width: 640px) 100vw, 1024px"
                className="object-cover"
              />
            </div>

            {/* -------------------------------- */}
            {/* Basic Information */}
            {/* -------------------------------- */}

            <section className="space-y-4">
              <h2 className="text-4xl font-bold">
                {data.name}
              </h2>

              <div className="text-3xl font-bold text-primary">
                {storedata?.store.currency} {data.finalPrice}
              </div>

              {/* Rating Summary */}

              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                <span className="font-semibold">
                  {reviewData?.averageRating?.toFixed(1) ?? "0.0"}
                </span>

                <span className="text-muted-foreground">
                  ({reviewData?.totalReviews ?? 0} Reviews)
                </span>
              </div>
            </section>

            {/* -------------------------------- */}
            {/* Description */}
            {/* -------------------------------- */}

            <section className="space-y-3">
              <h3 className="text-2xl font-semibold">
                Description
              </h3>

              <p className="leading-8 text-muted-foreground">
                {data.description}
              </p>
            </section>

            {/* -------------------------------- */}
            {/* Included Menu Items */}
            {/* -------------------------------- */}

            {data.items.length > 0 && (
              <section className="space-y-5">
                <h3 className="text-2xl font-semibold">
                  Included Menu Items
                </h3>

                <div className="px-12">
                  <AppCarousel
                    items={data.items}
                    autoplay={false}
                    loop={false}
                    showArrows
                    className="w-full"
                    itemClassName="basis-full"
                    previousClassName="-left-10"
                    nextClassName="-right-10"
                    renderItem={(item) => {
                      const menu = item.menuItem;

                      return (
                        <div className="overflow-hidden rounded-xl border bg-background">
                          {/* Menu Image */}

                          <div className="relative h-87.5 w-full overflow-hidden">
                            <Image
                              src={
                                menu.images?.[0]?.url ??
                                "/placeholder.png"
                              }
                              alt={
                                menu.title ?? "Menu item"
                              }
                              fill
                              sizes="(max-width: 640px) 100vw, 800px"
                              className="object-cover"
                            />
                          </div>

                          {/* Menu Info */}

                          <div className="space-y-4 p-6">
                            <div className="flex items-center justify-between gap-4">
                              <h4 className="text-2xl font-semibold">
                                {menu.title}
                              </h4>

                              <span className="font-bold text-primary">
                                Rs {menu.price}
                              </span>
                            </div>

                            {menu.description && (
                              <p className="leading-7 text-muted-foreground">
                                {menu.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
              </section>
            )}

            {/* -------------------------------- */}
            {/* Reviews */}
            {/* -------------------------------- */}

            <section className="space-y-5">

              {/* Review Header + Filters */}

              {reviewData &&
                reviewData.averageRating > 0 && (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <h3 className="text-xl font-semibold">
                      Customer Reviews
                    </h3>

                    <div className="flex gap-3">
                      <BaseSelect
                        label="Rating"
                        value={rating}
                        onChange={onRatingChange}
                        options={ratingOptions}
                        placeholder="Rating"
                      />

                      <BaseSelect
                        label="Sort"
                        value={sort}
                        onChange={(value) =>
                          onSortChange(
                            value as "asc" | "desc",
                          )
                        }
                        options={sortOptions}
                        placeholder="Sort"
                      />
                    </div>
                  </div>
                )}

              {/* Reviews Loading */}

              {isReviewsLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <ReviewSection
                  reviews={reviewData?.reviews ?? []}
                  canReview={
                    reviewData?.canReview ?? false
                  }
                  onSubmit={onReviewSubmit}
                />
              )}
            </section>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}