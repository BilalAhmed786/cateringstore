export type ReviewType =
  | "MENU_ITEM"
  | "PACKAGE"
  | "EVENT"
  | "HAMPER";

export interface AdminReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;

  type: ReviewType;

  customer: {
    id: string;
    name: string | null;
    email: string;
  };

  product: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface GetReviewsResponse {
  reviews: AdminReview[];
  total: number;
  page: number;
  limit: number;
}