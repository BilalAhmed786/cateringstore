import { LucideIcon } from "lucide-react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import React from "react";
import { Button } from "@/app/(frontend)/components/ui/button";
import { PackageMenuItem } from "@/app/(frontend)/admin/packages/types/type";
import { Category } from "@/app/(frontend)/admin/menu-items/types/types";


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
  image?:string | null;
  onDelete?: (id: string) => void;
  onUpload?: (files: File[]) => void;
  isDeleting?: boolean;
  onChange?: (value:number) => void; 

};

export interface metadataprop{

  title?:string
  desc?:string
  classname?:string

}

export interface ImagePreviewFieldProps {
   images: { id: string; url: string }[];
   image?: string; 
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


export interface AppCarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;

  itemClassName?: string;
  className?: string;

  autoplay?: boolean;
  delay?: number;
  loop?: boolean;

  showArrows?: boolean;
  previousClassName?: string;
  nextClassName?: string;
}


  export type GridSelectableItem = {
  id: string;
  title?: string;
  name?:string;
  price: number;
  finalPrice?:number;
  image?:string;
  images?: { url: string }[];
  available?: boolean;
  averageRating?: number; 
  totalReviews?: number;  
  totalComments?:number
 };

export interface Dropdowitems {
  items?: GridSelectableItem[];
  isLoading?: boolean;
  selectable: boolean;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string, available: boolean) => void;
  onSelect?: (item: GridSelectableItem) => void;
 
}
export interface CartItem extends GridSelectableItem {
  quantity: number;
}

export interface EntityCartProps {
  title?: string;
  items: CartItem[];
  onChange: (items: CartItem[]) => void;
  showTotal?: boolean;
}

export interface DynamicFormFieldsProps {
  fields: FieldConfig[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export interface DropdownAction {
  label: string;
  icon?: React.ComponentType;
  onClick: () => void;
  variant?: "danger" | "default";
  show?: boolean; // optional, if false, don't show
}

export interface MenuItemDropdownProps {
  actions: DropdownAction[];
}


type FilterValue = string;
export interface ItemsFiltersProps {
  status: FilterValue;
  category: FilterValue;
  dateFilter: FilterValue;
  search: string;
  categories: Category[];

  onStatusChange: (value: FilterValue) => void;
  onCategoryChange: (value: FilterValue) => void;
  onDateChange: (value: FilterValue) => void;
  onSearchChange: (value: string) => void;
}

export interface menuitembrowser {
  showFilters?: boolean;
  selectable?: boolean;
  onSelectItem?: (item: GridSelectableItem) => void;
}
export type RatingSummaryProps = {
  rating?: number;
  count?: number;
};
export interface EntityItem {
  id: string
  name: string
  description?: string
  originalPrice: number
  finalPrice: number
  available: boolean
}

export interface EntityAction{
  label: string
  onClick: () => void
  variant?: "danger"
  show?: boolean
}
export interface Etitygrid{
  items: EntityItem[]
  isLoading?: boolean
  getActions: (item: EntityItem) => EntityAction[]
}


export interface MenuItemDetailProps {
  items: PackageMenuItem[] | undefined;
}