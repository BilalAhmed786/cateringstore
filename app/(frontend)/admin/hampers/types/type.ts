import { MenuItem } from "../../packages/types/type";


export interface HamperFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  status?: string;
  dateFilter?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "asc" | "desc";
}

export interface HampereMenuItem {
  id: string;           
  hamperId?: string;
  menuItemId: string;  
  quantity: number;      
  menuItem: MenuItem;    
}
export interface Hampercategory{
createdAt:string
id:string
image:string
name:string 
publicId:string

}

export interface HamperReview {
  id: string;
  rating: number;
  comment?: string;

  user: {
    id: string;
    name: string;
  };
}
export interface Hamper {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  category: Hampercategory;
  originalPrice: number;
  discountType: string ;
  discountValue: number;
  finalPrice: number;
  image: string | null;
  publicId: string | null;
  available: boolean;
  createdAt: string;
  items: HampereMenuItem[];
  reviews: HamperReview[];
  canReview: boolean;
  totalItems: number;
  averageRating: number;
  totalReviews: number;
  totalComments: number;
}