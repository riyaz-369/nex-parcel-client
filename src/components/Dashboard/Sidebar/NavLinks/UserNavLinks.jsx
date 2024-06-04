import NavLinkSidebar from "../../../Shared/NavLinkSidebar";
import { BsPostcard, BsBox2 } from "react-icons/bs";

const UserNavLinks = () => {
  return (
    <div>
      <NavLinkSidebar
        address="book-parcel"
        label="Book a Parcel"
        icon={BsPostcard}
      />
      <NavLinkSidebar address="my-parcel" label="My Parcel" icon={BsBox2} />
    </div>
  );
};

export default UserNavLinks;
