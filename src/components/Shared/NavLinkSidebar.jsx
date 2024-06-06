import { Link } from "react-router-dom";

const NavLinkSidebar = ({ address, label, icon: Icon, handleLogOut }) => {
  return (
    <Link
      onClick={handleLogOut}
      to={address}
      className={`flex items-center gap-2 p-3 text-base transition-colors duration-300 transform hover:bg-base-300 ${
        label === "Logout" && "text-[#F43F5E]"
      } font-bold`}
    >
      <span className="text-[22px]">{Icon && <Icon />}</span>
      <span>{label}</span>
    </Link>
  );
};

export default NavLinkSidebar;
