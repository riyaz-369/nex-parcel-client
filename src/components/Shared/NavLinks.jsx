import { NavLink } from "react-router-dom";

const NavLinks = ({ address, label }) => {
  const activeStyle =
    "font-bold text-base text-[#F43F5E] flex items-center gap-1 hover:text-[#F43F5E]";
  const deActiveStyle =
    "transition font-bold flex items-center gap-1 hover:text-[#F43F5E]";

  return (
    <div>
      <NavLink
        to={address}
        className={({ isActive }) => (isActive ? activeStyle : deActiveStyle)}
      >
        {label}
      </NavLink>
    </div>
  );
};

export default NavLinks;
