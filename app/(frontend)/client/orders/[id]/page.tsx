"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";
import { useGetClientOrder } from "../hooks/useGetClientOrder";
import OrderDetails from "./components/OrderDetails";



interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = use(params);

  const {
    data,
    isLoading,
    isError,
  } = useGetClientOrder(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !data?.order) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">
          Order not found.
        </p>

        <Link href="/client/orders">
          <UniButton label="Back to Orders" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Metadata
          title="Order Details"
          desc={`Order #${data.order.id}`}
        />

        <Link href="/client/orders">
          <UniButton
            label="Back to Orders"
            variant="outline"
            icon={<ArrowLeft className="h-4 w-4" />}
          />
        </Link>
      </div>

      <OrderDetails order={data.order} />
    </div>
  );
}