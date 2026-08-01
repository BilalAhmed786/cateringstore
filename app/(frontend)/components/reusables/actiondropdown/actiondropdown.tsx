"use client";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/(frontend)/components/ui/dropdown-menu";

import { Button } from "@/app/(frontend)/components/ui/button"; // Correct
import { MenuItemDropdownProps } from "../types/types";

export function MenuItemDropdown({ actions }: MenuItemDropdownProps) {
  const visibleActions = actions.filter((action) => action.show !== false);

  if (!visibleActions.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        {visibleActions.map((action, index) => {
          const Icon = action.icon;

          return (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              {...(action.variant === "danger"
                ? { className: "text-red-600" }
                : {})} // type-safe
            >
              {Icon && <Icon />}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
