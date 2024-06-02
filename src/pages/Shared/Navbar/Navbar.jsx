import { FiAlignLeft } from "react-icons/fi";
import Button from "../../../components/Shared/Button";
import useAuth from "../../../hooks/useAuth";
import NavLinks from "../../../components/Shared/NavLinks";
import { Link } from "react-router-dom";
import ThemeInput from "../../../components/Theme/ThemeInput";
import ProfileDropdown from "../../../components/Dropdown/ProfileDropdown";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = async () => {
    await logOut();
  };

  const navLinks = (
    <>
      <NavLinks address="/" label="Home" />
      <NavLinks address="/dashboard" label="Dashboard" />
      {!user ? (
        <div className="space-y-3 lg:hidden">
          <Link to="/login">
            <Button btnText="Login" />
          </Link>
        </div>
      ) : (
        <Link className="flex lg:hidden">
          <Button btnText="Logout" />
        </Link>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 py-2 shadow-lg bg-[#111827]">
      <div>
        <div className="navbar max-w-7xl mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden text-white"
              >
                <span className="text-xl">
                  <FiAlignLeft />
                </span>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-10 p-6 shadow w-52 space-y-6 rounded-lg bg-base-100"
              >
                {navLinks}
              </ul>
            </div>
            <Link
              title="NexParcel - Home"
              className="text-xl md:text-3xl font-bold flex items-center gap-2 text-white"
            >
              <img className="w-10 md:w-12" src="/logo.png" />
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
              <ThemeInput />
              {/* conditional user profile */}
              {!user ? (
                <div className="space-x-3 hidden lg:flex">
                  <Link to="/login">
                    <Button btnText="Login" />
                  </Link>
                </div>
              ) : (
                <ProfileDropdown handleLogOut={handleLogOut} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
