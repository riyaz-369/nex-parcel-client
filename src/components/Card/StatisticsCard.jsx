import CountUp from "react-countup";

const StatisticsCard = ({ heading, count }) => {
  return (
    <div className="">
      <p className="font-semibold lg:text-2xl md:mb-4 text-white opacity-80">
        {heading}
      </p>
      <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#F43F5E]">
        <CountUp
          start={0}
          end={count}
          duration={10}
          decimals={0}
          decimal=","
        ></CountUp>
      </h3>
    </div>
  );
};

export default StatisticsCard;
