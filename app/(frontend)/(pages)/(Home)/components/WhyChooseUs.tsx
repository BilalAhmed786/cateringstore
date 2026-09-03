import {
  BadgeCheck,
  ChefHat,
  Clock3,
  Truck,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/app/(frontend)/components/ui/card";

const features = [
  {
    icon: ChefHat,
    title: "Professional Chefs",
    description:
      "Our experienced chefs prepare every meal with passion, ensuring exceptional taste and presentation.",
  },
  {
    icon: BadgeCheck,
    title: "Premium Ingredients",
    description:
      "We use only fresh, high-quality ingredients to create delicious and healthy dishes.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Your food arrives fresh and on time, no matter the size of your event.",
  },
  {
    icon: Clock3,
    title: "24/7 Support",
    description:
      "Our team is always available to help you plan and customize your catering experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="w-full px-4 sm:px-7">
        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Catering That Makes Every Event Special
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            From intimate family gatherings to large corporate events, we
            deliver unforgettable food, exceptional service, and memorable
            experiences.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary transition group-hover:bg-primary group-hover:text-white">
                    <Icon size={30} />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}