"use client";

import { useGetStoreSettings } from "@/app/(frontend)/admin/settings/store/hooks/useGetStoreSettings";
import { Card, CardContent } from "@/app/(frontend)/components/ui/card";



interface OrderTotalProps {
  total: number;
}

export default function OrderTotal({ total }: OrderTotalProps) {
  const { data } = useGetStoreSettings();

  return (
    <Card className="p-5">
      <CardContent className="flex items-center justify-between p-5">
        <span className="text-lg font-semibold">
          Total
        </span>

        <span className="text-xl font-bold">
          {data?.store.currency} {total.toLocaleString()}
        </span>
      </CardContent>
    </Card>
  );
}