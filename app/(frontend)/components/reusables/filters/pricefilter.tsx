"use client";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { PriceFilterProps } from "../types/types";


export function PriceFilter({
  label = "Price Range",
  value,
  min,
  max,
  step = 100,
  onChange,
}: PriceFilterProps) {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v as [number, number])}
      />

      <div className="flex justify-between  text-sm text-muted-foreground">
        <span>Rs {value[0]}</span>
        <span>Rs {value[1]}</span>
      </div>
    </div>
  );
}