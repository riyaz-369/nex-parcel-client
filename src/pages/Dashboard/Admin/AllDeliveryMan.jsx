import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import Container from "../../../components/Shared/Container";
import AllDeliverymenRow from "../../../components/TableRows/AllDeliverymenRow";

const AllDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();

  const { data: totalDeliverymen = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/deliverymen");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Container>
        <h4 className="text-3xl">
          All Deliverymen: {totalDeliverymen?.length}
        </h4>
        <Helmet>
          <title>Dashboard - All Deliverymen</title>
        </Helmet>
        <table className="table">
          <thead>
            <tr className="text-base">
              <th>SL</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Number of Parcel Delivered</th>
              <th>Average Review</th>
            </tr>
          </thead>
          <tbody>
            {totalDeliverymen.map((deliverymen, idx) => (
              <AllDeliverymenRow
                key={deliverymen._id}
                deliverymen={deliverymen}
                idx={idx}
              />
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default AllDeliveryMan;
