import {
  CalendarDays,
  Clock,
  Users,
  Utensils,
} from "lucide-react";

import { ClientTastingInquiry } from "../../types/type";

interface TastingEventInfoProps {
  tasting: ClientTastingInquiry;
}

export default function TastingEventInfo({
  tasting,
}: TastingEventInfoProps) {
  return (
    <section className="rounded-2xl border bg-background shadow-sm">
      <div className="border-b px-5 py-4">
        <h2 className="font-semibold">
          Event Information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Information about your tasting event.
        </p>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <Info
          icon={Utensils}
          label="Event Type"
          value={tasting.eventType}
        />

        <Info
          icon={Users}
          label="Guests"
          value={tasting.guests}
        />

        <Info
          icon={CalendarDays}
          label="Event Date"
          value={new Date(
            tasting.date,
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />

        <Info
          icon={Clock}
          label="Preferred Time"
          value={tasting.time}
        />
      </div>
    </section>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

      <div>
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 font-medium">{value}</p>
      </div>
    </div>
  );
}
