

export interface AdminOrderListItem {
  id: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;

  user: {
    id: string;
    name: string | null;
    email: string;
  } | null;
}

export interface GetOrdersResponse {
  orders: AdminOrderListItem[];
  total: number;
}

export interface GetOrderprops{
  page: number;
  limit: number;
  search: string;
  status: string;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COOKING"
  | "DELIVERED"
  | "CANCELLED";




  export interface OrderMenuItem {
  id: string;
  orderId: string;
  menuId: string;
  quantity: number;
  price: number;

  menu: {
    id: string;
    title: string;
    price: number;
    images: {
      url: string;
    }[];
  };
}

export interface OrderPackage {
  id: string;
  orderId: string;
  packageId: string;
  quantity: number;
  price: number;

  package: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface OrderEvent {
  id: string;
  orderId: string;
  eventId: string;
  quantity: number;
  price: number;

  event: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface OrderHamper {
  id: string;
  orderId: string;
  hamperId: string;
  quantity: number;
  price: number;

  hamper: {
    id: string;
    name: string;
    image: string | null;
  };
}
export interface Order {
  id: string;
  userId: string | null;
  status: OrderStatus;
  total: number;
  createdAt: string;

  guestEmail: string | null;
  guestName: string | null;
  guestPhone: string | null;
  notes: string | null;

  paymentIntentId: string | null;

  user: {
    id: string;
    name: string | null;
    email: string;
  } | null;

  items: OrderMenuItem[];
  orderPackages: OrderPackage[];
  orderEvents: OrderEvent[];
  orderHampers: OrderHamper[];
}

export interface OrderItemDisplay {
  id: string;
  title: string;
  image?: string | null;
  quantity: number;
  price: number;
}

export interface orderItemProps {
  title: string;
  items: OrderItemDisplay[];
}