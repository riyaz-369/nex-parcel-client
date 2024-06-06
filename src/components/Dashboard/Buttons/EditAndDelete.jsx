import { FaRegEdit } from "react-icons/fa";
import { RiChatDeleteLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const EditAndDelete = ({ handleCancel, _id, status }) => {
  return (
    <div className="flex gap-x-4 items-center justify-center">
      <Link
        className="text-green-400"
        to={`/dashboard/update-booking/${_id}`}
        title="Update Booking"
      >
        <FaRegEdit size={23} />
      </Link>

      <button
        disabled={status !== "pending"}
        onClick={() => handleCancel(_id)}
        title="Cancel Booking"
        className="text-red-400 disabled:cursor-not-allowed disabled:text-opacity-50"
      >
        <RiChatDeleteLine size={24} />
      </button>
    </div>
  );
};

export default EditAndDelete;
