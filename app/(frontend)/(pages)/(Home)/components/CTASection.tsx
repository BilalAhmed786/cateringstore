import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center text-white">
          <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold">
            Lets Make Your Event Special
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Delicious Food,
            <br />
            Memorable Celebrations
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base text-gray-300 sm:text-lg">
            Whether you are planning a wedding, birthday, corporate event, or
            family gathering, our catering team is ready to serve you with
            exceptional food and professional service.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/tasting">
              <UniButton
                type="button"
                size="lg"
                label="Book Now"
                className="w-fit"
              />
            </Link>

            <Link href="/contactus">
              <UniButton
                type="button"
                size="lg"
                variant="secondary"
                label="Contact Us"
                className="w-fit"
              />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div>
              <AnimatedCounter end={250} suffix="+" />

              <p className="mt-2 text-gray-300">Events Catered</p>
            </div>

            <div>
              <AnimatedCounter end={5000} suffix="+" />

              <p className="mt-2 text-gray-300">Happy Customers</p>
            </div>

            <div>
              <AnimatedCounter end={4.9} decimals={1} suffix="★" />

              <p className="mt-2 text-gray-300">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}