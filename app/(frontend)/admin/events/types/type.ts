export interface Event {
  id: string;
  title: string;
  description: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: Date | string;
}

export interface UseEventsOptions {
  page: number;
  limit: number;
  search?: string;
}

export interface EventsResponse {
  total: number;
  events: Event[];
}

