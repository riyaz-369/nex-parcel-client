import { FaRegEdit } from "react-icons/fa";
import { RiChatDeleteLine } from "react-icons/ri";

const MyParcelRow = ({ bookingParcel, idx, refetch }) => {
  const {
    _id,
    parcel_type,
    requested_delivery_date,
    approximate_delivery_ate,
    booking_date,
    status,
  } = bookingParcel;

  const handleCancel = (id) => {
    console.log(id);
  };

  return (
    <tr className="text-base" key={_id}>
      <th>{idx + 1}</th>
      <td>{parcel_type}</td>
      <td>{new Date(requested_delivery_date).toDateString()}</td>
      <td>{approximate_delivery_ate}</td>
      <td>{new Date(booking_date).toDateString()}</td>
      <td>{"989898098909"}</td>
      <td>{status}</td>
      <td className="flex gap-3">
        <button className="text-green-400">
          <FaRegEdit size={23} />
        </button>
        <button onClick={() => handleCancel(_id)} className="text-red-400">
          <RiChatDeleteLine size={24} />
        </button>
      </td>
    </tr>
  );
};

export default MyParcelRow;
