export type TastingInquiryStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface TastingInquiry {
  id: string;
  userId: string;
  eventType: string;
  guests: string;
  date: string;
  time: string;

  foodPreferences: string[];

  name: string;
  email: string;
  phone: string;
  message?: string | null;

  status: TastingInquiryStatus;


  createdAt: string;
  updatedAt: string;
}

export interface GetTastingInquiriesResponse {
  success: boolean;
  message?: string;
  data: TastingInquiry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


export interface GetTastingInquiriesParams {
  search?: string;
  status?: string;
  page?: number;
  total?:number;
  limit?: number;
}