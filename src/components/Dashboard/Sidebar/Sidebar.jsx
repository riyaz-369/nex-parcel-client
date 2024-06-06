import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FiAlignRight } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import NavLinkSidebar from "../../Shared/NavLinkSidebar";
import { CgLogOut, CgProfile } from "react-icons/cg";

import ThemeInput from "../../Theme/ThemeInput";
import UserNavLinks from "./NavLinks/UserNavLinks";
import DeliverymenNavLinks from "./NavLinks/DeliverymenNavLinks";
import AdminNavLinks from "./NavLinks/AdminNavLinks";
import HeaderLink from "../../Shared/HeaderLink";
import useUser from "../../../hooks/useUser";
import useLogOut from "../../../hooks/useLogOut";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const { role } = useUser();
  const handleLogOut = useLogOut();

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold"></div>
        </div>
        <button
          onClick={handleToggle}
          className="p-3 focus:outline-none focus:bg-base-200"
        >
          {isActive ? <FiAlignRight size={25} /> : <RxCross2 size={25} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-200 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full md:flex px-4 py-2 shadow-lg">
              <HeaderLink />
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* USERS */}
              {role === "User" && <UserNavLinks />}

              {/* DELIVERY MAN */}
              {role === "Delivery Men" && <DeliverymenNavLinks />}

              {/* ADMIN */}
              {role === "Admin" && <AdminNavLinks />}
            </nav>
          </div>
        </div>
        <div>
          <hr />
          <nav>
            {/* COMMON */}
            <ul className="flex gap-3 my-4 ml-3">
              <ThemeInput />
              <p className="font-bold">Theme</p>
            </ul>
            <NavLinkSidebar address="" label="My Profile" icon={CgProfile} />
            <NavLinkSidebar
              label="Logout"
              icon={CgLogOut}
              handleLogOut={handleLogOut}
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
