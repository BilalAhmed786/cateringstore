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
  limit?:number
}

export type EventMenuItem = {
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

export type EventPackage = {
  id: string;
  eventId: string;
  packageId: string;
  quantity: number;
  package: {
    id: string;
    name:string;
    finalPrice:number;
    image:string    

  };
};

export type Event = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  publicId: string | null;
  available: boolean;
  categoryId: string;
  createdAt: string;

  category: {
    id: string;
    name: string;
    image: string;
    publicId: string;
    createdAt: string;
  };

  menuItems: EventMenuItem[];
  packages: EventPackage[];
};