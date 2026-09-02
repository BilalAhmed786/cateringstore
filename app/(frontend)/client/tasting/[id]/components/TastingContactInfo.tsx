import {
  Mail,
  Phone,
  User,
} from "lucide-react";

import { ClientTastingInquiry } from "../../types/type";

interface TastingContactInfoProps {
  tasting: ClientTastingInquiry;
}

export default function TastingContactInfo({
  tasting,
}: TastingContactInfoProps) {
  return (
    <section className="rounded-2xl border bg-background shadow-sm">
      <div className="border-b px-5 py-4">
        <h2 className="font-semibold">
          Contact Information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Contact details submitted with your request.
        </p>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
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

        <p className="mt-1 break-all font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}
