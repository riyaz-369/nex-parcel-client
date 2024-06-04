import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();

  const { data: totalDeliverymen = [], isLoading } = useQuery({
    queryKey: ["deliverymen"],
    queryFn: async () => {
      const { data } = await axiosSecure("/deliverymen");
      return data;
    },
  });

  return { totalDeliverymen, isLoading };
};

export default useAllDeliveryMen;
