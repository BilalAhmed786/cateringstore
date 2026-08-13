export type CommonFilters = {
  status?: string | null;
  search?: string | null;
  dateFilter?: string | null;
  category?: string | null;
};

export interface ReviewFilters {
  rating?: string;
  sort?: "asc" | "desc";
  dateFilter?: "all" | "today" | "past7" | "past30";
}
