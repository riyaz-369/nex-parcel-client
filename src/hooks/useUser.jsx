import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";

const useUser = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const {
    data: dbUser,
    isLoading: userLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon(`/user/${user?.email}`);
      return data;
    },
  });

  const role = dbUser?.role;

  return { dbUser, role, userLoading, refetch };
};

export default useUser;
