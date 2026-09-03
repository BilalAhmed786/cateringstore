"use client";

import Image from "next/image";
import Link from "next/link";

import { heroSlides } from "./heroData";
import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import {
  Card,
  CardContent,
} from "@/app/(frontend)/components/ui/card";

export default function HeroSection() {
  return (
    <section className="relative">
      <AppCarousel
        items={heroSlides}
        delay={5000}
        itemClassName="basis-full"
        previousClassName="left-4 sm:left-8"
        nextClassName="right-4 sm:right-8"
        renderItem={(slide) => (
          <div className="relative min-h-[650px] sm:h-[90vh]">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute inset-0 flex items-start px-4 sm:px-6">
              <div className="container pt-32 sm:pt-32">
                <Card className="max-w-3xl border-0 bg-transparent shadow-none">
                  <CardContent className="p-0">
                    <div className="text-white">
                      <span className="inline-block rounded-full bg-primary px-4 py-2 text-sm">
                        Premium Catering
                      </span>

                      <h1 className="mt-5 text-4xl font-bold leading-tight sm:mt-6 sm:text-5xl lg:text-7xl">
                        {slide.title}
                      </h1>

                      <p className="mt-5 max-w-2xl text-base leading-7 text-gray-200 sm:mt-6 sm:text-lg">
                        {slide.subtitle}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
                        <Link href="/menuitem">
                          <UniButton
                            type="button"
                            size="lg"
                            label="Explore Menu"
                          />
                        </Link>

                        <Link href="/events">
                          <UniButton
                            type="button"
                            size="lg"
                            variant="secondary"
                            label="Book Now"
                          />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      />
    </section>
  );
}