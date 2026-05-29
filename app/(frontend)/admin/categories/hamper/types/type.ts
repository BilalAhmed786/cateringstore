export interface HampercategoryParams {
  page: number;
  limit: number;
  search?: string;
}
export interface Hampercategory {
  id: string
  name: string
  image?:string
  createdAt: Date
}

export interface HamperCategoryResponse {
  total: number;
  categories: Hampercategory[];
}