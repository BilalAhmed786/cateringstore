"use client";

import { useEffect, useState } from "react";

import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";

import ReviewFilters from "./components/ReviewFilters";
import ReviewList from "./components/ReviewList";
import { GetMyReviewsParams } from "./types/type";

export default function ReviewsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<GetMyReviewsParams["type"]>("ALL");

  const [page, setPage] = useState(1);

  const limit = 10;

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    function pagination() {
      setPage(1);
    }
    pagination();
  }, [debouncedSearch, type]);

  return (
    <div className="w-full space-y-6">
      <Metadata 
      title="View the reviews you have shared" 
      desc="Reviews you have shared for our menu items, packages, events, and hampers"
      />

     <ReviewFilters
        search={search}
        onSearchChange={setSearch}
        type={type ?? "ALL"}
        onTypeChange={(value) => {
          setType(value);
          setPage(1);
        }}
      />

      <ReviewList
        search={debouncedSearch}
        type={type}
        page={page}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}
