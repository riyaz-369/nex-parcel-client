import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";

import checked from "../../../assets/icons/checked.png";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const transactionId = location?.state?.transactionId;

  const handleViewParcel = () => {
    navigate("/dashboard/my-parcel");
  };

  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Confetti
        drawShape={(ctx) => {
          ctx.beginPath();
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i;
            const x = (0.2 + 1.5 * angle) * Math.cos(angle);
            const y = (0.2 + 1.5 * angle) * Math.sin(angle);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.closePath();
        }}
      />
      <div className="max-w-md w-full shadow-md rounded-lg p-6 text-center">
        <img className="h-24 w-24 mx-auto mb-4" src={checked} alt="" />
        <h1 className="text-2xl font-semibold mb-4">Payment Successful!</h1>
        <p className="mb-6">
          Thank you for your payment. Your transaction ID is:
        </p>
        <div className="bg-green-400 bg-opacity-10 p-4 rounded-md mb-6">
          <p className="font-mono break-words">{transactionId}</p>
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={handleViewParcel} className="small-secondary-btn">
            Give Rating
          </button>
          <button onClick={handleBackToHome} className="small-primary-btn">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
