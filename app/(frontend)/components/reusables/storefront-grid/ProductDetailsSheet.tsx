"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/(frontend)/components/ui/sheet";
import Image from "next/image";
import { Loader2, Star } from "lucide-react";
import { useGetMenuItemById } from "@/app/(frontend)/admin/menu-items/hooks/usegetmenuitembyid";

interface ProductDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuItemId: string | null;
}

export function ProductDetailsSheet({
  open,
  onOpenChange,
  menuItemId,
}: ProductDetailsSheetProps) {
  const { data, isLoading } = useGetMenuItemById(menuItemId!);

  if (!menuItemId) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>Product Details</SheetTitle>
          </SheetHeader>

          <div className="mt-10 text-center text-muted-foreground">
            Select a product
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-5 overflow-y-auto sm:max-w-2xl"
      >
        <SheetHeader>
          <SheetTitle>Product Details</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Product Image */}
            <div className="relative h-72 w-full overflow-hidden rounded-lg">
              <Image
                src={data?.images?.[0]?.url || "/placeholder.png"}
                alt={data?.title || "Product"}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <h2 className="text-3xl font-bold">{data?.title}</h2>

              <p className="text-muted-foreground">
                {data?.description || "No description available."}
              </p>

              <div className="text-2xl font-semibold text-primary">
                Rs {data?.price}
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{data?.averageRating?.toFixed(1) ?? "0.0"}</span>
                <span>({data?.totalReviews ?? 0} Reviews)</span>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>

              {data?.reviews?.length ? (
                data.reviews.map((review) => (
                  <div key={review.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{review.user.name}</h4>

                      <span>{"⭐".repeat(review.rating)}</span>
                    </div>

                    {review.comment && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              )}
            </div>

            {/* Review Section */}
            {data?.canReview ? (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Write a Review</h3>

                {/* <ReviewForm menuItemId={menuItemId} /> */}
              </div>
            ) : (
              <div className="rounded-lg border bg-muted p-4 text-sm">
                Only customers who purchased this menu item can leave a review.
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
