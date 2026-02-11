"use client";
import Image from "next/image";
import { Badge } from "@/app/(frontend)/components/ui/badge";
import { Pencil, Trash, Eye, EyeOff } from "lucide-react";
import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";
import { useRouter } from "next/navigation";
import {
  Dropdowitems,
  DropdownAction,
  GridSelectableItem,
} from "../types/type";
import { RatingSummary } from "../ratingsummary/ratingsummary";

export function MenuItemsGrid({
  items = [],
  isLoading,
  onDelete,
  onToggleStatus,
  selectable = true,
  onSelect,
}: Dropdowitems & { onSelect?: (item: GridSelectableItem) => void }) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Loading menu items...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        No menu items found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => {
        const actions: DropdownAction[] = [
          {
            label: "Edit",
            icon: Pencil,
            onClick: () => router.push(`/admin/menu-items/${item.id}`),
          },
          {
            label: item.available ? "Deactivate" : "Activate",
            icon: item.available ? EyeOff : Eye,
            onClick: () => onToggleStatus?.(item.id, item.available),
          },
          {
            label: "Delete",
            icon: Trash,
            onClick: () => onDelete?.(item.id),
            variant: "danger",
          },
        ];

        return (
          <div
            key={item.id}
            className="relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md cursor-pointer"
            onClick={() => onSelect?.(item)}
          >
            {/* Dropdown */}
            <div className="absolute top-2 right-2 z-10">
              {selectable && <MenuItemDropdown actions={actions} />}
            </div>

            {/* Image */}
            <div className="h-40 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
              {item.images?.[0]?.url ? (
                <Image
                  src={item.images[0].url}
                  alt={item.title}
                  width={400}
                  height={160}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-slate-400">No Image</span>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <h2 className="line-clamp-1 text-lg font-semibold">
                  {item.title}
                </h2>

                {/* ⭐ Rating + 💬 Comments */}
                <div className="mt-1 flex items-center space-x-2">
                  <RatingSummary
                    rating={item.averageRating ?? 0}
                    count={item.totalReviews ?? 0}
                  />

                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.657 0-3.21-.402-4.5-1.107L3 21l1.107-4.5C3.402 15.21 3 13.657 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {item.totalComments ?? 0}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-medium text-gray-800">
                  Rs {item.price}
                </span>

                <Badge variant={item.available ? "default" : "secondary"}>
                  {item.available ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
