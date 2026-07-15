import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";


const featuredMenu = [
  {
    id: 1,
    name: "Chicken Biryani",
    image: "/images/menu/biryani.jpg",
    price: "$12",
    description: "Aromatic basmati rice with tender chicken and traditional spices.",
  },
  {
    id: 2,
    name: "Chicken Karahi",
    image: "/images/menu/karahi.jpg",
    price: "$18",
    description: "Traditional Pakistani chicken karahi cooked with fresh tomatoes.",
  },
  {
    id: 3,
    name: "Seekh Kabab",
    image: "/images/menu/kabab.jpg",
    price: "$10",
    description: "Juicy minced meat kababs grilled over charcoal.",
  },
  {
    id: 4,
    name: "Mix BBQ Platter",
    image: "/images/menu/bbq.jpg",
    price: "$22",
    description: "Chicken tikka, seekh kabab, malai boti and more.",
  },
];

export default function FeaturedMenu() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        {/* Header */}

        <div className="mb-14 flex flex-col items-center justify-between gap-6 md:flex-row">

          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Featured Menu
            </span>

            <h2 className="mt-2 text-4xl font-bold">
              Delicious Dishes Everyone Loves
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Explore some of our most popular dishes prepared by our
              professional chefs using fresh ingredients.
            </p>
          </div>

          <Button asChild>
            <Link href="/menu-items">
              View All Menu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>

        {/* Grid */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {featuredMenu.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}

              <div className="relative h-64 overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

              </div>

              {/* Content */}

              <div className="p-6">

                <div className="mb-3 flex items-center justify-between">

                  <h3 className="text-xl font-semibold">
                    {item.name}
                  </h3>

                  <span className="font-bold text-primary">
                    {item.price}
                  </span>

                </div>

                <p className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="mt-6 w-full"
                >
                  <Link href={`/menu-items/${item.id}`}>
                    View Details
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