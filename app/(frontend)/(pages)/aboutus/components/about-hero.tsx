import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative min-h-[650px]">
      <Image
        src="/images/about/about-hero.jpg"
        alt="Beautifully prepared catering food"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

      <div className="container relative z-10 mx-auto flex min-h-[650px] items-center px-4">
        <div className="max-w-3xl text-white">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Our Story
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
            We Believe Every
            <br />
            Celebration Deserves
            <br />
            <span className="text-primary">Great Food.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">
            We bring together delicious food, thoughtful preparation, and
            dependable catering to help make your special moments truly
            memorable.
          </p>
        </div>
      </div>
    </section>
  );
}