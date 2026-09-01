
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COOKING"
  | "DELIVERED"
  | "CANCELLED";

export interface ClientOrderListItem {
  id: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
}

export interface ClientOrdersResponse {
  orders: ClientOrderListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/* =========================
   Single Order
========================= */

export interface ClientOrderMenuItem {
  id: string;
  quantity: number;
  price: number;
  menu: {
    id: string;
    title: string;
    images: {
      url: string;
    }[];
  };
}

export interface ClientOrderPackage {
  id: string;
  quantity: number;
  price: number;
  package: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface ClientOrderHamper {
  id: string;
  quantity: number;
  price: number;
  hamper: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface ClientOrderEvent {
  id: string;
  quantity: number;
  price: number;
  event: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface ClientOrder {
  id: string;
  total: number;
  status: OrderStatus;
  createdAt: string;

  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  notes: string | null;

  items: ClientOrderMenuItem[];
  orderPackages: ClientOrderPackage[];
  orderHampers: ClientOrderHamper[];
  orderEvents: ClientOrderEvent[];
}

export interface GetClientOrderResponse {
  order: ClientOrder;
}

