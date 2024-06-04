import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import EditAndDelete from "../Dashboard/Buttons/EditAndDelete";
import ReviewAndPay from "../Dashboard/Buttons/ReviewAndPay";

const MyParcelRow = ({ bookingParcel, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    parcel_type,
    requested_delivery_date,
    approximate_delivery_date,
    booking_date,
    deliverymen_id,
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

  const statusStyle = `rounded-full text-sm font-medium bg-opacity-20 px-2 py-[3px] ${
    status === "pending" && "bg-[#ffc107]"
  } ${status === "on the way" && "bg-[#28a745] px-2 text-[15px]"} ${
    status === "delivered" && "bg-[#43a047]"
  } ${status === "returned" && "bg-[#d93025]"} ${
    status === "cancelled" && "bg-[#999999]"
  } capitalize`;

  return (
    <tr className="text-base" key={_id}>
      <th>{idx + 1}</th>
      <td>{parcel_type}</td>
      <td>{new Date(requested_delivery_date).toLocaleDateString()}</td>
      <td>{new Date(approximate_delivery_date).toLocaleDateString()}</td>
      <td>{new Date(booking_date).toLocaleDateString()}</td>
      <td>{deliverymen_id}</td>
      <td>
        <span className={statusStyle}>{status}</span>
      </td>
      {status !== "delivered" ? (
        <td className="flex gap-3">
          <EditAndDelete handleCancel={handleCancel} _id={_id} />
        </td>
      ) : (
        <td className="flex gap-3">
          <ReviewAndPay />
        </td>
      )}
    </tr>
  );
};

export default MyParcelRow;
