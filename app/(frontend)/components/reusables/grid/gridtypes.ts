export interface GridItem {
  id: string;
  title?: string;
  name?: string;
  description?:string;
  images?: { url: string }[];
  image?: string;
  available?: boolean;
  originalPrice?: number;
  price?:number;
  finalPrice?: number;
  averageRating?: number;
  totalReviews?: number;
  totalComments?: number;
}
export interface DropdownAction {
  label: string;
  icon?: React.ComponentType;
  onClick: () => void;
  variant?: "default" | "danger";
}

export interface EntityGridProps {
  items: GridItem[];
  isLoading?: boolean;
  selectable?: boolean;
  onSelect?: (item: GridItem) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string, available?: boolean) => void;
  renderPrice?: (item: GridItem) => React.ReactNode;
  renderMeta?: (item: GridItem) => React.ReactNode;
  actions?: (item: GridItem) => DropdownAction[];
};


