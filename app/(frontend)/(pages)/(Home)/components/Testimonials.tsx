"use client";

import AppCarousel from "@/app/(frontend)/components/reusables/carousel/carousel";
import { Star, Quote } from "lucide-react";
import { useGetTestimonials } from "../hook/useGetTestimonials";

export default function Testimonials() {
  const { data, isLoading, isError } = useGetTestimonials();

  const testimonials = data?.reviews ?? [];

  if (isLoading) {
    return (
      <section className="overflow-hidden py-24">
        <div className="px-7">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto h-5 w-28 animate-pulse rounded bg-muted" />

            <div className="mx-auto mt-4 h-10 w-80 animate-pulse rounded bg-muted" />

            <div className="mx-auto mt-5 h-5 max-w-xl animate-pulse rounded bg-muted" />
          </div>

          <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-3xl border bg-muted"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-24">
      <div className="px-7">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Testimonials
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            What Our Customers Say
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            From intimate celebrations to grand events, our customers love the
            food, service, and experience we provide.
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-14">
          <AppCarousel
            items={testimonials}
            itemClassName="basis-full pl-4 md:basis-1/2 lg:basis-1/4"
            autoplay
            delay={2000}
            loop
            showArrows={false}
            previousClassName="-left-5 hidden md:flex"
            nextClassName="-right-5 hidden md:flex"
            renderItem={(testimonial) => (
              <article className="group relative flex h-full min-h-4 flex-col overflow-hidden rounded-3xl border bg-background p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Quote */}
                <div className="absolute right-6 top-5 opacity-10">
                  <Quote className="w-7" />
                </div>

                {/* Rating */}
                <div className="relative flex items-center gap-1">
                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Review */}
                <blockquote className="relative mt-7 flex-1">
                  <p className="text-[15px] leading-7 text-muted-foreground">
                    “{testimonial.review}”
                  </p>
                </blockquote>

                {/* Divider */}
                <div className="my-6 h-px bg-border" />

                {/* Customer */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate font-semibold">
                      {testimonial.name}
                    </h4>

                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {testimonial.itemName}
                    </p>
                  </div>
                </div>
              </article>
            )}
          />
        </div>
      </div>
    </section>
  );
}
