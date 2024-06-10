import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllUsersRow = ({ user, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { _id, name, email, role, number_of_parcel_booked, spent_amount } =
    user;

  // MAKE DELIVERY MEN
  const handleMakeDeliveryMen = async (email) => {
    const makeDeliverymen = async () => {
      try {
        const { data } = await axiosSecure.patch(`/users/${email}`, {
          role: "Delivery Men",
        });

        if (data.modifiedCount > 0) {
          toast.success("Successful to make deliverymen");
          refetch();
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    Swal.fire({
      title: "Are you sure? to make deliverymen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4ade80",
      cancelButtonColor: "#F43F5E",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        makeDeliverymen();
      }
    });
  };

  // MAKE ADMIN
  const handleMakeAdmin = async (email) => {
    const makeAdmin = async () => {
      try {
        const { data } = await axiosSecure.patch(`/users/${email}`, {
          role: "Admin",
        });

        if (data.modifiedCount > 0) {
          toast.success("Successful to make admin");
          refetch();
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    Swal.fire({
      title: "Are you sure? to make admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4ade80",
      cancelButtonColor: "#F43F5E",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin();
      }
    });
  };

  return (
    <tr className="text-base" key={_id}>
      <th>{idx + 1}</th>
      <td>{name}</td>
      <td>{role}</td>
      <td>{email || "N/A"}</td>
      <td>{number_of_parcel_booked || 0}</td>
      <td>{spent_amount}</td>
      <td className="flex gap-3">
        <button
          onClick={() => handleMakeDeliveryMen(email)}
          disabled={role === "Delivery Men" || role === "Admin"}
          className="small-secondary-btn"
        >
          Make Deliverymen
        </button>
        <button
          onClick={() => handleMakeAdmin(email)}
          disabled={role === "Delivery Men" || role === "Admin"}
          className="small-primary-btn"
        >
          Make Admin
        </button>
      </td>
    </tr>
  );
};

export default AllUsersRow;
