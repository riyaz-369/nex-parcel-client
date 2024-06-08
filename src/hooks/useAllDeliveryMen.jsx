import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allDeliverymen = [], isLoading } = useQuery({
    queryKey: ["deliverymen"],
    queryFn: async () => {
      const { data } = await axiosSecure("/deliverymen");
      return data;
    },
  });

  return { allDeliverymen, isLoading };
};

export default useAllDeliveryMen;
