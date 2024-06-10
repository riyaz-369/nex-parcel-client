import loginAnm from "../../assets/animation/login.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Container from "../../components/Shared/Container";
import GoogleLogInBtn from "../../components/Shared/GoogleLogInBtn";
import CustomButton from "../../components/Shared/CustomButton";
import { FaSpinner } from "react-icons/fa";

const LogIn = () => {
  const { googleSignIn, signIn, saveUserInDB, loading, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = async (formData) => {
    const { email, password } = formData;

    try {
      setLoading(true);
      await signIn(email, password);
      reset();
      toast.success("Login successful.");
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code) {
        toast.error("Invalid email or password");
        setLoading(false);
      } else {
        toast.error(err.message);
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const userDetail = result?.user;
      saveUserInDB(userDetail);
      toast.success("Login successful.");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-[#F43F5E]  bg-opacity-5 py-8">
      <div>
        <Helmet>
          <title>NexParcel - Register</title>
        </Helmet>
        <Container my={false}>
          <div className="flex flex-row-reverse w-full justify-center items-end gap-12 max-w-6xl mx-auto">
            <div className="hidden lg:flex flex-col lg:w-1/2 mt-10">
              <Lottie animationData={loginAnm} />
            </div>
            <div className="w-full px-2 lg:px-6 md:px-8 lg:w-1/2">
              <p className="mb-6 text-center text-2xl lg:text-3xl font-semibold">
                Login Your Account
              </p>
              <GoogleLogInBtn handleGoogleSignIn={handleGoogleSignIn} />
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b border-gray-600 md:w-1/4"></span>
                <span className="text-base text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="hover:text-[#db2d4a] transition-colors underline font-bold text-[#F43F5E] text-lg"
                  >
                    Register
                  </Link>
                </span>
                <span className="w-1/5 border-b border-gray-600 md:w-1/4"></span>
              </div>
              {/* LOGIN FORM */}
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    className="input-style"
                    type="email"
                    placeholder="Enter Your Email Address"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-600">Email is required</p>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between">
                    <label className="block mb-2 text-sm font-medium text-gray-600">
                      Password
                    </label>
                    <a className="text-xs text-gray-500 hover:underline">
                      Forget Password?
                    </a>
                  </div>
                  <div className="relative flex items-center mt-2">
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 focus:outline-none rtl:left-0 rtl:right-auto"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Your Password"
                      className="input-style"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6}/,
                      })}
                    />
                  </div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">Password must 6 characters</p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password maximum 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one uppercase, one lowercase , one
                      number and one special characters
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <CustomButton
                    btnText={loading ? "" : "Login"}
                    icon={loading && FaSpinner}
                    loading={loading}
                    wFull={true}
                  />
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LogIn;
