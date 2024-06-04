import NavLinkSidebar from "../../../Shared/NavLinkSidebar";
import { FaListCheck } from "react-icons/fa6";
import { MdOutlineReviews } from "react-icons/md";

const DeliverymenNavLinks = () => {
  return (
    <div>
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
    </div>
  );
};

export default DeliverymenNavLinks;
