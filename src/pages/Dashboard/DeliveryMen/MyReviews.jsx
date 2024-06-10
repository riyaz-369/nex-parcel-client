import ReviewCard from "../../../components/Card/ReviewCard";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useUser from "../../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";

const MyReviews = () => {
  const axiosCommon = useAxiosCommon();
  const { dbUser } = useUser();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/reviews/${dbUser?._id}`);
      return data;
    },
  });

  return (
    <div>
      <h4 className="text-3xl">My reviews: {reviews.length}</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
