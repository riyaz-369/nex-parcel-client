import { MdManageHistory } from "react-icons/md";
import ManageBookingModal from "../Modals/ManageBookingModal";
import { useState } from "react";

const AllBookingRow = ({ booking, idx, refetch }) => {
  const {
    _id,
    name,
    phone_number,
    booking_date,
    requested_delivery_date,
    price,
    status,
  } = booking;
  const [isOpen, setIsOpen] = useState(false);

  const statusStyle = `rounded-full text-sm font-medium bg-opacity-20 px-2 py-[3px] ${
    status === "pending" && "bg-[#ffc107]"
  } ${status === "on the way" && "bg-[#28a745] px-2 text-[15px]"} ${
    status === "delivered" && "bg-blue-100 bg-opacity-100"
  } ${status === "returned" && "bg-[#d93025]"} ${
    status === "cancelled" && "bg-red-400"
  } capitalize`;

  return (
    <>
      <tr className="text-base" key={_id}>
        <th>{idx + 1}</th>
        <td>{name}</td>
        <td>{phone_number}</td>
        <td>{new Date(booking_date).toLocaleDateString()}</td>
        <td>{new Date(requested_delivery_date).toLocaleDateString()}</td>
        <td>{price}</td>
        <td>
          <span className={statusStyle}>{status}</span>
        </td>
        <td>
          <button
            onClick={() => setIsOpen(true)}
            disabled={status !== "pending"}
            className="small-primary-btn"
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
        <ManageBookingModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          _id={_id}
          refetch={refetch}
          requested_delivery_date={requested_delivery_date}
        />
      </div>
    </>
  );
};

export default AllBookingRow;
