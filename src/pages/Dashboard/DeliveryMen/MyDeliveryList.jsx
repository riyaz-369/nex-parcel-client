import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Container from "../../../components/Shared/Container";
import MyDeliveryListsRow from "../../../components/TableRows/MyDeliveryListsRow";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyDeliveryList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });

  const {
    data: deliveryLists = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["delivery-lists"],
    enabled: !!dbUser,
    queryFn: async () => {
      const { data } = await axiosSecure(`/delivery-lists/${dbUser?._id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Container>
        <h4 className="text-3xl">My delivery lists: {deliveryLists?.length}</h4>
        <Helmet>
          <title>Dashboard - My Delivery Lists</title>
        </Helmet>
        <table className="table">
          <thead>
            <tr className="text-sm">
              <th>SL</th>
              <th>Booked By</th>
              <th>Receivers Name</th>
              <th>Booked User’s Phone</th>
              <th>Requested Delivery Date</th>
              <th>Approximate Delivery Date</th>
              <th>Receiver Phone Number</th>
              <th>Receivers Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveryLists.map((delivery, idx) => (
              <MyDeliveryListsRow
                key={delivery._id}
                delivery={delivery}
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

export default MyDeliveryList;
