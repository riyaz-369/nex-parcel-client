import { FcGoogle } from "react-icons/fc";

const GoogleLogInBtn = ({ handleGoogleSignIn }) => {
  return (
    <div>
      <a
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center mt-4  border border-opacity-30 border-[#F43F5E] hover:border-[#F43F5E] rounded-lg btn-outline btn hover:bg-gray-50 hover:text-black"
      >
        <div className="text-3xl">
          <FcGoogle />
        </div>
        <span className="w-5/6 px-4 py-3 font-bold text-center">
          Login in with Google
        </span>
      </a>
    </div>
  );
};

export default GoogleLogInBtn;
