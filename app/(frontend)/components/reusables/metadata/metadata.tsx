import { metadataprop } from "../types/types";

const Metadata = ({ title, desc, classname }: metadataprop) => {
  return (
    <section className={`px-5 ${classname ?? ""}`}>
      <div className="max-w-2xl">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-primary" />

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
        </div>

        <p className="ml-3 text-sm leading-6 text-muted-foreground sm:text-base">
          {desc}
        </p>
      </div>
    </section>
  );
};

export default Metadata;

