"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/app/(frontend)/components/ui/button";
import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";
import { useHamperCategories } from "../hooks/useHamperCategories";


export default function FeaturedHampers() {
  const { data: categories, isLoading } =useHamperCategories();

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (!categories?.length) return null;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[4px] text-primary">
              Featured Hampers
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Beautiful Hampers For Every Celebration
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Discover premium hamper categories perfect for birthdays,
              weddings, corporate gifting and every special occasion.
            </p>
          </div>

          <Button asChild>
            <Link href="/hampers">
              View All Hampers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>

        <AppCarousel
          items={categories}
          delay={3000}
          showArrows={false}
          itemClassName="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          renderItem={(category) => (
            <div className="overflow-hidden rounded-2xl bg-white shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="group relative h-64 overflow-hidden">
                <Image
                  src={category.image || "/placeholder.jpg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">

                <h3 className="text-xl font-semibold">
                  {category.name}
                </h3>

                <Link
                  href={`/hampers?category=${category.id}`}
                  className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Explore →
                </Link>

              </div>

            </div>
          )}
        />

      </div>
    </section>
  );
}