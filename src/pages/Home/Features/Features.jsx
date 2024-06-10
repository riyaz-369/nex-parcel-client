import FeaturedCard from "../../../components/Card/FeaturedCard";
import SectionTitle from "../../../components/Shared/SectionTitle";
import icon1 from "../../../assets/icons/fast-delivery.png";
import icon2 from "../../../assets/icons/const.png";
import icon3 from "../../../assets/icons/safety.png";
import Container from "../../../components/Shared/Container";
import Statistics from "./Statistics";

const Features = () => {
  return (
    <Container my={true}>
      <SectionTitle
        heading="Our Features"
        subtitle="Our service ensures fast delivery, low cost, and top-notch parcel safety. Enjoy quick and affordable shipping with the confidence that your items are secure every step of the way."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeaturedCard
          img={icon1}
          title="Fast Delivery"
          subtitle="Swift and reliable delivery to get your parcels to their destinations quickly"
        />
        <FeaturedCard
          img={icon2}
          title="Low Cost"
          subtitle="Affordable shipping options that provide great value without compromising quality."
        />
        <FeaturedCard
          img={icon3}
          title="Parcel Safety"
          subtitle="Secure handling and protection to ensure your parcels arrive safely and intact."
        />
      </div>
      <Statistics />
    </Container>
  );
};

export default Features;
