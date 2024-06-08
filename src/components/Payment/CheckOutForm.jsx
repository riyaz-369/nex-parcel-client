import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const CheckOutForm = ({ price }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { handleSubmit } = useForm();

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

    const card = elements.getElement(CardElement);

    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment err:", error);
      setError(error);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, err } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );
    if (err) {
      toast.error(err);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handlePayment)}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <p className="text-red-600">{error}</p>
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="small-primary-btn"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
