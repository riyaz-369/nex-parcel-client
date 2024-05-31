const Button = ({ btnText }) => {
  return (
    <button
      className={`bg-[#F43F5E] border-none hover:bg-[#E3344D] text-white py-3
      px-[20px] md:py-[10px] transition duration-300 rounded text-sm sm:text-base md:text-lg`}
    >
      <span>{btnText}</span>
    </button>
  );
};

export default Button;
