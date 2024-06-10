import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import MyParcelRow from "../../../components/TableRows/MyParcelRow";
import { GrPowerReset } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const MyParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, watch, reset } = useForm();

  const filterStatus = watch("status", "");

  const {
    data: myBookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", filterStatus],
    queryFn: async () => {
      const { data } = await axiosSecure(`/bookings/${user?.email}`, {
        params: { filter: filterStatus },
      });
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [filterStatus, refetch]);

  const handleReset = () => {
    reset();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="">
      <Helmet>
        <title>Dashboard - My Parcel</title>
      </Helmet>

      <div className="mb-8">
        <div className="flex justify-center lg:justify-start items-center gap-5 shadow-md p-5">
          <div>
            <select
              value={filterStatus}
              className="border border-[#F43F5E]  py-1 px-4 rounded-md"
              {...register("status")}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="on the way">On The Way</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-4 font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-[#F43F5E] hover:bg-[#dd3854] py-1 rounded-md"
          >
            <GrPowerReset /> <span>Reset</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-base">
              <th>SL</th>
              <th>Parcel Type</th>
              <th>Requested Delivery Date</th>
              <th>Approximate Delivery Date</th>
              <th>Booking Date</th>
              <th>Delivery Men ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBookings.map((bookingParcel, idx) => (
              <MyParcelRow
                key={bookingParcel._id}
                bookingParcel={bookingParcel}
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

export default MyParcel;
