import { GridItem } from "../../reusable/grid/gridtypes"

export interface Survey {
  id: string
  userId: string
  menuItemId: string
  rating: number
  comment?: string
  orderId?: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
}

export interface images {
id:string
url:string
menuItemId:string
publicId:string
}

export interface MenuItem {
  id: string
  title: string
  description?: string
  price: number
  images: images[]
  available: boolean
  category: Category
  surveys?: Survey[] 
  createdAt: string
}

export type existingimage = {
  images: { id: string; url: string }[];
  onDelete: (id: string) => void;
  isDeleting?: boolean;
};

export interface CreateMenuItemPayload {
  title: string
  price: number
  categoryId: string
  available: boolean
}

export interface MenuItemsFilters {
  status?: string
  category?: string
  search?: string
  dateFilter?: string 
  page?: number
  limit?: number
}
export interface UploadMenuItemImagesPayload {
  menuItemId: string
  image: File[]
}


export interface MenuItemBrowserProps {
  showFilters?: boolean;
  selectable?: boolean;
  onSelectItem?: (item: GridItem) => void;
}

export type StatusFilter = "all" | "active" | "inactive"
export type DateFilter = "all" | "7days"
