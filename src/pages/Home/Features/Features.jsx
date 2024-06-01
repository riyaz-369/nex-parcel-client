import FeaturedCard from "../../../components/Card/FeaturedCard";
import SectionTitle from "../../../components/Shared/SectionTitle";
import icon1 from "../../../assets/icons/fast-delivery.png";
import icon2 from "../../../assets/icons/const.png";
import icon3 from "../../../assets/icons/safety.png";
import Container from "../../../components/Shared/Container";
import Statistics from "./Statistics";

const Features = () => {
  return (
    <Container>
      <SectionTitle
        heading="Our Features"
        subtitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores optio accusantium labore tenetur officiis culpa in a sint eveniet, nisi maxime veritatis doloribus"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeaturedCard
          img={icon1}
          title="Fast Delivery"
          subtitle="jflasdfjlsdfjslddkkfjlsdkkjfalsdkkfjlaskdjsdflj"
        />
        <FeaturedCard
          img={icon2}
          title="Low Cost"
          subtitle="jflasdfjlsdfjslddkkfjlsdkkjfalsdkkfjlaskdjsdflj"
        />
        <FeaturedCard
          img={icon3}
          title="Parcel Safety"
          subtitle="jflasdfjlsdfjslddkkfjlsdkkjfalsdkkfjlaskdjsdflj"
        />
      </div>
      <Statistics />
    </Container>
  );
};

export default Features;
