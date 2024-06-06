import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useAllDeliveryMen = () => {
  const axiosCommon = useAxiosCommon();

  const { data: allDeliverymen = [], isLoading } = useQuery({
    queryKey: ["deliverymen"],
    queryFn: async () => {
      const { data } = await axiosCommon("/deliverymen");
      return data;
    },
  });

  return { allDeliverymen, isLoading };
};

export default useAllDeliveryMen;
