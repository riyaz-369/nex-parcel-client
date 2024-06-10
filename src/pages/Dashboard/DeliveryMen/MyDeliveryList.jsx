import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyDeliveryListsRow from "../../../components/TableRows/MyDeliveryListsRow";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useUser from "../../../hooks/useUser";

const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const { dbUser, userLoading } = useUser();

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

  if (isLoading || userLoading) return <LoadingSpinner />;

  return (
    <div>
      <h4 className="text-3xl capitalize mb-5">
        My delivery parcel lists: {deliveryLists?.length}
      </h4>
      <Helmet>
        <title>Dashboard - My Delivery Lists</title>
      </Helmet>
      <div className="overflow-x-auto">
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
      </div>
    </div>
  );
};

export default MyDeliveryList;
