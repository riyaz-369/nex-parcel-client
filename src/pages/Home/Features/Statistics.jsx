import StatisticsCard from "../../../components/Card/StatisticsCard";

const Statistics = () => {
  return (
    <div className="my-8">
      <div className="flex justify-center items-center">
        <div className="text-center flex items-center space-y-4 md:space-y-0 py-6 px-6 md:py-12 lg:py-20 w-full rounded flex-col md:flex-row md:flex justify-center md:justify-around mx-auto shadow-md bg-[#111827]">
          <StatisticsCard heading="Parcel Booked" count={200} />
          <StatisticsCard heading="Parcel Delivered" count={600} />
          <StatisticsCard heading="Total Users" count={100} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
