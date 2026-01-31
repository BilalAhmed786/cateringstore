export interface Category {
  id: string
  name: string
}

export interface MenuItem {
  id: string
  title: string
  price: number
  available: boolean
  createdAt: string
  category: Category
}

export interface CreateMenuItemPayload {
  title: string
  price: number
  categoryId: string
  available: boolean
}

export type StatusFilter = "all" | "active" | "inactive"
export type DateFilter = "all" | "7days"
