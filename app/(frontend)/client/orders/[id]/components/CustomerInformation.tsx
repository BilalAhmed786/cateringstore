"use client";

import { Mail, Phone } from "lucide-react";
import { ClientOrder } from "../../types/type";



interface CustomerInformationProps {
  order: ClientOrder ;
}

export default function CustomerInformation({
  order,
}: CustomerInformationProps) {
  return (
    <div className="rounded-2xl border bg-background p-5 shadow-sm">
      <h2 className="font-semibold">
        Customer Information
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
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
    </div>
  );
}