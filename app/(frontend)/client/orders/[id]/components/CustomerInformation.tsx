"use client";

import { Mail, Phone } from "lucide-react";

import { ClientOrder } from "../../types/type";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/(frontend)/components/ui/card";



interface CustomerInformationProps {
  order: ClientOrder;
}

export default function CustomerInformation({
  order,
}: CustomerInformationProps) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="text-base">
          Customer Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Name
            </p>

            <p className="mt-1 font-medium">
              {order.guestName || "N/A"}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              Email
            </p>

            <p className="mt-1 break-all font-medium">
              {order.guestEmail || "N/A"}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              Phone
            </p>

            <p className="mt-1 font-medium">
              {order.guestPhone || "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}