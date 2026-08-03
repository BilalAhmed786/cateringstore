
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(frontend)/components/ui/select"
import { Label } from "../../ui/label";
import { BaseSelectProps } from "../types/types";

export function BaseSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: BaseSelectProps) {
  return (
   <div className="flex flex-col gap-2 w-28">
  <Label className="ml-2">{label}</Label>

  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder={placeholder ?? `Select ${label}`} />
    </SelectTrigger>

    <SelectContent>
      {options.map((opt) => (
        <SelectItem key={opt.value} value={opt.value}>
          <span className="block w-52 truncate">
            {opt.label}
          </span>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
  )
}
