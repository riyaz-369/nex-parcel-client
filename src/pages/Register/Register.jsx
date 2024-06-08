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
import CustomButton from "../../components/Shared/CustomButton";
import uploadImage from "../../apis/utilitis";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import GoogleLogInBtn from "../../components/Shared/GoogleLogInBtn";

const Register = () => {
  const {
    createUser,
    updatedProfile,
    googleSignIn,
    saveUserInDB,
    loading,
    setLoading,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = async (formData) => {
    const image = formData.image[0];
    const { name, email, password, role } = formData;

    try {
      const hostImage = await uploadImage(image);
      const userInfo = {
        name,
        email,
        role,
        photoURL: hostImage,
      };

      const { data } = await axiosCommon.post("/users", userInfo);
      console.log(data);
      if (data.message) return toast.error(data.message);

      if (data.insertedId) {
        reset();
        await createUser(email, password);
        await updatedProfile(name, hostImage);
        toast.success("Registration successful.");
        navigate("/");
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const userDetail = result?.user;
      saveUserInDB(userDetail);
      toast.success("Login successful.");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

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
              <GoogleLogInBtn handleGoogleSignIn={handleGoogleSignIn} />
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b border-gray-600 md:w-1/4"></span>
                <span className="text-base text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="hover:text-[#db2d4a] transition-colors underline font-bold text-[#F43F5E] text-lg"
                  >
                    Login
                  </Link>
                </span>
                <span className="w-1/5 border-b border-gray-600 md:w-1/4"></span>
              </div>
              {/* REGISTRATION FORM */}
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    className="input-style"
                    type="text"
                    placeholder="Enter Your Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-600">Name is required</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium">
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

                <div className="lg:flex gap-4 mt-4">
                  <div className="lg:w-1/2">
                    <label className="block mb-2 text-sm font-medium">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="px-4 py-2 w-full border-2 border-dashed rounded-lg border-[#F43F5E] bg-[#F43F5E] bg-opacity-10"
                      {...register("image", { required: true })}
                    />
                    {errors.image?.type === "required" && (
                      <p className="text-red-600">Please choose a image file</p>
                    )}
                  </div>
                  {/* USER ROLE */}
                  <div className="lg:w-1/2 mt-4 lg:mt-0">
                    <label className="block mb-2 text-sm font-medium">
                      Role
                    </label>
                    <select
                      className="input-style py-3"
                      {...register("role", { required: true })}
                    >
                      <option selected value="User">
                        User
                      </option>
                      <option value="Delivery Men">Delivery Men</option>
                      <option disabled>Admin</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between">
                    <label className="block mb-2 text-sm font-medium">
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
                  <CustomButton btnText="Register" wFull={true} />
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
