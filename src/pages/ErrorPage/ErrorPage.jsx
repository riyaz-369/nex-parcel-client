import Lottie from "lottie-react";
import notFound from "../../assets/animation/404.json";

const ErrorPage = () => {
  return (
    <div className="flex justify-center h-screen">
      <Lottie className="w-[800px]" animationData={notFound} />
    </div>
  );
};

export default ErrorPage;
