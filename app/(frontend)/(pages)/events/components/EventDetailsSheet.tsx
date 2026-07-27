"use client";

import Image from "next/image";
import { Loader2, Star } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/(frontend)/components/ui/sheet";
import { EventDetailsSheetProps } from "../types/type";
import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";

export function EventDetailsSheet({
  open,
  onOpenChange,
  data,
  isLoading,
}: EventDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto sm:max-w-5xl"
      >
        {isLoading ? (
          <div className="flex h-full min-h-[500px] items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        ) : !data ? (
          <div className="flex h-full min-h-[500px] items-center justify-center text-muted-foreground">
            No details found.
          </div>
        ) : (
          <>
            <SheetHeader className="border-b">
              <SheetTitle>{data.name}</SheetTitle>
            </SheetHeader>

            <div className="space-y-10 p-6">
              {/* Cover */}

              <div className="relative h-[420px] overflow-hidden rounded-xl">
                <Image
                  src={data.image || "/placeholder.png"}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}

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

              {/* Description */}

              <section className="space-y-3">
                <h3 className="text-2xl font-semibold">Description</h3>

                <p className="leading-8 text-muted-foreground">
                  {data.description}
                </p>
              </section>

              {/* Included Menu Items */}

              {data.menuItems.length > 0 && (
                <section className="space-y-5">
                  <h3 className="text-2xl font-semibold">
                    Included Menu Items
                  </h3>

                  <div className="px-12">
                    <AppCarousel
                      items={data.menuItems}
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
                            <div className="relative h-[350px]">
                              <Image
                                src={menu.images[0].url}
                                alt={menu.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="space-y-4 p-6">
                              <div className="flex items-center justify-between">
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

              {/* Included Packages */}

              {data.packages.length > 0 && (
                <section className="space-y-5">
                  <h3 className="text-2xl font-semibold">Included Packages</h3>

                  <div className="px-12">
                    <AppCarousel
                      items={data.packages}
                      autoplay={false}
                      loop={false}
                      showArrows
                      className="w-full"
                      itemClassName="basis-full"
                      previousClassName="-left-10"
                      nextClassName="-right-10"
                      renderItem={(item) => {
                        const pkg = item.package;

                        return (
                          <div className="overflow-hidden rounded-xl border bg-background">
                            <div className="relative h-[350px]">
                              <Image
                                src={pkg.image ?? "/placeholder.png"}
                                alt={pkg.name}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="space-y-4 p-6">
                              <div className="flex items-center justify-between">
                                <h4 className="text-2xl font-semibold">
                                  {pkg.name}
                                </h4>

                                <span className="font-bold text-primary">
                                  Rs {pkg.finalPrice}
                                </span>
                              </div>

                              {pkg.description && (
                                <p className="leading-7 text-muted-foreground">
                                  {pkg.description}
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

              {/* Reviews */}

              <section className="space-y-5">
                <h3 className="text-2xl font-semibold">Customer Reviews</h3>

                {data.reviews.length > 0 ? (
                  data.reviews.map((review) => (
                    <div key={review.id} className="rounded-xl border p-5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{review.user.name}</h4>

                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{review.rating}</span>
                        </div>
                      </div>

                      {review.comment && (
                        <p className="mt-3 text-muted-foreground">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No reviews yet.</p>
                )}
              </section>

              {data.canReview && <section>{/* Review Form */}</section>}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
