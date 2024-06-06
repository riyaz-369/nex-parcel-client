import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import Container from "../../../components/Shared/Container";
import AllDeliverymenRow from "../../../components/TableRows/AllDeliverymenRow";
import useAllDeliveryMen from "../../../hooks/useAllDeliveryMen";

const AllDeliveryMan = () => {
  const { allDeliverymen, isLoading } = useAllDeliveryMen();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Container>
        <h4 className="text-3xl">All Deliverymen: {allDeliverymen?.length}</h4>
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
            {allDeliverymen.map((deliverymen, idx) => (
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
