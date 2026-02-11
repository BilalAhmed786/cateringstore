  import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { Category } from "../../menu-items/types/types";
  import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
  export type GridSelectableItem = {
  id: string;
  title: string;
  price: number;
  images?: { url: string }[];
  available: boolean;
  averageRating?: number;   // ⭐ new
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
export interface MenuItemsFiltersProps {
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