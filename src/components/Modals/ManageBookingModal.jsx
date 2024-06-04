import {
  Dialog,
  DialogPanel,
  Field,
  Select,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import CustomButton2 from "../Shared/CustomButton2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllDeliveryMen from "../../hooks/useAllDeliveryMen";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const ManageBookingModal = ({ isOpen, setIsOpen, _id }) => {
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const { totalDeliverymen } = useAllDeliveryMen();

  const handleAssign = async (formData) => {
    const manageBookingData = {
      deliverymen_id: formData.deliverymen_id,
      status: "on the way",
      approximate_delivery_date: startDate,
    };

    const { data } = await axiosSecure.put(
      `/bookings/${_id}`,
      manageBookingData
    );
    console.log(data);

    if (data.modifiedCount > 0) {
      toast.success("Successfully assigned deliverymen");
      reset();
    } else {
      toast.error("haven't any changes");
    }
  };

  const inputStyle =
    "block w-full px-4 py-3 border border-opacity-30 border-[#F43F5E] rounded-lg focus:border-[#F43F5E] focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-[#F43F5E]";

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
                <DialogPanel className="w-full max-w-md transform rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-2xl btn btn-sm rounded-full btn-outline hover:bg-[#F43F5E] border-none"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(handleAssign)}>
                    <div className="w-full max-w-md px-4">
                      <div className="flex justify-between">
                        <h1 className="text-2xl font-medium">
                          Select a Deliverymen
                        </h1>
                      </div>
                      <Field>
                        <div className="relative mt-4">
                          <Select
                            className={inputStyle}
                            {...register("deliverymen_id", { required: true })}
                          >
                            <option
                              value="Select Deliverymen"
                              className="font-semibold"
                              selected
                              disabled
                            >
                              Select Deliverymen ID
                            </option>
                            {totalDeliverymen.map((deliverymen) => (
                              <option
                                key={deliverymen._id}
                                value={deliverymen._id}
                              >
                                {deliverymen._id}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </Field>
                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium">
                          Approximate Delivery Date
                        </label>
                        {/* DATE PICKER INPUT */}
                        <div>
                          <ReactDatePicker
                            className={inputStyle}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-end">
                      <CustomButton2
                        handleAssign={handleAssign}
                        setIsOpen={setIsOpen}
                        btnText="Assign"
                      />
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

export default ManageBookingModal;
