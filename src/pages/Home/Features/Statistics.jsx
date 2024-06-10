import { useQuery } from "@tanstack/react-query";
import StatisticsCard from "../../../components/Card/StatisticsCard";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useInView } from "react-intersection-observer";

const Statistics = () => {
  const axiosCommon = useAxiosCommon();

  const { ref, inView } = useInView({ triggerOnce: true });

  const { data: statistics } = useQuery({
    queryKey: ["home-stats"],
    queryFn: async () => {
      const { data } = await axiosCommon("/home-stats");
      return data;
    },
  });

  const parcelBooked = statistics?.bookedParcel || 0;
  const parcelDelivered = statistics?.parcelDelivered.length || 0;
  const totalUsers = statistics?.users || 0;

  return (
    <div data-aos="fade-up" className="my-16">
      <div className="flex justify-center items-center">
        <div
          ref={ref}
          className="text-center flex items-center space-y-4 md:space-y-0 py-6 px-6 md:py-12 lg:py-20 w-full rounded-xl flex-col md:flex-row md:flex justify-center md:justify-around mx-auto shadow-md bg-[#111827]"
        >
          <StatisticsCard
            inView={inView}
            heading="Parcel Booked"
            count={parcelBooked}
          />
          <StatisticsCard
            inView={inView}
            heading="Parcel Delivered"
            count={parcelDelivered}
          />
          <StatisticsCard
            inView={inView}
            heading="Total Users"
            count={totalUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
