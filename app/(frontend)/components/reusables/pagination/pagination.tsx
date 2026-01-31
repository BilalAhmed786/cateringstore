import { Button } from "@/app/(frontend)/components/ui/button"
import { paginationProps } from "../types/types"

export function MenuItemsPagination({
  page,
  total,
  limit,
  onPageChange,
}: paginationProps) {
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1
        return (
          <Button
            key={p}
            size="sm"
            variant={p === page ? "default" : "outline"}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        )
      })}
    </div>
  )
}
