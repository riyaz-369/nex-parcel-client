import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import Container from "../../../components/Shared/Container";
import AllBookingRow from "../../../components/TableRows/AllBookingRow";

const AllParcel = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allBookings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await axiosSecure("/bookings");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Container>
        <h4 className="text-3xl">My parcel: {allBookings?.length}</h4>
        <Helmet>
          <title>My Need Volunteer Posts</title>
        </Helmet>
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
      </Container>
    </div>
  );
};

export default AllParcel;
