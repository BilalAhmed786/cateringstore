import Link from "next/link";
import Image from "next/image";
import { ChefHat } from "lucide-react";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import image from "../../../public/images/aboutstory.png"


export default function AboutStory() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src={image}
                alt="Freshly prepared catering food"
                fill
                className="object-center"
              />
            </div>

            <div className="absolute -bottom-8 -right-4 hidden w-48 rounded-2xl border bg-background p-5 shadow-xl sm:block">
              <ChefHat className="h-8 w-8 text-primary" />

              <p className="mt-3 text-sm font-semibold">
                Made for moments worth celebrating
              </p>
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Who We Are
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Food is more than a meal.
              <br />
              <span className="text-muted-foreground">
                It is part of the memory.
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-lg leading-8 text-muted-foreground">
              <p>
                At our Catering Store, we believe food plays an important role
                in bringing people together. A wedding, birthday, corporate
                gathering, or family celebration becomes even more special
                when everyone can sit together and enjoy a great meal.
              </p>

              <p>
                That is why we focus on making catering simple. From selecting
                food to choosing an event package, our goal is to give you
                convenient options while taking care of the details that
                matter.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/contact">
                <UniButton label="Talk To Our Team" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}