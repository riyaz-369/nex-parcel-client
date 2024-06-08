import { Link } from "react-router-dom";

const ReviewAndPay = ({ setIsOpen, price }) => {
  return (
    <div className="flex gap-2">
      <button onClick={() => setIsOpen(true)} className="small-secondary-btn">
        Review
      </button>
      <Link
        to="/dashboard/checkout"
        state={price}
        title="Payment"
        className="small-primary-btn"
      >
        Pay
      </Link>
    </div>
  );
};

export default ReviewAndPay;
