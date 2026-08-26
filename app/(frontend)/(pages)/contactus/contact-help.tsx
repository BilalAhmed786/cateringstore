import {
  Building2,
  Cake,
  Heart,
  HelpCircle,
} from "lucide-react";

export default function ContactHelp() {
  return (
    <section className="bg-muted py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How Can We Help?
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Tell us what you need.
          </h2>

          <p className="mt-4 text-muted-foreground">
            Whether you&apos;re planning something intimate or something
            bigger, we&apos;re happy to help.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <HelpCard
            icon={<Heart className="h-6 w-6" />}
            title="Wedding & Engagement"
            description="Planning catering for your special day?"
          />

          <HelpCard
            icon={<Cake className="h-6 w-6" />}
            title="Birthday & Family"
            description="Need food for a family celebration?"
          />

          <HelpCard
            icon={<Building2 className="h-6 w-6" />}
            title="Corporate Events"
            description="Looking for catering for your team or business?"
          />

          <HelpCard
            icon={<HelpCircle className="h-6 w-6" />}
            title="Something Else?"
            description="Have a question or a custom request?"
          />
        </div>
      </div>
    </section>
  );
}

function HelpCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="mt-5 font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}