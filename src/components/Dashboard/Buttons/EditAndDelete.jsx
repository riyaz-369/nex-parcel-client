import { FaRegEdit } from "react-icons/fa";
import { RiChatDeleteLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const EditAndDelete = ({ handleCancel, _id }) => {
  return (
    <div className="flex gap-x-4 items-center justify-center">
      <Link
        to={`/dashboard/update-booking/${_id}`}
        title="Update Booking"
        className="text-green-400 disabled:cursor-not-allowed disabled:text-opacity-40"
      >
        <FaRegEdit size={23} />
      </Link>
      <button
        onClick={() => handleCancel(_id)}
        title="Cancel Booking"
        className="text-red-400 disabled:cursor-not-allowed disabled:text-opacity-40"
      >
        <RiChatDeleteLine size={24} />
      </button>
    </div>
  );
};

export default EditAndDelete;
