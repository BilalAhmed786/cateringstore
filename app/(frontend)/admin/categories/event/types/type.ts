export interface EventcategoryParams {
  page: number;
  limit: number;
  search?: string;
}
export interface Eventcategory {
  id: string
  name: string
  image?:string
  createdAt: Date
}

export interface EventCategoryResponse {
  total: number;
  categories: Eventcategory[];
}