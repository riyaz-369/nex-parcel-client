const ReviewAndPay = () => {
  return (
    <div className="flex gap-2">
      <button className="text-green-400 btn btn-sm disabled:cursor-not-allowed disabled:text-opacity-40">
        Review
      </button>
      <button
        title="Cancel Booking"
        className="text-red-400 btn btn-sm disabled:cursor-not-allowed disabled:text-opacity-40"
      >
        Pay
      </button>
    </div>
  );
};

export default ReviewAndPay;
