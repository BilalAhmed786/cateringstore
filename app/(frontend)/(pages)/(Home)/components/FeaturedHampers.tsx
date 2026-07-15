import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { Button } from "../../../components/ui/button";

const featuredHampers = [
  {
    id: 1,
    name: "Wedding Hamper",
    image: "/images/hampers/wedding.jpg",
    price: "$149",
    badge: "Best Seller",
    description:
      "A premium gift hamper filled with delicious treats for weddings and engagements.",
  },
  {
    id: 2,
    name: "Corporate Hamper",
    image: "/images/hampers/corporate.jpg",
    price: "$99",
    badge: "Popular",
    description:
      "A thoughtful gift for clients, employees, and corporate celebrations.",
  },
  {
    id: 3,
    name: "Birthday Hamper",
    image: "/images/hampers/birthday.jpg",
    price: "$79",
    badge: "New",
    description:
      "Celebrate birthdays with a beautifully arranged hamper full of sweet surprises.",
  },
];

export default function FeaturedHampers() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-14 flex flex-col items-center justify-between gap-6 md:flex-row">

          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Gift Hampers
            </span>

            <h2 className="mt-2 text-4xl font-bold">
              Beautiful Hampers For Every Celebration
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Surprise your loved ones, friends, or business partners with
              carefully curated premium gift hampers.
            </p>
          </div>

          <Button asChild>
            <Link href="/hampers">
              View All Hampers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {featuredHampers.map((hamper) => (
            <div
              key={hamper.id}
              className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">

                <Image
                  src={hamper.image}
                  alt={hamper.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
                  {hamper.badge}
                </div>

              </div>

              {/* Content */}
              <div className="p-6">

                <div className="mb-3 flex items-center justify-between">

                  <h3 className="text-2xl font-bold">
                    {hamper.name}
                  </h3>

                  <Gift className="h-5 w-5 text-primary" />

                </div>

                <p className="mb-6 text-sm leading-7 text-muted-foreground">
                  {hamper.description}
                </p>

                <div className="flex items-center justify-between">

                  <span className="text-2xl font-bold text-primary">
                    {hamper.price}
                  </span>

                  <Button asChild>
                    <Link href={`/hampers/${hamper.id}`}>
                      View Details
                    </Link>
                  </Button>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}