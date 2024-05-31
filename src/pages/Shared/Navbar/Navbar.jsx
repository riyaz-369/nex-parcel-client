import { FiAlignLeft } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const activeStyle =
    "font-bold text-base text-green-500 flex items-center gap-1";
  const deActiveStyle = "transition-all font-bold flex items-center gap-1";

  const user = null;

  const navLinks = (
    <>
      <NavLink
        to="/"
        title="Home"
        className={({ isActive }) => (isActive ? activeStyle : deActiveStyle)}
      >
        Home
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? activeStyle : deActiveStyle)}
      >
        Dashboard
      </NavLink>
      {!user ? (
        <div className="space-y-3 lg:hidden">
          <Link to="/log-in" className="primary-btn">
            Login
          </Link>
        </div>
      ) : (
        <Link className="flex items-center gap-1 px-1 py-2 rounded-lg text-base transition-colors duration-300 transform hover:bg-gray-700 text-[#cf7a4f] font-bold lg:hidden">
          <span className="text-xl">
            <CgLogOut />
          </span>
          <span className="">Logout</span>
        </Link>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 py-2 bg-base-100 shadow-md">
      <div>
        <div className="navbar max-w-7xl mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <span className="text-xl">
                  <FiAlignLeft />
                </span>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-10 p-6 shadow w-52 space-y-6 bg-[#1A1A1A] text-gray-200 rounded-lg"
              >
                {navLinks}
              </ul>
            </div>
            <Link
              title="NexParcel - Home"
              className="text-xl md:text-3xl font-bold flex items-center gap-2"
            >
              <img className="w-7 md:w-9" src="" />
              <h1>NexParcel</h1>
            </Link>
          </div>
          <div className="navbar-end flex gap-12">
            <div className="hidden lg:flex">
              <ul className="menu menu-horizontal px-1 text-base space-x-8">
                {navLinks}
              </ul>
            </div>
            <div className="flex items-center gap-2">
              {/* theme controller */}
              {/* conditional user profile */}
              {!user ? (
                <div className="space-x-3 hidden lg:flex">
                  <Link to="/log-in" className="btn">
                    Login
                  </Link>
                </div>
              ) : (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div title={user?.displayName} className="rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                  <div>
                    <div
                      tabIndex={0}
                      className="relative inline-block dropdown-content"
                    >
                      <div className="absolute right-0 z-20 w-72 py-2 mt-2 overflow-hidden origin-top-right rounded-lg shadow-xl">
                        <div className="flex items-center p-3 -mt-2 transition-colors duration-300 transform text-gray-200 hover:bg-gray-700 hover:text-white">
                          <img
                            className="flex-shrink-0 object-cover mx-1 rounded-full w-12 h-12"
                            src={user?.photoURL}
                          />
                          <div className="mx-1">
                            <h1 className="font-semibold text-gray-200">
                              {user?.displayName}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {user?.email}
                            </p>
                          </div>
                        </div>

                        <hr className="border-[#553739]" />

                        <Link
                          to="/dashboard"
                          className="flex items-center p-3 text-base transition-colors duration-300 font-medium transform text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <MdDashboard size={25} />
                          <span className="mx-2">Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-2 p-3 text-base transition-colors duration-300 transform hover:bg-gray-700 text-[#cf7a4f] font-bold">
                          <span>
                            <CgLogOut size={25} />
                          </span>
                          <span>Logout</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
