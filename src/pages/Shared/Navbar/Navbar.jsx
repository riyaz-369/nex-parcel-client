import { FiAlignLeft } from "react-icons/fi";
import CustomButton from "../../../components/Shared/CustomButton";
import useAuth from "../../../hooks/useAuth";
import NavLinks from "../../../components/Shared/NavLinks";
import { Link } from "react-router-dom";
import ProfileDropdown from "../../../components/Dropdown/ProfileDropdown";
import HeaderLink from "../../../components/Shared/HeaderLink";
import Container from "../../../components/Shared/Container";
import notification from "../../../assets/icons/notification-50.png";
import ThemeInput from "../../../components/Theme/ThemeInput";
import DashboardBtn from "../../../components/Shared/DashboardBtn";

const Navbar = () => {
  const { user } = useAuth();

  const navLinks = (
    <>
      <NavLinks address="/" label="Home" />

      {/* Dashboard button */}
      <DashboardBtn homeBtn={true} />
      <div className="flex justify-between lg:hidden">
        <h4 className="font-bold text-base">Theme</h4>
        <ThemeInput />
      </div>
      {!user ? (
        <div className="space-y-3 lg:hidden">
          <Link to="/login">
            <CustomButton btnText="Login" />
          </Link>
        </div>
      ) : (
        <Link className="flex lg:hidden">
          <CustomButton btnText="Logout" />
        </Link>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 py-1 bg-base-100 shadow-md">
      <Container>
        <div>
          <div className="navbar">
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
                  className="menu menu-sm dropdown-content mt-3 z-10 p-6 shadow w-52 space-y-6 rounded-lg bg-base-100"
                >
                  {navLinks}
                </ul>
              </div>
              <HeaderLink />
            </div>
            <div className="navbar-end flex gap-12">
              <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-base space-x-8">
                  {navLinks}
                </ul>
              </div>
              <div className="flex items-center gap-2">
                {!user && (
                  <div className="hidden lg:flex ">
                    <ThemeInput />
                  </div>
                )}
                <img className="h-7 w-7 lg:mr-2" src={notification} />

                {/* CONDITIONAL USER PROFILE */}
                {!user ? (
                  <div className="space-x-3 hidden lg:flex">
                    <Link to="/login">
                      <CustomButton btnText="Login" />
                    </Link>
                  </div>
                ) : (
                  <ProfileDropdown />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
