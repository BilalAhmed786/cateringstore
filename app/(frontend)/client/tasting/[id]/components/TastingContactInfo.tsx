import {
  Mail,
  Phone,
  User,
} from "lucide-react";

import { ClientTastingInquiry } from "../../types/type";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/(frontend)/components/ui/card";



interface TastingContactInfoProps {
  tasting: ClientTastingInquiry;
}

export default function TastingContactInfo({
  tasting,
}: TastingContactInfoProps) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="text-base">
          Contact Information
        </CardTitle>

        <CardDescription>
          Contact details submitted with your request.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 sm:grid-cols-2">
          <Info
            icon={User}
            label="Name"
            value={tasting.name}
          />

          <Info
            icon={Mail}
            label="Email"
            value={tasting.email}
          />

          <Info
            icon={Phone}
            label="Phone"
            value={tasting.phone}
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

        <p className="mt-1 break-all font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}