"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { BaseSearch } from "@/app/(frontend)/components/reusables/search/search";
import { DataTable } from "@/app/(frontend)/components/reusables/table/table";
import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";

import { useGetCustomers } from "./hooks/useGetCustomers";
import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";
import { useUpdateCustomerRole } from "./hooks/useUpdateCustomerRole";
import { toast } from "sonner";
import { useCurrentUser } from "../../components/header/hook/useCurrentUser";

type CustomerRole = "CLIENT" | "ADMIN" | "SUPER_ADMIN";

const roles: CustomerRole[] = ["CLIENT", "ADMIN", "SUPER_ADMIN"];
export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const {user} = useCurrentUser()

  const limit = 10;

  const debouncedSearch = useDebounce(search, 700);
  const { data, isFetching } = useGetCustomers({
    page,
    limit,
    search: debouncedSearch,
  });

  const updateRole = useUpdateCustomerRole();

  const customers = data?.customers ?? [];
  const total = data?.total ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full px-4 space-y-6">
        <Metadata title="Customers" desc="Manage registered customers" />

        {/* Search */}
        <div className="flex items-end justify-between gap-4">
          <BaseSearch
            label=""
            value={search}
            onChange={handleSearch}
            placeholder="Search customers..."
            className="max-w-3xl sm:max-w-2xl lg:w-3xl py-2 px-5 rounded-3xl"
          />
        </div>

        {/* Table */}
        <div
          className={`transition-opacity duration-200 ${
            isFetching ? "opacity-60 pointer-events-none" : "opacity-100"
          }`}
        >
          {isFetching ? (
            <Loader />
          ) : (
            <DataTable
              items={customers}
              isLoading={isFetching}
              columns={[
                {
                  header: "Name",
                  accessor: (customer) => customer.name ?? "N/A",
                },

                {
                  header: "Email",
                  accessor: (customer) => customer.email,
                },

                {
                  header: "Update Role",
                  accessor: (customer) => (
                    <div className="flex items-center gap-2 h-9">
                      {/* Current role */}
                      <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium whitespace-nowrap">
                        {customer.role}
                      </span>

                      {/* Role dropdown */}
                      <MenuItemDropdown
                        actions={roles.map((role) => ({
                          label: role,

                          onClick: () => {
                            if (user?.role !== "SUPER_ADMIN") {
                              toast.error("unauthorize user");
                            }

                            updateRole.mutate({
                              id: customer.id,
                              role,
                            });
                          },
                        }))}
                      />
                    </div>
                  ),
                },

                {
                  header: "Orders",
                  accessor: (customer) => customer._count.orders,
                },

                {
                  header: "Created At",
                  accessor: (customer) =>
                    new Date(customer.createdAt).toLocaleDateString(),
                },

                {
                  header: "Action",
                  accessor: (customer) => (
                    <Link href={`/admin/customers/${customer.id}`}>
                      <UniButton
                        size="sm"
                        variant="outline"
                        icon={<Eye className="h-4 w-4" />}
                      />
                    </Link>
                  ),
                },
              ]}
            />
          )}
        </div>

        {/* Pagination */}
        <ItemsPagination
          page={page}
          total={total}
          limit={limit}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
