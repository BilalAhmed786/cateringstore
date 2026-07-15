import Link from "next/link";
import Image from "next/image";
import { CalendarDays, PhoneCall } from "lucide-react";
import { Button } from "../../../components/ui/button";


export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Image */}
      <Image
        src="/images/cta/cta-bg.jpg"
        alt="Catering Background"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center text-white">

          <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold">
            Lets Make Your Event Special
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight lg:text-6xl">
            Delicious Food,
            <br />
            Memorable Celebrations
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Whether you are planning a wedding, birthday, corporate event,
            or family gathering, our catering team is ready to serve you
            with exceptional food and professional service.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Button size="lg" asChild>
              <Link href="/events">
                <CalendarDays className="mr-2 h-5 w-5" />
                Book Now
              </Link>
            </Button>

            <Button
              size="lg"
              variant="secondary"
              asChild
            >
              <Link href="/contact">
                <PhoneCall className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
            </Button>

          </div>

          {/* Stats */}

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div>
              <h3 className="text-4xl font-bold text-primary">
                250+
              </h3>

              <p className="mt-2 text-gray-300">
                Events Catered
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-primary">
                5000+
              </h3>

              <p className="mt-2 text-gray-300">
                Happy Customers
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-primary">
                4.9★
              </h3>

              <p className="mt-2 text-gray-300">
                Customer Rating
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}