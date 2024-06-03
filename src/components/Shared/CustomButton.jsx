const CustomButton = ({
  btnText,
  wFull,
  pxLg,
  icon: Icon,
  btnSm,
  setIsOpen,
}) => {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className={`bg-[#F43F5E] border-none hover:bg-[#E3344D] text-white ${
        btnSm
          ? "py-[2px] px-[10px] text-base"
          : "py-3 md:py-[10px] text-base md:text-lg"
      }  ${pxLg ? "px-10" : "px-5"} transition duration-300 rounded-full ${
        wFull && "w-full"
      }`}
    >
      <span className="flex items-center gap-1">
        <span className="text-md md:text-xl">{Icon && <Icon />}</span>
        <span>{btnText}</span>
      </span>
    </button>
  );
};

export default CustomButton;
