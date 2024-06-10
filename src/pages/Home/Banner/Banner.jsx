import Container from "../../../components/Shared/Container";
import CustomButton from "../../../components/Shared/CustomButton";
import deliverymenImg from "../../../assets/banner/deliverymen.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard/book-parcel");
  };

  return (
    <div className="bg-[#F43F5E]  bg-opacity-5 min-h-max relative">
      <Container>
        <div className="">
          <div className="hero-content flex-col md:flex-row-reverse">
            <div>
              <img
                src={deliverymenImg}
                className="max-w-sm md:max-w-md lg:max-w-xl"
              />
            </div>
            <div className="text-center md:text-start">
              <h1 data-aos="fade-up" className="text-5xl lg:text-6xl">
                <span className="font-sans font-semibold">We Are</span>{" "}
                <span className="font-bold ">Deliver</span>{" "}
                <span className="font-semibold font-sans">Your</span>{" "}
                <span className="text-[#F43F5E] font-bold ">Parcel</span>
              </h1>
              <p
                data-aos="fade-up"
                className="py-6 max-w-md text-sm md:text-base text-base-content text-opacity-80"
              >
                We ensure swift and secure delivery of your parcels, providing
                reliable service you can trust. Our dedicated team handles every
                package with care.
              </p>
              <div
                data-aos="fade-right"
                className="flex gap-4 justify-center md:justify-start"
              >
                <CustomButton
                  btnText="Book Parcel"
                  handleNavigate={handleNavigate}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
