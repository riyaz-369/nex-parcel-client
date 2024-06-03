import { MdManageHistory } from "react-icons/md";
import CustomButton from "../Shared/CustomButton";

const AllBookingRow = ({ booking, idx, setIsOpen }) => {
  const { _id, name, phone_number, booking_date, price, status } = booking;

  return (
    <>
      <tr className="text-base" key={_id}>
        <th>{idx + 1}</th>
        <td>{name}</td>
        <td>{phone_number}</td>
        <td>{new Date(booking_date).toDateString()}</td>
        <td>{new Date(booking_date).toDateString()}</td>
        <td>{price}</td>
        <td>{status}</td>
        <td>
          <CustomButton
            setIsOpen={setIsOpen}
            btnText="Manage"
            icon={MdManageHistory}
            btnSm={true}
          />
        </td>
      </tr>
    </>
  );
};

export default AllBookingRow;
