"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";




import { heroSlides } from "./heroData";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../components/ui/carousel";
import { Button } from "../../../components/ui/button";

export default function HeroSection() {
  const plugin = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  return (
    <section className="relative">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[90vh]">

                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}

                <div className="absolute inset-0 flex items-center">
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

                        <Button
                          variant="secondary"
                          size="lg"
                          asChild
                        >
                          <Link href="/events">
                            Book Now
                          </Link>
                        </Button>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-8" />
        <CarouselNext className="right-8" />
      </Carousel>
    </section>
  );
}