"use client";

import {
  Mail,
  Phone,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(frontend)/components/ui/card";

import type { CustomerDetails } from "../types/type";
import { CustomerInfo } from "./CustomerInfo";

interface Props {
  customer: CustomerDetails;
}

export function CustomerInfoCard({ customer }: Props) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Customer Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">

          <CustomerInfo
            icon={<User className="h-5 w-5" />}
            label="Name"
            value={customer.name ?? "N/A"}
          />

          <CustomerInfo
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value={customer.email}
          />

          <CustomerInfo
            icon={<Phone className="h-5 w-5" />}
            label="Phone"
            value={customer.phone ?? "N/A"}
          />

        </div>
      </CardContent>
    </Card>
  );
}