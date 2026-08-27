import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import Link from "next/link";



export default function AboutCTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2rem] px-6 py-16 text-center md:px-12 md:py-20">
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
              Let&apos;s Celebrate Together
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Planning something special?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg opacity-90">
              Explore our catering options and find something delicious for
              your next event.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/events">
                <UniButton
                  label="Explore Events"
                  variant="default"
                />
              </Link>

              <Link href="/contact">
                <UniButton
                  label="Contact Us"
                  variant="default"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}