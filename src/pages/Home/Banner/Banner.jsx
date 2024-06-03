import banner from "../../../assets/banner.jpg";
import CustomButton from "../../../components/Shared/CustomButton";

const Banner = () => {
  return (
    <div
      className="hero bg-no-repeat bg-cover h-[300px] lg:h-[800px]"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="hero-overlay opacity-95"></div>
      <div className="hero-content text-center text-white">
        <div className="">
          <h1 className="mb-5 text-5xl font-bold">We Deliver Your Parcel</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <CustomButton btnText="Search" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
