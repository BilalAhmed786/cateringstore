import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "../../../components/ui/button";


const featuredPackages = [
  {
    id: 1,
    name: "Silver Package",
    image: "/images/packages/silver.jpg",
    price: "$199",
    serves: "20-30 Guests",
    description:
      "Perfect for birthdays, family dinners and small gatherings.",
  },
  {
    id: 2,
    name: "Gold Package",
    image: "/images/packages/gold.jpg",
    price: "$399",
    serves: "40-60 Guests",
    description:
      "Ideal for engagements, anniversaries and medium-sized events.",
  },
  {
    id: 3,
    name: "Platinum Package",
    image: "/images/packages/platinum.jpg",
    price: "$699",
    serves: "80-120 Guests",
    description:
      "Our premium package for weddings and large celebrations.",
  },
];

export default function FeaturedPackages() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-14 flex flex-col items-center justify-between gap-6 md:flex-row">

          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Catering Packages
            </span>

            <h2 className="mt-2 text-4xl font-bold">
              Packages For Every Occasion
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Whether you are hosting a small gathering or a grand wedding,
              we have a catering package designed just for you.
            </p>
          </div>

          <Button asChild>
            <Link href="/packages">
              View All Packages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">

          {featuredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute right-4 top-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  {pkg.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {pkg.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{pkg.serves}</span>
                </div>

                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {pkg.description}
                </p>

                <Button className="mt-8 w-full" asChild>
                  <Link href={`/packages/${pkg.id}`}>
                    View Package
                  </Link>
                </Button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}