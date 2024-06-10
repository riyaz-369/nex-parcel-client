import { NavLink } from "react-router-dom";

const NavLinkSidebar = ({ address, label, icon: Icon, handleLogOut }) => {
  return (
    <NavLink
      end
      onClick={handleLogOut}
      to={address}
      className={({ isActive }) =>
        `flex items-center gap-2 p-3 text-base transition-colors duration-300 transform hover:bg-[#F43F5E] hover:bg-opacity-10 my-3 ${
          label === "Logout" && "text-[#F43F5E] bg-none"
        } font-bold ${
          isActive
            ? "bg-[#F43F5E] bg-opacity-10  border-r-2 border-[#F43F5E] rounded-r-lg"
            : "bg-none"
        }`
      }
    >
      <span className="text-[22px]">{Icon && <Icon />}</span>
      <span>{label}</span>
    </NavLink>
  );
};

export default NavLinkSidebar;
