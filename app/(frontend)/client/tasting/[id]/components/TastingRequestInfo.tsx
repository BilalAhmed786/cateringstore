import { ClientTastingInquiry } from "../../types/type";

interface TastingRequestInfoProps {
  tasting: ClientTastingInquiry;
}

export default function TastingRequestInfo({
  tasting,
}: TastingRequestInfoProps) {
  return (
    <section className="rounded-2xl border bg-background shadow-sm">
      <div className="border-b px-5 py-4">
        <h2 className="font-semibold">
          Request Information
        </h2>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <Info
          label="Requested On"
          date={tasting.createdAt}
        />

        <Info
          label="Last Updated"
          date={tasting.updatedAt}
        />
      </div>
    </section>
  );
}

function Info({
  label,
  date,
}: {
  label: string;
  date: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium">
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
