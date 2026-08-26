import Image from "next/image";
import image from "../../../public/images/eventfood.png";
import TastingForm from "@/app/(frontend)/components/tasting/TastingForm";



export default function ContactInquiry() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">

          {/* -------------------------------- */}
          {/* LEFT SIDE */}
          {/* -------------------------------- */}

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Start A Conversation
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Tell us what
              <br />
              you&apos;re planning.
            </h2>

            <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
              Every event is different. Tell us a little about yours and our
              team can help you find the right catering solution.
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={image}
                  alt="Catering food prepared for an event"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* -------------------------------- */}
          {/* RIGHT SIDE */}
          {/* -------------------------------- */}

          <div className="rounded-3xl border bg-card p-6 shadow-sm md:p-10">
            <TastingForm />
          </div>

        </div>
      </div>
    </section>
  );
}