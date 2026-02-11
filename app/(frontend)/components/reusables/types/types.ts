import { LucideIcon } from "lucide-react"
import { FieldValues } from "react-hook-form";
import React from "react";
import { Button } from "@/app/(frontend)/components/ui/button";


export type FieldConfig = {
  type: "email" | "password" |"text" | "number" | "select" | "checkbox" | "radio" | "date" | "file" | "textarea" | "imagepreview";
  name: string;
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  accept?: string;
  required?: boolean;
  multiple?: boolean;
  className?:string;
  dragdrop?:string;
  images?: { id: string; url: string }[];
  onDelete?: (id: string) => void;
  onUpload?: (files: File[]) => void;
  isDeleting?: boolean;
  onChange?: (value:number) => void; 

};

export interface ImagePreviewFieldProps {
  images: { id: string; url: string }[];
  onDelete: (imageId: string) => void;
  isDeleting?: boolean;
}


export interface DynamicShadcnFormProps{
 
  fields: FieldConfig[];
  cardTitle: string;
  cardDescription?: string;
  className?: string;
  reset: string;
  showreset?:boolean;
  submitLabel: string;
  defaultvalues:FieldValues;
  onSubmit: (data: FieldValues) => void;
}
export interface CheckboxProps {
  name: string;
  label: string;
}

export interface FieldProps {
  field: FieldConfig;
}
export interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type:"email" | "password" |"text" | "number" | "select" | "checkbox" | "radio" | "date" | "file" | "textarea" | "imagepreview";
  className?:string
  
}
export interface SelectInputProps {
  name: string;
  label: string;
  options?: { label: string; value: string }[];
}
export interface FileUploadInputProps {
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  className?: string; // for image previews
  dragdrop?: string; // for drag area styling
  onUpload?: (files: File[]) => void;
}

export interface UniButtonProps extends React.ComponentProps<typeof Button> {
  label?: string;
  loading?: boolean;
  loadingLabel?: string;
  icon?: React.ReactNode;
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


