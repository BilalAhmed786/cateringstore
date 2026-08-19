"use client";

import { useState } from "react";

import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { BaseSearch } from "@/app/(frontend)/components/reusables/search/search";
import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { useGetReviews } from "./hooks/useGetReviews";
import ReviewTable from "./components/ReviewTable";


export default function ReviewsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 5;

  const debouncedSearch =
    useDebounce(search, 700);

  const { data, isFetching } =
    useGetReviews({
      page,
      limit,
      search: debouncedSearch,
    });

  
  const reviews = data?.reviews ?? [];

  const total = data?.total ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="w-full space-y-6 px-4 py-10">

      <Metadata
        title="Reviews"
        desc="Manage customer reviews"
      />

      <BaseSearch
        label=""
        value={search}
        onChange={handleSearch}
        placeholder="Search reviews..."
      />

      {isFetching ? (
        <Loader />
      ) : (
        <ReviewTable
          reviews={reviews}
        />
      )}

      <ItemsPagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />

    </div>
  );
}