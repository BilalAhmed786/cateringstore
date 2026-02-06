"use client";
import Image from "next/image";
import { Badge } from "@/app/(frontend)/components/ui/badge";
import { Dropdowitems, DropdownAction } from "../types/types";
import { Pencil, Trash, Eye, EyeOff } from "lucide-react";
import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";
import { useRouter } from "next/navigation";
export function MenuItemsGrid({
items = [],
  isLoading,
  onDelete,
  onToggleStatus,
}: Dropdowitems) {

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
        // Define actions dynamically
        const actions: DropdownAction[] = [
          {
            label: "Edit",
            icon: Pencil,
            onClick: () => {
              // You can use router push here if you want
             router.push(`/admin/menu-items/${item.id}`);
            },
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
            className="relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
          >
            {/* Dropdown */}
            <div className="absolute top-2 right-2 z-10">
              <MenuItemDropdown actions={actions} />
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
              <h2 className="line-clamp-1 text-lg font-semibold">
                {item.title}
              </h2>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-medium text-gray-800">Rs {item.price}</span>

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
