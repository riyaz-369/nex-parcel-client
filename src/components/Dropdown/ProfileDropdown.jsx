import useAuth from "../../hooks/useAuth";
import NavLinkSidebar from "../Shared/NavLinkSidebar";
import { CgLogOut } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

const ProfileDropdown = () => {
  const { user } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div title={user?.displayName} className="rounded-full">
          <img src={user?.photoURL} />
        </div>
      </div>
      <div>
        <div tabIndex={0} className="relative inline-block dropdown-content">
          <div className="absolute right-0 z-20 w-72 py-2 mt-2 overflow-hidden origin-top-right rounded-lg shadow-xl bg-base-100">
            <div className="flex items-center p-3 -mt-2 transition-colors duration-300 transform hover:bg-[#111827]">
              <img
                className="flex-shrink-0 object-cover mx-1 rounded-full w-12 h-12"
                src={user?.photoURL}
              />
              <div className="mx-1 hover:text-white">
                <h1 className="font-semibold">{user?.displayName}</h1>
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
            <hr className="border-[#F43F5E]" />
            <NavLinkSidebar
              address="/dashboard"
              label="Dashboard"
              icon={MdDashboard}
            />
            <NavLinkSidebar label="Logout" icon={CgLogOut} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
