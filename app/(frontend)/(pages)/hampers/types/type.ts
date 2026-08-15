export interface GetHamperReviewsResponse {
  reviews: HamperReview[];
  totalReviews: number;
  averageRating: number;
  canReview: boolean;
}

export interface HamperReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
  };
}