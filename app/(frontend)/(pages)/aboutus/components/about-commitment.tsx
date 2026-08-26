import Image from "next/image";
import { Check } from "lucide-react";
import image from "@/app/(frontend)/public/images/aboutevnt.png"
export default function AboutCommitment() {
  return (
    <section className="bg-black text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[500px]">
          <Image
            src={image}
            alt="Catering prepared for a special event"
            fill
            className="object-fill"
          />

          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="flex items-center px-6 py-20 sm:px-12 lg:px-20">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Commitment
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Your event matters to us.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/70">
              We understand that catering is not simply about putting food on
              a table. It is about creating an experience that your guests
              remember.
            </p>

            <div className="mt-8 space-y-4">
              <CommitmentItem text="Thoughtfully selected catering options" />
              <CommitmentItem text="Flexible choices for different occasions" />
              <CommitmentItem text="Focus on quality and presentation" />
              <CommitmentItem text="Customer-focused service" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommitmentItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
        <Check className="h-4 w-4" />
      </div>

      <span className="text-white/80">{text}</span>
    </div>
  );
}