import useUser from "../../hooks/useUser";
import { MdDashboard } from "react-icons/md";
import ThemeInput from "../Theme/ThemeInput";
import LogOutBtn from "../Shared/LogOutBtn";
import DashboardBtn from "../Shared/DashboardBtn";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const { dbUser } = useUser();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div title={dbUser?.name} className="rounded-full">
          <img src={dbUser?.photoURL} />
        </div>
      </div>
      <div>
        <div tabIndex={0} className="relative inline-block dropdown-content">
          <div className="absolute right-0 z-20 w-72 py-2 mt-2 overflow-hidden origin-top-right rounded-lg shadow-xl bg-base-100">
            <Link
              to="/dashboard/profile"
              className="flex items-center p-3 -mt-2 transition-colors duration-300 transform hover:bg-[#F43F5E] hover:bg-opacity-10"
            >
              <img
                className="flex-shrink-0 object-cover mx-1 rounded-full w-12 h-12"
                src={dbUser?.photoURL}
              />
              <div className="mx-1">
                <h1 className="font-semibold">{dbUser?.name}</h1>
                <p className="text-sm">{dbUser?.email}</p>
              </div>
            </Link>
            <hr className="border-[#F43F5E]" />

            <div className="space-y-1 mt-4">
              {/* dashboard button */}
              <DashboardBtn homeBtn={false} icon={MdDashboard} />

              {/* LOGOUT BUTTON */}
              <LogOutBtn />

              {/* THEME CONTROLLER */}
              <div className="flex justify-between items-center px-4 py-2 hover:bg-[#F43F5E] hover:bg-opacity-10">
                <h4 className="font-bold">Theme</h4>
                <ThemeInput />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
