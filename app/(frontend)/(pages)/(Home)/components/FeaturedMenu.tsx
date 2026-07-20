"use client";

import Image from "next/image";
import Link from "next/link";

import { useMenuCategories } from "../hooks/useMenuCategories";
import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";
import { Button } from "@/app/(frontend)/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FeaturedMenuCategories() {
  const { data: categories, isLoading } = useMenuCategories();

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (!categories?.length) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-primary">
            Menu Categories
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Explore Our Menu Categories
          </h2>
          <div className="flex justify-between items-center">
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Browse our delicious catering categories crafted for weddings,
              birthdays, corporate events, and family gatherings.
            </p>
            <Button asChild>
              <Link href="/packages">
                View All Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <AppCarousel
          items={categories}
          delay={3000}
          itemClassName="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          showArrows={false}
          renderItem={(category) => (
            <div className="overflow-hidden rounded-2xl bg-white shadow transition-shadow duration-300 hover:shadow-xl">
              <div className="group relative h-64 overflow-hidden">
                <Image
                  src={category.image || "/placeholder.jpg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold">{category.name}</h3>

                <Link
                  href={`/menuitem/category/${category.id}`}
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
