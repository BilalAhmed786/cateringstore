import { images } from "../../menu-items/types/types";
export interface UseEventsOptions {
  page: number;
  limit: number;
  search?: string;
}

export interface EventsResponse {
  total: number;
  events: Event[];
}

export interface eventFilters {
  status?: string;
  search?: string;
  category?:string;
  dateFilter?: string;
  page?:number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "asc" | "desc";
  limit?:number
}

export interface EventMenuItem{
  id: string;
  eventId: string;
  menuItemId: string;
  quantity: number;
  menuItem: {
    id: string;
    title: string;
    description: string;
    price: number;
    available: boolean;
    images: images[];
  };
};

export interface EventPackage{
  id: string;
  eventId: string;
  packageId: string;
  quantity: number;
  package: {
    id: string;
    name:string;
    description:string;
    finalPrice:number;
    image:string    

  };
};
export interface EventReview {
  id: string;
  rating: number;
  comment: string | null;

  user: {
    id: string;
    name: string;
  };
}

export interface EventCategory {
  id: string;
  name: string;
  image: string;
  publicId: string;
  createdAt: string;
}

export interface Event {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  publicId: string | null;

  originalPrice: number;
  discountType: string | null;
  discountValue: number | null;
  finalPrice: number;

  available: boolean;
  createdAt: string;

  categoryId: string;
  category: EventCategory;

  menuItems: EventMenuItem[];
  packages: EventPackage[];

  reviews: EventReview[];

  averageRating: number;
  totalReviews: number;
  totalComments: number;
  canReview: boolean;
}

export interface ToggleEventPayload{
  id: string;
  available?: boolean;
};
