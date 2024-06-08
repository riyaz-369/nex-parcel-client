const ReviewAndPay = ({ setIsOpen }) => {
  return (
    <div className="flex gap-2">
      <button onClick={() => setIsOpen(true)} className="small-secondary-btn">
        Review
      </button>
      <button
        onClick={() => setIsOpen(true)}
        title="Cancel Booking"
        className="small-primary-btn"
      >
        Pay
      </button>
    </div>
  );
};

export default ReviewAndPay;
