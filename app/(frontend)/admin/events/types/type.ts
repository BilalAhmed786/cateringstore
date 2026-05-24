export interface UseEventsOptions {
  page: number;
  limit: number;
  search?: string;
}

export interface EventsResponse {
  total: number;
  events: Event[];
}

