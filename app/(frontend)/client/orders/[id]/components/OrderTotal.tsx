"use client";

import { useGetStoreSettings } from "@/app/(frontend)/admin/settings/store/hooks/useGetStoreSettings";

interface OrderTotalProps {
  total: number;
}

export default function OrderTotal({
  total,
}: OrderTotalProps) {
  const { data } = useGetStoreSettings();

  return (
    <div className="flex items-center justify-between rounded-2xl border bg-background p-5 shadow-sm">
      <span className="text-lg font-semibold">
        Total
      </span>

      <span className="text-xl font-bold">
        {data?.store.currency} {total.toLocaleString()}
      </span>
    </div>
  );
}