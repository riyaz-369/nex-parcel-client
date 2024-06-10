import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import AllBookingRow from "../../../components/TableRows/AllBookingRow";
import { GrPowerReset } from "react-icons/gr";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const AllParcel = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    data: allBookings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", { fromDate, toDate }],
    queryFn: async () => {
      const { data } = await axiosSecure("/bookings", {
        params: { fromDate, toDate },
      });
      return data;
    },
  });

  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Helmet>
        <title>Dashboard - All Booking Parcels</title>
      </Helmet>

      <div className="mb-8">
        <div className="flex justify-center lg:justify-start items-center gap-5 shadow-md p-5">
          {/* DATE INPUT FORM */}
          <div className="flex justify-center items-center gap-4">
            <div>
              <label className="text-sm font-medium mr-2">From date</label>
              {/* date picker input */}
              <ReactDatePicker
                className="input-style"
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                placeholderText="Select date"
              />
            </div>
            <div>
              <label className="text-sm font-medium mr-2">To date</label>
              <ReactDatePicker
                className="input-style"
                selected={toDate}
                onChange={(date) => setToDate(date)}
                placeholderText="Select feature date"
              />
            </div>
          </div>

          {/* RESET BUTTON */}
          <button
            onClick={handleReset}
            className="flex btn items-center font-medium tracking-wider text-white uppercase duration-300 bg-[#F43F5E] hover:bg-[#dd3854] rounded-lg mt-5 lg:mt-0"
          >
            <GrPowerReset size={16} /> <span>Reset</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-base">
              <th>SL</th>
              <th>Booked By</th>
              <th>Phone Number</th>
              <th>Booking Date</th>
              <th>Requested Delivery Date</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((booking, idx) => (
              <AllBookingRow
                key={booking._id}
                booking={booking}
                idx={idx}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcel;
