"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/app/(frontend)/components/ui/card";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";
import { useHamperCategories } from "@/app/(frontend)/admin/categories/hamper/hooks/useHamperCategories";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";

export default function FeaturedHampers() {
  const { data: categories, isLoading } = useHamperCategories({
    page: 1,
    limit: 1000,
  });

  if (isLoading) {
    return (
      <section className="py-24">
        <Loader />
      </section>
    );
  }

  if (!categories?.categories.length) return null;

  return (
    <section className="py-24">
      <div className="px-4 sm:px-7">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[4px] text-primary">
              Featured Hampers
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Beautiful Hampers For Every Celebration
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Discover premium hamper categories perfect for birthdays,
              weddings, corporate gifting and every special occasion.
            </p>
          </div>

          <Link href="/hampers">
            <UniButton
              type="button"
              label="View All Hampers"
              className="w-fit shrink-0"
            />
          </Link>
        </div>

        {/* Hampers */}
        <AppCarousel
          items={categories.categories}
          delay={3000}
          showArrows={false}
          itemClassName="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          renderItem={(category) => (
            <Card className="overflow-hidden rounded-2xl shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="group relative h-64 overflow-hidden">
                <Image
                  src={category.image || "/placeholder.jpg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <CardContent className="p-5">
                <h3 className="text-xl font-semibold">
                  {category.name}
                </h3>

                <Link
                  href={`/hampers/category/${category.id}`}
                  className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Explore →
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          )}
        />
      </div>
    </section>
  );
}