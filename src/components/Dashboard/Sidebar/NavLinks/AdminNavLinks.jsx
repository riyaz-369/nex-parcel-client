import NavLinkSidebar from "../../../Shared/NavLinkSidebar";
import { BsInboxes } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

const AdminNavLinks = () => {
  return (
    <div>
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
      <NavLinkSidebar address="all-users" label="All Users" icon={FaUsers} />
      <NavLinkSidebar
        address="all-delivery-men"
        label="All Delivery Men"
        icon={FaPeopleCarry}
      />
    </div>
  );
};

export default AdminNavLinks;
