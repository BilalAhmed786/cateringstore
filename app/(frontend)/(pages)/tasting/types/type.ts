export type TastingInquiryStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface TastingInquiry {
  id: string;

  name: string;
  email: string;
  phone: string;

  eventType: string;
  guests: string;

  date: string;
  time: string;

  foodPreferences: string[];
  message: string;

  status: TastingInquiryStatus;

  createdAt: string;
  updatedAt: string;
}

export interface GetSingleTastingInquiryResponse {
  success: boolean;
  message?: string;
  data: TastingInquiry;
}

export interface UpdateTastingInquiryResponse {
  success: boolean;
  message: string;
  data: TastingInquiry;
}