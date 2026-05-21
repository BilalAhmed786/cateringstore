export interface GridItem {
  id: string;
  title: string;
  name:string;
  images?: { url: string }[];
  event?:{id:string,status:string,title:string,description:string,createdAt:string}
  available: boolean;
  price: number;
  originalPrice?: number;
  finalPrice?: number;
  averageRating?: number;
  totalReviews?: number;
  totalComments?: number;
  
};
export interface DropdownAction {
  label: string;
  icon?: React.ComponentType;
  onClick: () => void;
  variant?: "default" | "danger" | "secondary";
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


