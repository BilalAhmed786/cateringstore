import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative min-h-[520px]">
      <Image
        src="/images/contact/contact-hero.jpg"
        alt="Contact our catering team"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/65" />

      <div className="container relative z-10 mx-auto flex min-h-[520px] items-center px-4">
        <div className="max-w-3xl text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Contact Us
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-tight md:text-6xl">
            Let&apos;s Talk About
            <br />
            <span className="text-primary">Your Event.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Have a question, planning a celebration, or looking for the right
            catering option? We&apos;re here to help.
          </p>
        </div>
      </div>
    </section>
  );
}