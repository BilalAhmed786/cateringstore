export interface CustomerOrder {
  id: string;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "COOKING"
    | "DELIVERED"
    | "CANCELLED";
  total: number;
  createdAt: string;
  paymentIntentId: string | null;
}

export interface Customer {
  id: string;
  name: string | null;
  email: string;
  role:string;
  phone: string | null;
  createdAt: string;

  _count: {
    orders: number;
  };
}

export interface GetCustomersResponse {
  customers: Customer[];
  total: number;
  page: number;
  limit: number;
}

export interface CustomerDetails extends Customer {
  orders: CustomerOrder[];
}