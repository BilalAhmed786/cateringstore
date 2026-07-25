import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";

export interface PackageItem {
  id: string;
  quantity: number;
  menuItem: GridItem;
}

export interface PackageType {
  id: string;
  name: string;
  description?: string;
  originalPrice: number;
  finalPrice: number;
  image?: string;
  publicId?: string;
  available: boolean;
  averageRating: number;
  totalReviews: number;
  items: PackageItem[];
}

export interface PackageFilters {
  search?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "asc" | "desc" | "";
}

export interface PackageCardProps {
  item: PackageType;

  onClick: () => void;

  onAddToCart: () => void;

  onCustomize: () => void;
}


export interface PackageCustomizeSheetProps {
  packageId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
