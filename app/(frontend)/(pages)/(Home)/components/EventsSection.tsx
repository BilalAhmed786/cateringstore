"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useEventCategories } from "@/app/(frontend)/admin/categories/event/hooks/useEventCategories";


export default function EventsSection() {
const { data: events, isLoading } = useEventCategories({page:1,limit:1000});

  if (isLoading) {
    return (
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <p>Loading events...</p>
        </div>
      </section>
    );
  }

  if (!events?.categories.length) return null;

  return (
    <section className="bg-muted/30 py-24">
      <div className="px-7">
        {/* Heading */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Events We Cater
            </span>

            <h2 className="mt-2 text-4xl font-bold">
              Making Every Celebration Memorable
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              From intimate family gatherings to grand weddings, we provide
              exceptional catering for every occasion.
            </p>
          </div>

          <Button asChild>
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {events.categories.map((event, index) => {
            const isLarge = index < 2;

            return (
              <div
                key={event.id}
                className={`group relative overflow-hidden rounded-3xl ${
                  isLarge ? "lg:col-span-2 h-[450px]" : "h-[220px]"
                }`}
              >
                <Image
                  src={event.image || "/placeholder.jpg"}
                  alt={event.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <h3 className="translate-y-4 transform text-2xl font-bold transition-all duration-500 group-hover:translate-y-0">
                    {event.name}
                  </h3>

                  {isLarge ? (
                    <>
                      <p className="mt-3 max-w-md text-gray-200 lg:translate-y-6 lg:opacity-0 lg:transition-all lg:duration-500 lg:delay-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                        Discover premium catering services for{" "}
                        {event.name.toLowerCase()} with delicious menus,
                        professional service, and unforgettable experiences.
                      </p>
                      <Button
                        className="mt-6 lg:translate-y-6 lg:opacity-0 lg:transition-all lg:duration-500 lg:delay-200 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                        variant="secondary"
                        asChild
                      >
                        <Link href={`/events/category/${event.id}`}>
                          Explore Event
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Link
                      href={`/events/category/${event.id}`}
                      className="mt-3 inline-flex items-center text-sm font-medium text-white hover:underline lg:translate-y-4 lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                    >
                      Explore Event →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
