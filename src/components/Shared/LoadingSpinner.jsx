import Lottie from "lottie-react";
import spinner from "../../assets/animation/spinner.json";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-24 h-24">
        <Lottie animationData={spinner} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
