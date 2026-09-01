export type ReviewType =
  | "MENU"
  | "PACKAGE"
  | "EVENT"
  | "HAMPER";

export interface ClientReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  type: ReviewType;
  item: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface ClientReviewsResponse {
  reviews: ClientReview[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetMyReviewsParams {
  search?: string;
  type?: ReviewType | "ALL";
  page?: number;
  limit?: number;
}