import loginAnm from "../../assets/animation/login.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button";
import { FcGoogle } from "react-icons/fc";
import uploadImage from "../../apis/utilitis";

const Register = () => {
  const { createUser, updatedProfile, googleSignIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const image = formData.image[0];
    const { name, email, password } = formData;

    // console.log(image.name);

    // console.log(formData);

    try {
      const result = await createUser(email, password);

      const hostImage = await uploadImage(image);
      console.log(hostImage);

      console.log(result.user);
      reset();
      navigate("/");

      // update user profile
      await updatedProfile(name, image);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // if (error.code) {
  //   toast.error("Email already in use.");
  // }

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      console.log(result);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const inputStyle =
    "block w-full px-4 py-2 border border-[#F43F5E] rounded-lg focus:border-[#F43F5E] focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-[#F43F5E]";

  return (
    <div className="bg-base-200 py-8">
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
                Register Your Account
              </p>
              <a
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center mt-4  border rounded-lg btn-outline btn hover:bg-gray-50 hover:text-black"
              >
                <div className="text-3xl">
                  <FcGoogle />
                </div>
                <span className="w-5/6 px-4 py-3 font-bold text-center">
                  Login in with Google
                </span>
              </a>
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b border-gray-600 md:w-1/4"></span>
                <span className="text-base text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="hover:text-[#F43F5E] transition-colors hover:underline font-bold text-[#111827] text-lg"
                  >
                    Login
                  </Link>
                </span>
                <span className="w-1/5 border-b border-gray-600 md:w-1/4"></span>
              </div>
              {/* REGISTRATION FORM */}
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <input
                    className={`${inputStyle}`}
                    type="text"
                    placeholder="Enter Your Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-600">Name is required</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    className={`${inputStyle}`}
                    type="email"
                    placeholder="Enter Your Email Address"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-600">Email is required</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="px-4 py-2 border-2 border-dashed rounded-lg border-[#F43F5E] bg-[#F43F5E] bg-opacity-10 file-input file-input-secondary w-1/2"
                    {...register("image", { required: true })}
                  />
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
                      className={`${inputStyle}`}
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
                  <Button btnText="Register" wFull={true} />
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Register;
