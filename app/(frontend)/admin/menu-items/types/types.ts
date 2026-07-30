
import { GridItem } from "../../../components/reusables/grid/gridtypes";
export interface Survey {
  id: string;
  userId: string;
  menuItemId: string;
  rating: number;
  comment?: string;
  orderId?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface images {
  id: string;
  url: string;
  menuItemId: string;
  publicId: string;
}

export interface ReviewUser {
  id: string;
  name: string;
}

export interface MenuItemReview {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  user: ReviewUser;
}

export interface MenuItem {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  quantity:number;
  images: images[];
  menuItem?: {
        id: string;
        title?: string;
        price?: number;
    };
  available: boolean;
  category: Category;
  reviews: MenuItemReview[];
  averageRating: number;
  totalReviews: number;
  canReview: boolean;
  createdAt: string;
}

export type existingimage = {
  images: { id: string; url: string }[];
  onDelete: (id: string) => void;
  isDeleting?: boolean;
};

export interface CreateMenuItemPayload {
  title: string;
  price: number;
  categoryId: string;
  available: boolean;
}

export interface MenuItemsFilters {
  status?: string;
  category?: string;
  search?: string;
  dateFilter?: string;

  page?: number;
  limit?: number;

  // New
  minPrice?: number;
  maxPrice?: number;
  sort?: "asc" | "desc";
}
export interface UploadMenuItemImagesPayload {
  menuItemId: string;
  image: File[];
}

export interface MenuItemBrowserProps {
  showFilters?: boolean;
  selectable?: boolean;
  onSelectItem?: (item: GridItem) => void;
}

export type StatusFilter = "all" | "active" | "inactive";
export type DateFilter = "all" | "7days";
