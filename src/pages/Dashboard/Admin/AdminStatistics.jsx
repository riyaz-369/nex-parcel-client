import { useQuery } from "@tanstack/react-query";
import ApexChart from "../../../components/Dashboard/Statistics/ApexChart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: statisticsInfo, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure("/statistics");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h4 className="text-3xl font-semibold">Parcel Booking Statistics</h4>
      <div>
        <ApexChart statisticsInfo={statisticsInfo} />
      </div>
    </div>
  );
};

export default AdminStatistics;
