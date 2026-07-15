import {
  BadgeCheck,
  ChefHat,
  Clock3,
  Truck,
} from "lucide-react";

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
      <div className="container mx-auto px-4">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-4xl font-bold">
            Catering That Makes Every Event Special
          </h2>

          <p className="mt-4 text-muted-foreground">
            From intimate family gatherings to large corporate events,
            we deliver unforgettable food, exceptional service, and
            memorable experiences.
          </p>
        </div>

        {/* Features */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}