"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { DataTable } from "@/app/(frontend)/components/reusables/table/table";
import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";


import { TastingInquiry } from "../types/type";
import { useGetTastingInquiries } from "../hooks/useGetTastingInquiries";

export default function TastingInquiryTable() {
  const router = useRouter();

  // ---------------------------------------
  // Search
  // ---------------------------------------

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search,1000);

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // ---------------------------------------
  // Status
  // ---------------------------------------

  const [status, setStatus] = useState("all");

  // ---------------------------------------
  // API
  // ---------------------------------------

  const { data, isLoading, isError } = useGetTastingInquiries({
    search: debouncedSearch,
    status,
    page,
    limit,
  });

  const inquiries: TastingInquiry[] = data?.data ?? [];

  //filter options

  const options = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Pending",
      value: "PENDING",
    },
    {
      label: "Confirmed",
      value: "CONFIRMED",
    },
    {
      label: "Completed",
      value: "COMPLETED",
    },
    {
      label: "Cancelled",
      value: "CANCELLED",
    },
  ];

  // ---------------------------------------
  // Columns
  // ---------------------------------------

  const columns = [
    {
      header: "Customer",
      accessor: (inquiry: TastingInquiry) => (
        <div>
          <p className="font-medium">{inquiry.name}</p>

          <p className="text-sm text-muted-foreground">{inquiry.email}</p>
        </div>
      ),
    },

    {
      header: "Event",
      accessor: (inquiry: TastingInquiry) => inquiry.eventType,
    },

    {
      header: "Guests",
      accessor: (inquiry: TastingInquiry) => inquiry.guests,
    },

    {
      header: "Date",
      accessor: (inquiry: TastingInquiry) =>
        new Date(inquiry.date).toLocaleDateString(),
    },

    {
      header: "Time",
      accessor: (inquiry: TastingInquiry) => inquiry.time,
    },

    {
      header: "Status",
      accessor: (inquiry: TastingInquiry) => (
        <span className="font-medium">{inquiry.status}</span>
      ),
    },

    {
      header: "Action",
      accessor: (inquiry: TastingInquiry) => (
        <UniButton
          label="View"
          variant="outline"
          icon={<Eye className="h-4 w-4" />}
          onClick={() => router.push(`/admin/tasting/${inquiry.id}`)}
        />
      ),
    },
  ];

  // ---------------------------------------
  // Error
  // ---------------------------------------

  if (isError) {
    return (
      <div className="p-6 text-destructive">
        Failed to load tasting inquiries.
      </div>
    );
  }

  // ---------------------------------------
  // UI
  // ---------------------------------------

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold">Tasting Inquiries</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage customer tasting requests.
        </p>
      </div>

      {/* Filters */}

      <EntityFilters
        filters={[
          {
            key: "status",
            label: "Status",
            value: status,
            onChange: (value) => {
              setStatus(value);
              setPage(1);
            },
            options: options,
          },
        ]}
        search={{
          value: search,
          onChange: (value) => {
            setSearch(value);
            setPage(1);
          },
          placeholder: "Search by name, email, event or phone...",
          classname: "max-w-md mt-4",
        }}
      />

      {/* Data Table */}

      <DataTable items={inquiries} isLoading={isLoading} columns={columns} />

      {/* Pagination */}

      <ItemsPagination
        page={page}
        total={data?.total ?? 0}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}
