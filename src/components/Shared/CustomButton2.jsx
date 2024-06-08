const CustomButton2 = ({
  btnText,
  wFull,
  pxLg,
  icon: Icon,
  btnSm,
  setIsOpen,
  handleAssign,
}) => {
  return (
    <button
      onClick={() => {
        setIsOpen(false);
        handleAssign();
      }}
      className={`relative border-none border-4 bg-[#F43F5E] hover:bg-[#111827] text-white disabled:cursor-not-allowed disabled:bg-opacity-40 flex h-[50px] items-center justify-center
      overflow-hidden shadow-xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#111827] before:duration-500 before:ease-out hover:shadow-[#11182760] hover:before:h-24 hover:before:w-24 ${
        btnSm
          ? "py-[2px] px-[10px] text-base"
          : "py-3 md:py-[10px] text-base md:text-lg"
      }  ${pxLg ? "px-10" : "px-5"} transition duration-300 rounded-full ${
        wFull && "w-full"
      }`}
    >
      <span className="flex items-center justify-center gap-1 relative z-10">
        <span className="text-md md:text-xl">{Icon && <Icon />}</span>
        <span>{btnText}</span>
      </span>
    </button>
  );
};

export default CustomButton2;
