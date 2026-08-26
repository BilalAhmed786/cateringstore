import {
  Heart,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

export default function AboutMission() {
  return (
    <section className="bg-muted py-24 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Mission
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Make catering easier,
            <br />
            so you can enjoy the moment.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Planning an event already comes with enough decisions. We want
            your catering experience to feel straightforward, flexible, and
            dependable.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <ValueCard
            icon={<UtensilsCrossed className="h-6 w-6" />}
            number="01"
            title="Quality"
            description="We care about the food we serve and the experience it creates for your guests."
          />

          <ValueCard
            icon={<Heart className="h-6 w-6" />}
            number="02"
            title="Care"
            description="Every event matters. We aim to provide thoughtful service from planning to delivery."
          />

          <ValueCard
            icon={<Sparkles className="h-6 w-6" />}
            number="03"
            title="Experience"
            description="We combine food, presentation, and service to help create memorable occasions."
          />
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  icon,
  number,
  title,
  description,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>

        <span className="text-sm font-semibold text-muted-foreground">
          {number}
        </span>
      </div>

      <h3 className="mt-7 text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}