import { Stripe } from "@stripe/stripe-js";

export interface CheckoutCustomer {
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface CreatePaymentIntentRequest {
  customer: CheckoutCustomer;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}

export interface UseCheckoutReturn {
  loading: boolean;
  clientSecret: string;
  handleCheckout: (
    customer: CheckoutCustomer
  ) => Promise<void>;
  stripePromise: Promise<
    import("@stripe/stripe-js").Stripe | null
  >;
}


export interface StripePaymentProps {
  stripePromise: Promise<Stripe | null>;
  clientSecret: string;
}
