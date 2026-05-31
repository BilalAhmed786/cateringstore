import { MenuItem } from "../../packages/types/type";


export interface HamperFilters {
  status?: string;
  search?: string;
  dateFilter?: string;
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
export interface Hampers {
  id: string;
  name: string;
  description: string;
  categoryId:string;
  category:Hampercategory;
  available: boolean;
  createdAt: string;
  discountType: string;
  discountValue: number;
  finalPrice: number;
  originalPrice: number;
  image: string | null;
  items: HampereMenuItem[];
}