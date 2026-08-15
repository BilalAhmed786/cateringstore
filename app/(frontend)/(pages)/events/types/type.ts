import { Event } from "@/app/(frontend)/admin/events/types/type";
import { Review } from "@/app/(frontend)/components/reusables/reviewsection/type";
import { FieldValues } from "react-hook-form";

export interface EventDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  data?: Event;
  isLoading: boolean;

  // Reviews
  reviewData?: {
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
    canReview: boolean;
  };

  isReviewsLoading: boolean;

  // Review filters
  rating: string;
  sort: "asc" | "desc";

  onRatingChange: (value: string) => void;
  onSortChange: (value: "asc" | "desc") => void;

  // Create review
  onReviewSubmit: (formData: FieldValues) => Promise<void>;
  
}

export interface GetEventReviewsParams {
  selectedEventId?: string | null;
  rating?: string;
  sort?: "asc" | "desc";
}

export interface EventReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
  };
}

export interface EventReviewResponse {
  reviews: EventReview[];
  totalReviews: number;
  averageRating: number;
  canReview: boolean;
}