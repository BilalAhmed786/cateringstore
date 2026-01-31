"use client"

import { Label } from "@/app/(frontend)/components/ui/label"

interface BaseSearchProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function BaseSearch({ label, value, onChange, placeholder }: BaseSearchProps) {
  return (
    <div className="flex flex-col">
      <Label className="mb-2">{label}</Label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? `Search ${label}`}
        className="border rounded px-3 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
    </div>
  )
}
