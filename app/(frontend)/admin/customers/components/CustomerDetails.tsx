"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";

import { useGetCustomerById } from "../hooks/useGetCustomerById";
import { CustomerInfoCard } from "./CustomerInfoCard";
import { CustomerOrders } from "./CustomerOrders";
import { CustomerStats } from "./CustomerStats";


interface Props {
  id: string;
}

export function CustomerDetails({ id }: Props) {
  const { data: customer, isLoading } = useGetCustomerById(id);

  if (isLoading) {
    return <Loader />;
  }

  if (!customer) {
    return (
      <div className="p-8">
        <p>Customer not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-6">

      {/* Back */}
      <Link href="/admin/customers">
        <UniButton
          label="Back to Customers"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
          className="m-5"
        />
      </Link>

      <CustomerInfoCard customer={customer} />

      <CustomerStats
        totalOrders={customer._count.orders}
      />

      <CustomerOrders orders={customer.orders} />

    </div>
  );
}