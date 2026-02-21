"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/(frontend)/components/ui/pagination"; // adjust path
import { paginationProps } from "../types/types";

export function ItemsPagination({
  page,
  total,
  limit,
  onPageChange,
}: paginationProps) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent className="justify-center gap-2">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            size="sm"
            onClick={() => page > 1 && onPageChange(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {/* Page Numbers */}
        {pagesArray.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              size="sm"
              onClick={() => onPageChange(p)}
              className={p === page ? "bg-blue-500 text-white" : ""}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            size="sm"
            onClick={() => page < totalPages && onPageChange(page + 1)}
            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
