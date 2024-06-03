import { FaRegEdit } from "react-icons/fa";
import { RiChatDeleteLine } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyParcelRow = ({ bookingParcel, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    parcel_type,
    requested_delivery_date,
    approximate_delivery_date,
    booking_date,
    status,
  } = bookingParcel;

  const handleCancel = async (id) => {
    const doCancel = async () => {
      const { data } = await axiosSecure.delete(`/bookings/${id}`);
      if (data.deletedCount > 0) {
        toast.success("Canceled your booking");
        refetch();
      }
    };

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4ade80",
      cancelButtonColor: "#F43F5E",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        doCancel();
      }
    });
  };

  return (
    <tr className="text-base" key={_id}>
      <th>{idx + 1}</th>
      <td>{parcel_type}</td>
      <td>{new Date(requested_delivery_date).toDateString()}</td>
      <td>{approximate_delivery_date}</td>
      <td>{new Date(booking_date).toDateString()}</td>
      <td>{"989898098909"}</td>
      <td>{status}</td>
      <td className="flex gap-3">
        <Link
          to={`/dashboard/update-booking/${_id}`}
          title="Update Booking"
          className="text-green-400"
        >
          <FaRegEdit size={23} />
        </Link>
        <button
          onClick={() => handleCancel(_id)}
          title="Cancel Booking"
          disabled={status == "pending"}
          className="text-red-400 disabled:cursor-not-allowed"
        >
          <RiChatDeleteLine size={24} />
        </button>
      </td>
    </tr>
  );
};

export default MyParcelRow;
