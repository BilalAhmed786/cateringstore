
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
    <div>
      <Label className="mb-2">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder ?? `Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
