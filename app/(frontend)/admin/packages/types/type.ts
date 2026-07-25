import { images } from "../../menu-items/types/types";

export interface MenuItem {
  id: string;
  title:string;
  name?: string;
  description?:string;
  price?: number;
  images:images[]
  
}
export interface PackageItemsFieldProps {
  menuItems: MenuItem[];
  name: string;
}

export interface SelectedItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PackageFilters{
  status?: string;
  dateFilter?:string;
  search?: string;
  page?: number;
  limit?: number;
};


export interface PackageMenuItem {
  id: string;           
  packageId?: string;
  menuItemId: string;  
  quantity: number;      
  menuItem: MenuItem;    
}
export interface PackageReview {
  id: string;
  rating: number;
  comment?: string;

  user: {
    id: string;
    name: string;
  };
}

export interface Package {
  id: string;
  name: string;
  description: string;
  available: boolean;
  createdAt: string;
  discountType: string;
  discountValue: number; 
  originalPrice: number;
  finalPrice: number;
  image: string;
  items: PackageMenuItem[];
  averageRating: number;
  totalReviews: number;
  canReview: boolean;
  reviews: PackageReview[];
}