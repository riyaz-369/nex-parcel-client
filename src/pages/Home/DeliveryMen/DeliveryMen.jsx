import { useQuery } from "@tanstack/react-query";
import DeliveryMenCard from "../../../components/Card/DeliveryMenCard";
import Container from "../../../components/Shared/Container";
import SectionTitle from "../../../components/Shared/SectionTitle";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const DeliveryMen = () => {
  const axiosCommon = useAxiosCommon();

  const { data: topDeliveryMen = [], isLoading } = useQuery({
    queryKey: ["deliverymen"],
    queryFn: async () => {
      const { data } = await axiosCommon("/deliverymen");
      return data;
    },
  });

  return (
    <Container my={true}>
      <SectionTitle
        heading="Top Delivery Mens"
        subtitle="Our top delivery men"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topDeliveryMen.map((deliverymen) => (
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
