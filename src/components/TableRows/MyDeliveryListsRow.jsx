import { FaMapLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const MyDeliveryListsRow = ({ delivery, refetch, idx }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    _id,
    name,
    receiver_name,
    phone_number,
    requested_delivery_date,
    approximate_delivery_date,
    receiver_phone_number,
    delivery_address,
    status,
  } = delivery;

  const handleDeliveredCount = async () => {
    try {
      const { data } = await axiosSecure.put(`/user/${user?.email}`);
      console.log(data);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const handleDeliver = async (id) => {
    try {
      const { data } = await axiosSecure.put(`/bookings/${id}`, {
        status: "delivered",
      });
      if (data.modifiedCount > 0) {
        toast.success("Congratulations ! You'r delivered this parcel");
        refetch();
        handleDeliveredCount();
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const handleCancel = async (id) => {
    const doCancel = async () => {
      try {
        const { data } = await axiosSecure.put(`/bookings/${id}`, {
          status: "cancelled",
        });
        if (data.modifiedCount > 0) {
          toast.success("Delivery canceled");
          refetch();
        }
      } catch (err) {
        console.log(err.message);
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

  return (
    <>
      <tr className="text-base" key={_id}>
        <th>{idx + 1}</th>
        <td>{name}</td>
        <td>{receiver_name}</td>
        <td>{phone_number}</td>
        <td>{new Date(requested_delivery_date).toLocaleDateString()}</td>
        <td>{new Date(approximate_delivery_date).toLocaleDateString()}</td>
        <td>{receiver_phone_number}</td>
        <td>
          <span>{delivery_address}</span>
          {/* MAP BUTTON */}
          <button
            title="View Location"
            className="btn btn-sm btn-ghost text-red-500"
          >
            <FaMapLocationDot size={20} />
          </button>
        </td>
        <td className="flex gap-2">
          {/* DELIVER BUTTON */}
          <button
            disabled={status === "cancelled" || status === "delivered"}
            onClick={() => handleDeliver(_id)}
            className="flex gap-1 bg-[#4B5563] border-none hover:bg-[#252c36] shadow-md text-white btn btn-sm rounded-full"
          >
            <span>{status === "delivered" ? "Delivered" : "Deliver"}</span>
          </button>
          {/* CANCEL BUTTON */}
          <button
            disabled={status === "cancelled" || status === "delivered"}
            onClick={() => handleCancel(_id)}
            className="flex gap-1 bg-[#F43F5E] border-none hover:bg-[#E3344D] shadow-md text-white btn btn-sm rounded-full"
          >
            <span>{status === "cancelled" ? "Cancelled" : "Cancel"}</span>
          </button>
        </td>
      </tr>
    </>
  );
};

export default MyDeliveryListsRow;
