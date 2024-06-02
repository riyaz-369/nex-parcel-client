import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FiAlignRight } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import NavLinkSidebar from "../../Shared/NavLinkSidebar";
import { BsPostcard, BsBox2 } from "react-icons/bs";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { FaListCheck } from "react-icons/fa6";
import { MdOutlineReviews } from "react-icons/md";
import { BsInboxes } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const { logOut } = useAuth();

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
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-200 w-72 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full md:flex px-4 py-2 shadow-lg">
              <Link to="/" className="flex items-center gap-3">
                <img
                  className="md:block"
                  src="./logo.png"
                  alt="logo"
                  width="40"
                />
                <h3 className="text-2xl lg:text-3xl font-semibold">
                  NexParcel
                </h3>
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* USERS */}
              <NavLinkSidebar
                address="book-parcel"
                label="Book a Parcel"
                icon={BsPostcard}
              />
              <NavLinkSidebar
                address="my-parcel"
                label="My Parcel"
                icon={BsBox2}
              />
              {/* DELIVERY MAN */}
              <NavLinkSidebar
                address="my-delivery-list"
                label="My Delivery Lists"
                icon={FaListCheck}
              />
              <NavLinkSidebar
                address="my-reviews"
                label="My Reviews"
                icon={MdOutlineReviews}
              />
              {/* ADMIN */}
              <NavLinkSidebar
                address="statistics"
                label="Statistics"
                icon={BsGraphUpArrow}
              />
              <NavLinkSidebar
                address="all-parcel"
                label="All Parcel"
                icon={BsInboxes}
              />
              <NavLinkSidebar
                address="all-users"
                label="All Users"
                icon={FaUsers}
              />
              <NavLinkSidebar
                address="all-delivery-men"
                label="All Delivery Men"
                icon={FaPeopleCarry}
              />
            </nav>
          </div>
        </div>
        <div>
          <hr />
          <nav>
            {/* COMMON */}
            <NavLinkSidebar address="" label="My Profile" icon={CgProfile} />
            <NavLinkSidebar label="Logout" icon={CgLogOut} />
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
