import { MdManageHistory } from "react-icons/md";
import ManageBookingModal from "../Modals/ManageBookingModal";
import { useState } from "react";

const AllBookingRow = ({ booking, idx }) => {
  const { _id, name, phone_number, booking_date, price, status } = booking;
  const [isOpen, setIsOpen] = useState(false);

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
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-sm bg-[#F43F5E] hover:bg-[#E3344D] text-white rounded-full shadow-md"
          >
            <span>
              <MdManageHistory />
            </span>
            <span>Manage</span>
          </button>
        </td>
      </tr>
      {/* MANAGE BOOKING MODAL */}
      <div>
        <ManageBookingModal isOpen={isOpen} setIsOpen={setIsOpen} _id={_id} />
      </div>
    </>
  );
};

export default AllBookingRow;
