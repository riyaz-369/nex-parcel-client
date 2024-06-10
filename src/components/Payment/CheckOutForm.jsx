import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import FormElement from "./FormElement";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ price }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price,
      });
      setClientSecret(data.clientSecret);
    };
    if (price > 0) {
      getData();
    }
  }, [price, axiosSecure]);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const card = elements.getElement(CardNumberElement);

    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: user?.email || "anonymous",
        name: user?.displayName || "anonymous",
      },
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      console.log("Payment method:", paymentMethod);
      setError("");
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      toast.error(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        navigate("/dashboard/payment-success", {
          state: { transactionId: paymentIntent?.id },
        });
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 shadow-md rounded-lg">
      <form onSubmit={handleSubmit(handlePayment)}>
        <h3 className="text-2xl font-medium mb-8">
          Payment Your Delivered Parcel
        </h3>
        <FormElement
          clientSecret={clientSecret}
          error={error}
          stripe={stripe}
        />
      </form>
    </div>
  );
};

export default CheckOutForm;
