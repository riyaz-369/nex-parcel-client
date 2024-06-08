import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import EditAndDelete from "../Dashboard/Buttons/EditAndDelete";
import ReviewAndPay from "../Dashboard/Buttons/ReviewAndPay";
import { useState } from "react";
import ReviewModal from "../Modals/ReviewModal";

const MyParcelRow = ({ bookingParcel, idx, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    parcel_type,
    requested_delivery_date,
    approximate_delivery_date,
    booking_date,
    deliverymen_id,
    status,
    price,
  } = bookingParcel || {};

  console.log(price);

  const handleCancel = async (id) => {
    const doCancel = async () => {
      try {
        const { data } = await axiosSecure.delete(`/bookings/${id}`);
        if (data.deletedCount > 0) {
          toast.success("Canceled your booking");
          refetch();
        }
      } catch (err) {
        toast.error(err.message);
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
    status === "delivered" && "bg-blue-300 bg-opacity-100"
  } ${status === "returned" && "bg-[#d93025]"} ${
    status === "cancelled" && "bg-red-400"
  } capitalize`;

  return (
    <>
      <tr className="text-base" key={_id}>
        <th>{idx + 1}</th>
        <td>{parcel_type}</td>
        <td>{new Date(requested_delivery_date).toLocaleDateString()}</td>
        <td>
          {approximate_delivery_date &&
            new Date(approximate_delivery_date).toLocaleDateString()}
        </td>
        <td>{new Date(booking_date).toLocaleDateString()}</td>
        <td>{deliverymen_id}</td>
        <td>
          <span className={statusStyle}>{status}</span>
        </td>

        {/* CONDITIONAL ACTIONS BUTTON */}
        {status !== "delivered" ? (
          <td className="flex gap-3">
            <EditAndDelete
              handleCancel={handleCancel}
              _id={_id}
              status={status}
            />
          </td>
        ) : (
          <td className="flex gap-3">
            <ReviewAndPay isOpen={isOpen} setIsOpen={setIsOpen} price={price} />
          </td>
        )}
      </tr>

      {/* USERS REVIEW MODAL */}
      <div>
        <ReviewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          deliverymen_id={deliverymen_id}
        />
      </div>
    </>
  );
};

export default MyParcelRow;
