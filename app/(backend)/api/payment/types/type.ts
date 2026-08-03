export interface CheckoutCustomer {
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface CheckoutSelectedItem {
  menuItemId: string;
  quantity: number;
}

export interface CheckoutItem {
  id: string;

  type:
    | "menuitem"
    | "package"
    | "hamper"
    | "event";

  quantity: number;

  // Only exists for customized packages
  selectedItems?: CheckoutSelectedItem[];
}

export interface CreatePaymentIntentRequest {
  customer: CheckoutCustomer;
  items: CheckoutItem[];
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}