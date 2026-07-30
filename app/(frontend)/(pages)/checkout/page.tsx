import { CheckoutForm } from "./components/CheckoutForm";
import { OrderSummary } from "./components/OrderSummary";


export default function CheckoutPage() {

  return (
    <div className="container mx-auto py-10">

      <h1 className="mb-8 text-3xl font-bold">
        Checkout
      </h1>


      <div className="grid gap-8 lg:grid-cols-3">


        <div className="lg:col-span-2">

          <CheckoutForm />

        </div>


        <OrderSummary />


      </div>

    </div>
  );
}