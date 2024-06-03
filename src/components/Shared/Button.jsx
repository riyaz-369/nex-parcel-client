const Button = ({ btnText, wFull, pxLg }) => {
  return (
    <button
      className={`bg-[#F43F5E] border-none hover:bg-[#E3344D] text-white py-3 md:py-[10px] ${
        pxLg ? "px-10" : "px-5"
      } transition duration-300 rounded-full text-sm sm:text-base md:text-lg ${
        wFull && "w-full"
      }`}
    >
      <span>{btnText}</span>
    </button>
  );
};

export default Button;
