export type ReviewType =
  | "MENU_ITEM"
  | "PACKAGE"
  | "EVENT"
  | "HAMPER";

export type ReviewParams = {
  page: number;
  limit: number;
  search: string;
  rating?: number;
  type?: ReviewType;
};

export type AdminReview = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;

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
};