"use client";

import { useEffect, useState } from "react";

import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";

import TastingFilters from "./components/TastingFilters";
import TastingList from "./components/TastingList";

import {
  TastingInquiryStatus,
} from "./types/type";

const DEFAULT_LIMIT = 10;

export default function TastingPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<TastingInquiryStatus | "ALL">("ALL");

  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  // Reset pagination when filters change
  useEffect(() => {
     function pagination(){

         setPage(1);
     }
     pagination()
  }, [debouncedSearch, status]);

  return (
    <div className="w-full space-y-6">
      <Metadata
        title="Tasting Requests"
        desc="View and track your tasting requests"
      />

      {/* Filters */}
      <TastingFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {/* Tasting requests */}
      <TastingList
        search={debouncedSearch}
        status={status}
        page={page}
        limit={DEFAULT_LIMIT}
        onPageChange={setPage}
      />
    </div>
  );
}