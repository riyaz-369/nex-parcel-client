import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import Container from "../../../components/Shared/Container";
import MyParcelRow from "../../../components/TableRows/MyParcelRow";

const MyParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: myBookings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/bookings/${user?.email}`);
      return data;
    },
  });

  console.log(myBookings);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Container>
        <h4 className="text-3xl">My parcel: {myBookings?.length}</h4>
        <Helmet>
          <title>My Need Volunteer Posts</title>
        </Helmet>
        <table className="table">
          <thead>
            <tr className="text-base">
              <th></th>
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
      </Container>
    </div>
  );
};

export default MyParcel;
