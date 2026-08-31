"use client";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { PriceFilterProps } from "../types/types";
import { useGetStoreSettings } from "@/app/(frontend)/admin/settings/store/hooks/useGetStoreSettings";

export function PriceFilter({
  label = "Price Range",
  value,
  min,
  max,
  step = 100,
  onChange,
}: PriceFilterProps) {
  const {data} = useGetStoreSettings()

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
        <span>{data?.store.currency} {value[0]}</span>
        <span>{data?.store.currency}  {value[1]}</span>
      </div>
    </div>
  );
}