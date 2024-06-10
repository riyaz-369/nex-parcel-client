import { CgLogOut } from "react-icons/cg";
import useLogOut from "../../hooks/useLogOut";

const LogOutBtn = () => {
  const handleLogOut = useLogOut();

  return (
    <div
      onClick={handleLogOut}
      className="hover:bg-[#F43F5E] py-2 hover:bg-opacity-10"
    >
      <button className="flex items-center gap-2 font-bold text-[#F43F5E] mx-3 ">
        <span>
          <CgLogOut size={24} />
        </span>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default LogOutBtn;
