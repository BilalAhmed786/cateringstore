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
import { useGetMenuItemById } from "@/app/(frontend)/admin/menu-items/hooks/usegetmenuitembyid";

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="h-screen w-full overflow-y-auto sm:max-w-4xl"
      >
        <SheetHeader className="px-6 pt-6">
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
          <div className="space-y-8 px-6 pb-8 pt-6">
            {/* Images */}

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

            {/* Basic Info */}

            <div className="space-y-3">
              <h2 className="text-3xl font-bold">{data.title}</h2>

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

            {/* Description */}

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Description</h3>

              <p className="leading-7 text-muted-foreground">
                {data.description}
              </p>
            </div>

            {/* Reviews */}

            <div className="space-y-5">
              <h3 className="text-xl font-semibold">
                Customer Reviews
              </h3>

              {data.reviews.length > 0 ? (
                data.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border p-5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">
                        {review.user.name}
                      </h4>

                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                        <span>{review.rating}</span>
                      </div>
                    </div>

                    {review.comment && (
                      <p className="mt-3 leading-7 text-muted-foreground">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No reviews yet.
                </p>
              )}
            </div>

            {/* Review Permission */}

            {data.canReview ? (
              <div className="rounded-xl border border-primary bg-primary/5 p-5">
                <h3 className="font-semibold">
                  You can review this item
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Since you have purchased this item, you can leave a review.
                </p>

                {/* Review Form goes here */}
              </div>
            ) : (
              <div className="rounded-xl border bg-muted p-5 text-sm text-muted-foreground">
                Only customers who purchased this item can leave a review.
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}