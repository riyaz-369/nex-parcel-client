import { MdEmail, MdCloudUpload } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import { FaPhone, FaSpinner } from "react-icons/fa";
import CustomButton from "../../../components/Shared/CustomButton";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import uploadImage from "../../../apis/utilitis";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Profile = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { dbUser, userLoading, refetch } = useUser();

  const { register, handleSubmit } = useForm();

  const handleUploadProfile = async (data) => {
    const image = data.image[0];
    if (!image) return toast.error("You did't upload your image");

    try {
      setLoading(true);
      const hostImage = await uploadImage(image);
      const { data } = await axiosSecure.patch(`/users/${user?.email}`, {
        photoURL: hostImage,
      });

      if (data.modifiedCount > 0) {
        setLoading(false);
        toast.success("Successfully update your profile.");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  if (userLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto shadow-md rounded-md overflow-hidden">
      <div className="bg-gradient-to-r from-[#F43F5E] to-purple-600 h-40"></div>
      <div className="p-6">
        <div className="flex items-center justify-center -mt-20">
          <div className="w-32 h-32 border-4 border-[#F43F5E] rounded-full overflow-hidden shadow-md">
            <img
              src={dbUser?.photoURL}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold">{dbUser?.displayName}</h2>
        </div>
        <div className="mt-8 p-4">
          <div className="flex justify-between items-center border-b border-gray-300 pb-4">
            <div>
              <span className="">Email:</span>
              <span className="ml-2">{dbUser?.email}</span>
            </div>
            <span className="text-orange-400">
              {" "}
              <MdEmail size={20} />
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-300 py-4">
            <div>
              <span className="">Phone:</span>
              <span className="ml-2">+1234567890</span>
            </div>
            <span className="text-green-400">
              <FaPhone />
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleUploadProfile)}>
          <div className="flex justify-center mt-6 gap-2">
            <div className="lg:w-1/2">
              <input
                type="file"
                name="image"
                className="px-4 py-2 w-full border-2 border-dashed rounded-lg border-[#F43F5E] bg-[#F43F5E] bg-opacity-10"
                {...register("image")}
              />
            </div>
            <CustomButton
              btnText="Upload"
              icon={loading ? FaSpinner : MdCloudUpload}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
