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
import { ProductDetailsSheetProps } from "./types";

export function ProductDetailsSheet({
  open,
  onOpenChange,
  data,
  isLoading,
  onReviewSubmit,
}: ProductDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto sm:max-w-5xl"
      >
        <SheetHeader className="border-b">
          <SheetTitle>{data?.name}</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="flex h-full min-h-125 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        ) : !data ? (
          <div className="flex h-full min-h-125 items-center justify-center text-muted-foreground">
            No details found.
          </div>
        ) : (
          <>
            {/* Header */}

            <div className="space-y-10 p-6">
              {/* -------------------------------- */}
              {/* Cover Image */}
              {/* -------------------------------- */}

              <div className="relative h-105 overflow-hidden rounded-xl">
                <Image
                  src={data.image || "/placeholder.png"}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* -------------------------------- */}
              {/* Basic Information */}
              {/* -------------------------------- */}

              <section className="space-y-4">
                <h2 className="text-4xl font-bold">{data.name}</h2>

                <div className="text-3xl font-bold text-primary">
                  Rs {data.finalPrice}
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                  <span className="font-semibold">
                    {data.averageRating.toFixed(1)}
                  </span>

                  <span className="text-muted-foreground">
                    ({data.totalReviews} Reviews)
                  </span>
                </div>
              </section>

              {/* -------------------------------- */}
              {/* Description */}
              {/* -------------------------------- */}

              <section className="space-y-3">
                <h3 className="text-2xl font-semibold">Description</h3>

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
                            <div className="relative h-87.5 w-full overflow-hidden">
                              <Image
                                src={
                                  menu.images?.[0]?.url ?? "/placeholder.png"
                                }
                                alt={menu.title ?? "Menu item"}
                                fill
                                sizes="(max-width: 640px) 100vw, 800px"
                                className="object-cover"
                              />
                            </div>

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

              <ReviewSection
                reviews={data.reviews}
                canReview={data.canReview}
                onSubmit={onReviewSubmit}
              />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
