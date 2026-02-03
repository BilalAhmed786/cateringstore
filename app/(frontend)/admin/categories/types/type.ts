export interface Category {
  id: string
  name: string
  createdAt: Date
}
export interface UseCategoriesOptions {
  page: number;
  limit: number;
  search?: string;
}

export interface CategoryResponse {
  total: number;
  categories: Category[];
}