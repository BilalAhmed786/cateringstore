import { Card, CardHeader, CardTitle, CardContent } from "@/app/(frontend)/components/ui/card";
import { ClientTastingInquiry } from "../../types/type";



interface TastingRequestInfoProps {
  tasting: ClientTastingInquiry;
}

export default function TastingRequestInfo({
  tasting,
}: TastingRequestInfoProps) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="text-base">
          Request Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 sm:grid-cols-2">
          <Info
            label="Requested On"
            date={tasting.createdAt}
          />

          <Info
            label="Last Updated"
            date={tasting.updatedAt}
          />
        </div>
      </CardContent>
    </Card>
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