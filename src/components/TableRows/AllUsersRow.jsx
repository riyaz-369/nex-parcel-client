import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import CustomButton from "../../components/Shared/CustomButton";
import CustomButton3 from "../Shared/CustomButton3";

const AllUsersRow = ({ user, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();
  console.log(user);

  const {
    _id,
    name,
    role,
    phone_number,
    number_of_parcel_booked,
    spent_amount,
  } = user;

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
      title: "Are you sure? to Make Deliverymen",
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

  return (
    <tr className="text-base" key={_id}>
      <th>{idx + 1}</th>
      <td>{name}</td>
      <td>{role}</td>
      <td>{phone_number}</td>
      <td>{number_of_parcel_booked}</td>
      <td>{spent_amount}</td>
      <td className="flex gap-3">
        <CustomButton3
          handleMakeDeliveryMen={handleMakeDeliveryMen}
          role={role}
          id={_id}
          btnText="Make Deliverymen"
          btnSm={true}
        />
        <CustomButton btnText="Make Admin" btnSm={true} />
      </td>
    </tr>
  );
};

export default AllUsersRow;