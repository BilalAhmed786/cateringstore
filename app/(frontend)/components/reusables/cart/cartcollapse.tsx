"use client";
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";

interface CartCollapseProps {
  itemsCount: number;
  total:string;
  children: React.ReactNode;
}

export function CartCollapse({
  itemsCount,
  total,
  children,
}: CartCollapseProps) {
  const [open, setOpen] = useState(true);

  if (!itemsCount) return null;

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="rounded-xl border bg-white"
    >
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between p-4">
          <div className="flex items-center gap-3">

            <ShoppingCart className="h-5 w-5" />

            <div className="text-left">
              <p className="font-semibold">
                {itemsCount} Item{itemsCount > 1 && "s"}
              </p>

              <p className="text-sm text-muted-foreground">
                Rs {total}
              </p>
            </div>
          </div>

          {open ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="border-t p-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}