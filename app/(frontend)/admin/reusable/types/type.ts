  import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { Category } from "../../menu-items/types/types";
  import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
  export type GridSelectableItem = {
  id: string;
  title: string;
  price: number;
  images?: { url: string }[];
  available: boolean;
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
