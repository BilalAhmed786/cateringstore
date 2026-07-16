"use client";

import Image from "next/image";
import Link from "next/link";

import { heroSlides } from "./heroData";
import { Button } from "../../../components/ui/button";
import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";


export default function HeroSection() {
  return (
    <section className="relative">
      <AppCarousel
        items={heroSlides}
        delay={5000}
        itemClassName="basis-full"
        previousClassName="left-8"
        nextClassName="right-8"
        renderItem={(slide) => (
          <div className="relative h-[90vh]">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute inset-0 flex items-center p-4">
              <div className="container">
                <div className="max-w-3xl text-white">
                  <span className="rounded-full bg-primary px-4 py-2 text-sm">
                    Premium Catering
                  </span>

                  <h1 className="mt-6 text-5xl font-bold lg:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 text-lg text-gray-200">
                    {slide.subtitle}
                  </p>

                  <div className="mt-10 flex gap-4">
                    <Button asChild size="lg">
                      <Link href="/menu-items">
                        Explore Menu
                      </Link>
                    </Button>

                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/events">
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </section>
  );
}