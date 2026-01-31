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

export interface MenuItem {
  id: string
  title: string
  description?: string
  price: number
  image?: string
  available: boolean
  category: Category
  surveys?: Survey[] 
  createdAt: string
}

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

export type StatusFilter = "all" | "active" | "inactive"
export type DateFilter = "all" | "7days"
