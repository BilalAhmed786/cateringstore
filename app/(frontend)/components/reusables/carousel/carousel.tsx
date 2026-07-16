"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { AppCarouselProps } from "../types/types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/(frontend)/components/ui/carousel";

export default function AppCarousel<T>({
  items,
  renderItem,
  itemClassName = "basis-full",
  className,
  autoplay = true,
  delay = 5000,
  loop = true,
  showArrows = true,
  previousClassName,
  nextClassName,
}: AppCarouselProps<T>) {
  const plugin = useRef(
    Autoplay({
      delay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <Carousel
      className={className}
      opts={{
        loop,
        align: "start",
        containScroll: "keepSnaps",
      }}
      plugins={autoplay ? [plugin.current] : []}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className={itemClassName}>
            {renderItem(item)}
          </CarouselItem>
        ))}
      </CarouselContent>

      {showArrows && (
        <>
          <CarouselPrevious className={previousClassName} />
          <CarouselNext className={nextClassName} />
        </>
      )}
    </Carousel>
  );
}
