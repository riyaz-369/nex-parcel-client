import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import Container from "../../../components/Shared/Container";
import AllUsersRow from "../../../components/TableRows/AllUsersRow";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Container>
        <h4 className="text-3xl">All Users: {allUsers?.length}</h4>
        <Helmet>
          <title>Dashboard - All Users</title>
        </Helmet>
        <table className="table">
          <thead>
            <tr className="text-base">
              <th>SL</th>
              <th>Name</th>
              <th>Role</th>
              <th>Phone Number</th>
              <th>Number of parcel Booked</th>
              <th>Total Spent Amount</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, idx) => (
              <AllUsersRow
                key={user._id}
                user={user}
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

export default AllUsers;
