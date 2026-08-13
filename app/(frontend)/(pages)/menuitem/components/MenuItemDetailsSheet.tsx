"use client";

import Image from "next/image";
import { Loader2, Star } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/(frontend)/components/ui/sheet";
import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";
import { useGetMenuItemById } from "@/app/(frontend)/admin/menu-items/hooks/usegetmenuitembyid";
import { useCreateMenuItemReview } from "../hook/useCreateMenuItemReview";
import { ReviewSection } from "@/app/(frontend)/components/reusables/reviewsection/reviewsection";
import { BaseSelect } from "@/app/(frontend)/components/reusables/filters/filterselect";
import { useGetMenuItemReviews } from "../hook/useGetMenuItemReviews";

interface MenuItemDetailsSheetProps {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function MenuItemDetailsSheet({
  id,
  open,
  onOpenChange,
}: MenuItemDetailsSheetProps) {
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("desc");
  // Product details API
  const { data, isLoading } = useGetMenuItemById(id ?? "");
  // Reviews API
  const { data: reviewData, isLoading: reviewsLoading } = useGetMenuItemReviews(
    id ?? "",
    rating,
    sort,
  );

  const { mutateAsync: createReview } = useCreateMenuItemReview();

  const handleReviewSubmit = async (formData: FieldValues) => {
    if (!id) return;

    await createReview({
      menuItemId: id,
      rating: Number(formData.rating),
      comment: formData.comment || null,
    });
  };

  // Reset filters when opening another menu item
  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setRating("all");
      setSort("desc");
    }

    onOpenChange(value);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-5 sm:max-w-5xl"
      >
        <SheetHeader>
          <SheetTitle>Menu Item Details</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex h-[70vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : !data ? (
          <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
            Menu item not found.
          </div>
        ) : (
          <div className="w-full space-y-10 px-6">
            {/* -------------------------------- */}
            {/* Images */}
            {/* -------------------------------- */}

            <AppCarousel
              items={data.images}
              autoplay={false}
              loop={false}
              showArrows={false}
              itemClassName="basis-full"
              className="w-full"
              renderItem={(image) => (
                <div className="relative h-87.5 overflow-hidden rounded-xl">
                  <Image
                    src={image.url}
                    alt={data.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            />

            {/* -------------------------------- */}
            {/* Basic Info */}
            {/* -------------------------------- */}

            <div className="space-y-3">
              <h2 className="text-3xl font-bold">{data.title}</h2>

              <p className="text-3xl font-bold text-primary">Rs {data.price}</p>

              {/* Rating summary now comes from reviews API */}
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                <span className="font-medium">
                  {reviewData?.averageRating?.toFixed(1) ?? "0.0"}
                </span>

                <span className="text-muted-foreground">
                  ({reviewData?.totalReviews ?? 0} Reviews)
                </span>
              </div>
            </div>

            {/* -------------------------------- */}
            {/* Description */}
            {/* -------------------------------- */}

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Description</h3>

              <p className="leading-7 text-muted-foreground">
                {data.description}
              </p>
            </div>

            {/* -------------------------------- */}
            {/* Reviews */}
            {/* -------------------------------- */}
              <section className="space-y-5">
                  {reviewData && reviewData.totalReviews > 0 && (
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  

                  <div className="flex gap-3">
                    <BaseSelect
                      label="Rating"
                      value={rating}
                      onChange={setRating}
                      options={ratingOptions}
                      placeholder="Rating"
                    />

                    <BaseSelect
                      label="Sort"
                      value={sort}
                      onChange={setSort}
                      options={sortOptions}
                      placeholder="Sort"
                    />
                  </div>
                </div>
                )}
                {reviewsLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <ReviewSection
                    reviews={reviewData?.reviews ?? []}
                    canReview={reviewData?.canReview ?? false}
                    onSubmit={handleReviewSubmit}
                  />
                )}
              </section>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
