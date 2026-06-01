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