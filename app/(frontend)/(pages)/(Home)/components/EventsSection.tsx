import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";


const events = [
  {
    id: 1,
    title: "Wedding Catering",
    image: "/images/events/wedding.jpg",
    description:
      "Elegant dining experiences tailored for your unforgettable wedding day.",
    large: true,
  },
  {
    id: 2,
    title: "Corporate Events",
    image: "/images/events/corporate.jpg",
    description:
      "Professional catering for meetings, conferences, and business gatherings.",
    large: true,
  },
  {
    id: 3,
    title: "Birthday Parties",
    image: "/images/events/birthday.jpg",
  },
  {
    id: 4,
    title: "Engagement",
    image: "/images/events/engagement.jpg",
  },
  {
    id: 5,
    title: "Baby Shower",
    image: "/images/events/baby-shower.jpg",
  },
  {
    id: 6,
    title: "Family Gathering",
    image: "/images/events/family.jpg",
  },
];

export default function EventsSection() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        {/* Heading */}

        <div className="mb-14 flex items-center justify-between">

          <div>

            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Events We Cater
            </span>

            <h2 className="mt-2 text-4xl font-bold">
              Making Every Celebration Memorable
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              From intimate family gatherings to grand weddings,
              we provide exceptional catering for every occasion.
            </p>

          </div>

          <Button asChild>
            <Link href="/events">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>

        {/* Grid */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {events.map((event) => (

            <div
              key={event.id}
              className={`group relative overflow-hidden rounded-3xl ${
                event.large
                  ? "lg:col-span-2 h-[450px]"
                  : "h-[220px]"
              }`}
            >

              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Content */}

              <div className="absolute inset-x-0 bottom-0 p-8 text-white">

                <h3 className="text-2xl font-bold">
                  {event.title}
                </h3>

                {event.large && (
                  <>
                    <p className="mt-3 max-w-md text-gray-200">
                      {event.description}
                    </p>

                    <Button
                      className="mt-6"
                      variant="secondary"
                      asChild
                    >
                      <Link href={`/events/${event.id}`}>
                        Explore Event
                      </Link>
                    </Button>
                  </>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}