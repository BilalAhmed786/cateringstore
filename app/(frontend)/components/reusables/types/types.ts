import { LucideIcon } from "lucide-react"
import { FieldValues } from "react-hook-form";
export type FieldConfig = {
  type: "email" | "password" |"text" | "number" | "select" | "checkbox" | "radio" | "date" | "file" | "textarea";
  name: string;
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  accept?: string;
  multiple?: boolean;
  className?:string
  dragdrop?:string
};
export interface DynamicShadcnFormProps{
 
  fields: FieldConfig[];
  cardTitle: string;
  cardDescription?: string;
  className?: string;
  reset: string;
  submitLabel: string;
  defaultvalues:FieldValues;
  onSubmit: (data: FieldValues) => void;
}

export interface NavItemProps {
  open: boolean
  icon: LucideIcon
  label: string
  href: string
}

export interface SubNavProps {
  icon: LucideIcon
  label: string
  href: string
}

export interface paginationProps {
  page: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}



export interface MenuItemsTableProps<T> {
  items: T[];
  isLoading: boolean;
  columns: { header: string; accessor: (item: T) => React.ReactNode }[];
}

 export interface BaseSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  placeholder?: string
}


export interface BaseSearchProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?:string
}
