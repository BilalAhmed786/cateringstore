"use client"
import { Label } from "@/app/(frontend)/components/ui/label"
import { BaseSearchProps } from "../types/types"
import { Input } from "../../ui/input"

export function BaseSearch({ label, value, onChange, placeholder,className }: BaseSearchProps) {
  return (
    <div className={className}>
      <Label className="mb-2">{label}</Label>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? `Search ${label}`}
        
      />
    </div>
  )
}
