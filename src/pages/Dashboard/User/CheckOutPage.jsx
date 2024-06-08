import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../../components/Payment/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import "./payment.css";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckOutPage = () => {
  const location = useLocation();

  const price = location.state;

  return (
    <div>
      <h3 className="text-3xl font-semibold">Payment</h3>
      <Elements stripe={stripePromise}>
        <CheckOutForm price={price} />
      </Elements>
    </div>
  );
};

export default CheckOutPage;
