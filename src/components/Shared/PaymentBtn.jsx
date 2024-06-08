const PaymentBtn = ({
  btnText,
  wFull,
  icon: Icon,
  loading,
  stripe,
  clientSecret,
}) => {
  return (
    <button
      disabled={!stripe || !clientSecret}
      className={`bg-[#F43F5E] relative rounded-full border-none border-4 hover:bg-[#111827] text-white disabled:cursor-not-allowed disabled:bg-opacity-40 flex h-[50px] items-center justify-center
      overflow-hidden shadow-xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#111827] before:duration-500 before:ease-out hover:shadow-[#11182760] hover:before:h-24 hover:before:w-24
       ${wFull && "w-full"}`}
    >
      <span className="flex items-center justify-center gap-1 relative z-10">
        <span className={`text-md md:text-xl ${loading && "animate-spin"}`}>
          {Icon && <Icon />}
        </span>
        <span>{btnText}</span>
      </span>
    </button>
  );
};

export default PaymentBtn;
