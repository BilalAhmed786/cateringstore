export default function AboutProcess() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              How We Work
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Simple planning.
              <br />
              Delicious results.
            </h2>

            <p className="mt-6 max-w-md leading-7 text-muted-foreground">
              We keep the process simple so you can spend less time worrying
              about catering and more time enjoying your event.
            </p>
          </div>

          <div className="space-y-10">
            <ProcessStep
              number="01"
              title="Tell Us About Your Event"
              description="Choose the type of event and let us know what you are planning."
            />

            <ProcessStep
              number="02"
              title="Choose Your Catering"
              description="Browse our menu items, packages, hampers, and event options."
            />

            <ProcessStep
              number="03"
              title="Plan the Details"
              description="Select the options that suit your event, guests, and requirements."
            />

            <ProcessStep
              number="04"
              title="Enjoy Your Celebration"
              description="We take care of the catering while you focus on your guests and your special moment."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex gap-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {number}
      </div>

      <div className="border-b pb-8">
        <h3 className="text-xl font-bold">{title}</h3>

        <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}