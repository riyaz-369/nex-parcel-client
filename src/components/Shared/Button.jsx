const Button = ({ btnText, wFull }) => {
  return (
    <button
      className={`bg-[#F43F5E] border-none hover:bg-[#E3344D] text-white py-3
      px-[20px] md:py-[10px] transition duration-300 rounded text-sm sm:text-base md:text-lg ${
        wFull && "w-full"
      }`}
    >
      <span>{btnText}</span>
    </button>
  );
};

export default Button;
