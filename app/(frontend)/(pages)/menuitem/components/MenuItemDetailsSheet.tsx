"use client";

import Image from "next/image";
import { Loader2, Star } from "lucide-react";
import { FieldValues } from "react-hook-form";

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

interface MenuItemDetailsSheetProps {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MenuItemDetailsSheet({
  id,
  open,
  onOpenChange,
}: MenuItemDetailsSheetProps) {
  const { data, isLoading } = useGetMenuItemById(id ?? "");

  const { mutateAsync: createReview } =
    useCreateMenuItemReview();

  const handleReviewSubmit = async (
    formData: FieldValues,
  ) => {
    if (!id) return;

    await createReview({
      menuItemId: id,
      rating: Number(formData.rating),
      comment: formData.comment || null,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-5xl">
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
          <div className="space-y-10 px-6">
            {/* -------------------------------- */}
            {/* Images */}
            {/* -------------------------------- */}

            <AppCarousel
              items={data.images}
              autoplay={false}
              loop={false}
              showArrows
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
              <h2 className="text-3xl font-bold">
                {data.title}
              </h2>

              <p className="text-3xl font-bold text-primary">
                Rs {data.price}
              </p>

              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                <span className="font-medium">
                  {data.averageRating.toFixed(1)}
                </span>

                <span className="text-muted-foreground">
                  ({data.totalReviews} Reviews)
                </span>
              </div>
            </div>

            {/* -------------------------------- */}
            {/* Description */}
            {/* -------------------------------- */}

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">
                Description
              </h3>

              <p className="leading-7 text-muted-foreground">
                {data.description}
              </p>
            </div>

            {/* -------------------------------- */}
            {/* Reviews */}
            {/* -------------------------------- */}

            <ReviewSection
              reviews={data.reviews}
              canReview={data.canReview}
              onSubmit={handleReviewSubmit}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}