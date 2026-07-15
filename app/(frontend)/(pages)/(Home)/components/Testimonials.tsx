"use client";

import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Wedding Client",
    image: "/images/testimonials/client-1.jpg",
    rating: 5,
    review:
      "The food was absolutely amazing! Our wedding guests couldn't stop praising the taste and presentation. Highly recommended.",
  },
  {
    id: 2,
    name: "Fatima Ali",
    role: "Birthday Event",
    image: "/images/testimonials/client-2.jpg",
    rating: 5,
    review:
      "Professional staff, delicious food, and excellent service. Everything was delivered exactly on time.",
  },
  {
    id: 3,
    name: "Usman Ahmed",
    role: "Corporate Client",
    image: "/images/testimonials/client-3.jpg",
    rating: 5,
    review:
      "We've hired them for multiple corporate events and they've never disappointed. Great quality and presentation.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        {/* Heading */}

        <div className="mx-auto mb-14 max-w-2xl text-center">

          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </span>

          <h2 className="mt-2 text-4xl font-bold">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-muted-foreground">
            We are proud to have served hundreds of happy customers
            across weddings, birthdays, and corporate events.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Stars */}

              <div className="mb-6 flex gap-1">

                {[...Array(review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              {/* Review */}

              <p className="leading-7 text-muted-foreground">
                {review.review}
              </p>

              {/* User */}

              <div className="mt-8 flex items-center gap-4">

                <Image
                  src={review.image}
                  alt={review.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />

                <div>

                  <h4 className="font-semibold">
                    {review.name}
                  </h4>

                  <p className="text-sm text-muted-foreground">
                    {review.role}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}