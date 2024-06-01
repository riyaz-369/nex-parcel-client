import DeliveryMenCard from "../../../components/Card/DeliveryMenCard";
import Container from "../../../components/Shared/Container";
import SectionTitle from "../../../components/Shared/SectionTitle";

const DeliveryMen = () => {
  return (
    <Container>
      <SectionTitle
        heading="Top Delivery Mens"
        subtitle="Our top delivery men"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DeliveryMenCard />
        <DeliveryMenCard />
        <DeliveryMenCard />
      </div>
    </Container>
  );
};

export default DeliveryMen;
