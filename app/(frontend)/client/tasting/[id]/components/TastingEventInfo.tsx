import {
  CalendarDays,
  Clock,
  Users,
  Utensils,
} from "lucide-react";

import { ClientTastingInquiry } from "../../types/type";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/(frontend)/components/ui/card";


interface TastingEventInfoProps {
  tasting: ClientTastingInquiry;
}

export default function TastingEventInfo({
  tasting,
}: TastingEventInfoProps) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="text-base">
          Event Information
        </CardTitle>

        <CardDescription>
          Information about your tasting event.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 sm:grid-cols-2">
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
            value={new Date(tasting.date).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          />

          <Info
            icon={Clock}
            label="Preferred Time"
            value={tasting.time}
          />
        </div>
      </CardContent>
    </Card>
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

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}