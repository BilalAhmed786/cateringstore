"use client";

import { Minus, Plus } from "lucide-react";
import { QuantitySelectorProps } from "./gridtypes";
import { UniButton } from "../button/button";

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <UniButton
        type="button"
        size="icon"
        variant="outline"
        onClick={onDecrease}
        className="h-8 w-8"
        icon={<Minus className="h-4 w-4" />}
      />

      <span className="min-w-6 text-center font-medium">
        {quantity}
      </span>

      <UniButton
        type="button"
        size="icon"
        variant="outline"
        onClick={onIncrease}
        className="h-8 w-8"
        icon={<Plus className="h-4 w-4" />}
      />
    </div>
  );
}