import { FieldValues } from "react-hook-form";

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  user: {
    id: string;
    name: string | null;
  };
}

export interface ReviewSectionProps {
  reviews: Review[];
  canReview: boolean;
  onSubmit?: (formData: FieldValues) => Promise<void>;
  title?: string;
}