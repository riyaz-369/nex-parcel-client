import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const DashboardBtn = ({ homeBtn, icon: Icon }) => {
  const { role } = useUser();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (role === "Delivery Men") {
      navigate("/dashboard/my-delivery-list");
    } else if (role === "Admin") {
      navigate("/dashboard/statistic");
    } else {
      navigate("/dashboard/profile");
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className={`${
        homeBtn
          ? "hover:bg-none py-0"
          : "hover:bg-[#F43F5E] py-2 hover:bg-opacity-10"
      }`}
    >
      <button
        className={`flex items-center gap-2 font-bold ${
          homeBtn ? "hover:text-[#F43F5E] transition-all" : "mx-3"
        }`}
      >
        <span className="text-[22px]">{Icon && <Icon />}</span>

        <span>Dashboard</span>
      </button>
    </div>
  );
};

export default DashboardBtn;
