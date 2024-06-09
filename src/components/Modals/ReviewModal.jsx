import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import CustomButton3 from "../Shared/CustomButton3";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModal = ({ isOpen, setIsOpen, deliverymen_id }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleReviewSubmit = async (formData) => {
    const rating = parseFloat(formData.rating);

    const reviewData = {
      name: user?.displayName,
      photoURL: user?.photoURL,
      rating,
      feedback: formData.feedback,
      date: new Date(),
      deliverymen_id,
    };

    try {
      const { data } = await axiosSecure.post("/reviews", reviewData);
      console.log(data);
      if (data.insertedId) {
        toast.success("Thank you! for submit your review");
        setIsOpen(false);
        reset();
      }

      axiosSecure.put(`/user-rating/${deliverymen_id}`, { rating });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DialogPanel className="w-full max-w-md transform rounded-2xl bg-base-200  p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-2xl btn btn-sm rounded-full btn-outline hover:bg-[#F43F5E] border-none"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(handleReviewSubmit)}>
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-medium">
                        Name
                      </label>
                      <input
                        className="input-style"
                        type="text"
                        placeholder="Enter Your Name"
                        value={user?.displayName}
                        readOnly
                      />
                      {errors.name?.type === "required" && (
                        <p className="text-red-600">Name is required</p>
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between items-center gap-2 mt-4">
                        <div className="w-2/3">
                          <label className="block mb-2 text-sm font-medium">
                            Profile Picture
                          </label>
                          <input
                            disabled
                            type="file"
                            className="px-4 py-2 w-full border-2 border-dashed rounded-lg border-[#F43F5E] bg-[#F43F5E] bg-opacity-10 disabled:bg-opacity-5 disabled:border-opacity-10"
                          />
                        </div>
                        <div className="w-20 h-20 border-2 border-[#F43F5E] rounded-full overflow-hidden shadow-md mt-4">
                          <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-medium">
                        Rating
                      </label>
                      <input
                        className="input-style"
                        type="number"
                        placeholder="Out of 5"
                        {...register("rating", {
                          required: true,
                          min: 1,
                          max: 5,
                        })}
                      />
                      {errors.rating?.type === "required" && (
                        <p className="text-red-600">Rating is required</p>
                      )}
                      {errors.rating?.type == "min" && (
                        <p className="text-red-600">Rating minimum 1</p>
                      )}
                      {errors.rating?.type === "max" && (
                        <p className="text-red-600">Rating maximum 5</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-medium">
                        Your Feedback
                      </label>
                      <textarea
                        className="input-style"
                        type="text"
                        placeholder="Give your feedback"
                        {...register("feedback")}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-medium">
                        Deliverymen ID
                      </label>
                      <input
                        className="input-style"
                        type="text"
                        value={deliverymen_id}
                        readOnly
                      />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <CustomButton3 btnText="Submit" />
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ReviewModal;
