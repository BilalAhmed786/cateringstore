"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/app/(frontend)/components/ui/card";

import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { PackageCustomizeSheet } from "../../packages/components/PackageCustomizeSheet";
import { useGetPackages } from "@/app/(frontend)/admin/packages/hooks/usegetpackages";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";
import { useGetStoreSettings } from "@/app/(frontend)/admin/settings/store/hooks/useGetStoreSettings";

export default function FeaturedPackages() {
  const { data: packages, isLoading } = useGetPackages({
    page: 1,
    limit: 1000,
  });

  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );

  const { data: storedata } = useGetStoreSettings();

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Loader />
        </div>
      </section>
    );
  }

  if (!packages?.items.length) return null;

  return (
    <section className="bg-muted/30 py-24">
      <div className="px-4 sm:px-7">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[4px] text-primary">
              Featured Packages
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Packages For Every Occasion
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Discover our carefully crafted catering packages for birthdays,
              weddings, corporate events, family gatherings, and every special
              celebration.
            </p>
          </div>

          <Link href="/packages">
            <UniButton
              type="button"
              label="View All Packages"
              className="w-fit shrink-0"
            />
          </Link>
        </div>

        {/* Packages */}
        <AppCarousel
          items={packages.items}
          delay={3500}
          showArrows={false}
          itemClassName="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          renderItem={(pkg) => (
            <Card className="group h-full overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={pkg.image || "/placeholder.jpg"}
                  alt={pkg.name ?? ""}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute right-4 top-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow">
                  {storedata?.store?.currency} {pkg.finalPrice}
                </div>
              </div>

              {/* Content */}
              <CardContent className="flex h-55 flex-col p-6">
                <h3 className="text-2xl font-bold">{pkg.name}</h3>

                <p className="mt-4 line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {pkg.description}
                </p>

                <UniButton
                  type="button"
                  className="mt-6 w-full"
                  label="Customize Package"
                  onClick={() => {
                    setSelectedPackageId(pkg.id);
                    setCustomizeOpen(true);
                  }}
                />
              </CardContent>
            </Card>
          )}
        />

        <PackageCustomizeSheet
          packageId={selectedPackageId}
          open={customizeOpen}
          onOpenChange={setCustomizeOpen}
        />
      </div>
    </section>
  );
}