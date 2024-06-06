import DeliveryMenCard from "../../../components/Card/DeliveryMenCard";
import Container from "../../../components/Shared/Container";
import SectionTitle from "../../../components/Shared/SectionTitle";
import useAllDeliveryMen from "../../../hooks/useAllDeliveryMen";

const DeliveryMen = () => {
  const { allDeliverymen, isLoading } = useAllDeliveryMen();

  return (
    <Container my={true}>
      <SectionTitle
        heading="Top Delivery Mens"
        subtitle="Our top delivery men"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allDeliverymen.map((deliverymen) => (
          <DeliveryMenCard
            deliverymen={deliverymen}
            isLoading={isLoading}
            key={deliverymen._id}
          />
        ))}
      </div>
    </Container>
  );
};

export default DeliveryMen;
