import CountUp from "react-countup";

const StatisticsCard = ({ heading, count, inView }) => {
  return (
    <div className="">
      <p className="font-semibold text-xl md:text-2xl lg:text-3xl md:mb-4 text-white opacity-80">
        {heading}
      </p>
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F43F5E]">
        {inView ? (
          <CountUp
            start={0}
            end={count}
            duration={6}
            decimals={0}
            decimal=","
          ></CountUp>
        ) : (
          count
        )}
      </h3>
    </div>
  );
};

export default StatisticsCard;
