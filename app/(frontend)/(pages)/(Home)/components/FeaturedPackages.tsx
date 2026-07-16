"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/app/(frontend)/components/ui/button";
import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";
import { useFeaturedPackages } from "../hooks/useFeaturedPackages";

export default function FeaturedPackages() {
  const { data: packages, isLoading } = useFeaturedPackages();

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4">
          <p>Loading packages...</p>
        </div>
      </section>
    );
  }

  if (!packages?.length) return null;

  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[4px] text-primary">
              Featured Packages
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Packages For Every Occasion
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Discover our carefully crafted catering packages for birthdays,
              weddings, corporate events, family gatherings, and every special
              celebration.
            </p>
          </div>

          <Button asChild>
            <Link href="/packages">
              View All Packages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <AppCarousel
          items={packages}
          delay={3500}
          itemClassName="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          renderItem={(pkg) => (
            <div className="group h-full overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={pkg.image || "/placeholder.jpg"}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute right-4 top-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow">
                  Rs. {pkg.finalPrice.toLocaleString()}
                </div>
              </div>

              {/* Content */}
              <div className="flex h-[220px] flex-col p-6">
                <h3 className="text-2xl font-bold">{pkg.name}</h3>

                <p className="mt-4 line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {pkg.description}
                </p>

                <Button className="mt-6 w-full" asChild>
                  <Link href={`/packages/${pkg.id}`}>
                    View Package
                  </Link>
                </Button>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}