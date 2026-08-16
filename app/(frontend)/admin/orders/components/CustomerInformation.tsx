"use client";

import {
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(frontend)/components/ui/card";

import { Order } from "../types/type";

interface Props {
  order: Order;
}

export function CustomerInformation({ order }: Props) {
  const name =
    order.guestName ||
    order.user?.name ||
    "Guest Customer";

  const email =
    order.guestEmail ||
    order.user?.email ||
    "N/A";

  const phone =
    order.guestPhone ||
    "N/A";

  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Customer Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 md:grid-cols-2">
          <CustomerField
            icon={<User className="h-4 w-4" />}
            label="Name"
            value={name}
          />

          <CustomerField
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={email}
          />

          <CustomerField
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={phone}
          />

          <CustomerField
            icon={<MapPin className="h-4 w-4" />}
            label="Customer Type"
            value={
              order.user
                ? "Registered User"
                : "Guest"
            }
          />
        </div>

        {order.notes && (
          <div className="mt-5 rounded-md bg-muted p-4">
            <p className="mb-1 text-sm font-medium">
              Notes
            </p>

            <p className="text-sm text-muted-foreground">
              {order.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface CustomerFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function CustomerField({
  icon,
  label,
  value,
}: CustomerFieldProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">
        {icon}
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <p className="font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}