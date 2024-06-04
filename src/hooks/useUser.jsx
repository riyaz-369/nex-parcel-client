import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });

  const role = dbUser?.role;

  return { dbUser, role, userLoading };
};

export default useUser;
