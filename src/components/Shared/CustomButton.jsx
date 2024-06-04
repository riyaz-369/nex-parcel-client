const CustomButton = ({
  btnText,
  wFull,
  pxLg,
  icon: Icon,
  btnSm,
  handleMakeAdmin,
  role,
  id,
}) => {
  return (
    <button
      disabled={role === "Delivery Men" || role === "Admin"}
      onClick={() => handleMakeAdmin(id)}
      className={`bg-[#F43F5E] border-none hover:bg-[#E3344D] text-white disabled:cursor-not-allowed disabled:bg-opacity-40 ${
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
