import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UniButton } from "../../components/reusables/button/button";



export default function ContactCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border p-8 md:flex-row md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Ready When You Are
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Already know what you need?
            </h2>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Explore our event options and start planning your catering.
            </p>
          </div>

          <Link href="/events">
            <UniButton
              label="Explore Events"
              icon={<ArrowRight className="h-4 w-4" />}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}