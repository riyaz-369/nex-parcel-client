import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import PaymentBtn from "../Shared/PaymentBtn";

const FormElement = ({ stripe, error, clientSecret }) => {
  const options = {
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
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Card Number</label>
        <CardNumberElement
          options={{
            options,
            showIcon: true,
          }}
          className="input-style"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Expiration Date</label>
        <CardExpiryElement options={options} className="input-style" />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">CVC</label>
        <CardCvcElement options={options} className="input-style" />
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <PaymentBtn
        stripe={stripe}
        clientSecret={clientSecret}
        btnText="Pay"
        wFull={true}
      />
    </div>
  );
};

export default FormElement;
