export type TastingInquiryStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface ClientTastingInquiry {
  id: string;
  eventType: string;
  guests: string;
  date: string;
  time: string;
  foodPreferences: string[];
  name: string;
  email: string;
  phone: string;
  message: string | null;
  status: TastingInquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ClientTastingInquiriesResponse {
  inquiries: ClientTastingInquiry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetMyTastingInquiriesParams {
  search?: string;
  status?: TastingInquiryStatus | "ALL";
  page?: number;
  limit?: number;
}
