export interface MenuItemReview {
  id: string;
  rating: number;
  comment: string | null;
  user: {
    id: string;
    name: string | null;
  };
}

export interface MenuItemReviewsResponse {
  reviews: MenuItemReview[];
  totalReviews: number;
  averageRating: number;
  canReview: boolean;
}