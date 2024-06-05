import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllUsersRow = ({ user, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    name,
    role,
    phone_number,
    number_of_parcel_booked,
    spent_amount,
  } = user;

  // MAKE DELIVERY MEN
  const handleMakeDeliveryMen = async (id) => {
    console.log(id);
    const makeDeliverymen = async () => {
      const { data } = await axiosSecure.patch(`/users/${id}`, {
        role: "Delivery Men",
      });
      console.log(data);

      if (data.modifiedCount > 0) {
        toast.success("Successful to make deliverymen");
        refetch();
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
  const handleMakeAdmin = async (id) => {
    console.log(id);
    const makeAdmin = async () => {
      const { data } = await axiosSecure.patch(`/users/${id}`, {
        role: "Admin",
      });
      console.log(data);

      if (data.modifiedCount > 0) {
        toast.success("Successful to make admin");
        refetch();
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
      <td>{phone_number}</td>
      <td>{number_of_parcel_booked}</td>
      <td>{spent_amount}</td>
      <td className="flex gap-3">
        <button
          onClick={() => handleMakeDeliveryMen(_id)}
          disabled={role === "Delivery Men" || role === "Admin"}
          className="small-secondary-btn disabled:cursor-not-allowed"
        >
          Make Deliverymen
        </button>
        <button
          onClick={() => handleMakeAdmin(_id)}
          disabled={role === "Delivery Men" || role === "Admin"}
          className="small-primary-btn disabled:cursor-not-allowed"
        >
          Make Admin
        </button>
      </td>
    </tr>
  );
};

export default AllUsersRow;

// disabled={role === "Delivery Men" || role === "Admin"}
//       onClick={() => handleMakeAdmin(id)}
