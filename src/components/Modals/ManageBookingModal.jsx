import {
  Dialog,
  DialogPanel,
  Field,
  Select,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import { FaArrowDown } from "react-icons/fa";
import CustomButton from "../Shared/CustomButton";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";

const ManageBookingModal = ({ isOpen, setIsOpen }) => {
  const [startDate, setStartDate] = useState(new Date());

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
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl">
                  <div className="w-full max-w-md px-4">
                    <Field>
                      <div className="relative">
                        <Select
                          className={clsx(
                            "mt-3 block w-full appearance-none rounded-lg border-none py-1.5 px-3 text-sm/6",
                            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                          )}
                        >
                          <option value="Select Deliverymen" selected disabled>
                            Select Deliverymen
                          </option>
                          <option value="active">Active</option>
                          <option value="paused">Paused</option>
                        </Select>
                        <FaArrowDown
                          className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
                          aria-hidden="true"
                        />
                      </div>
                    </Field>
                    <div className="mt-6">
                      <label className="block mb-2 text-sm font-medium text-gray-600">
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
                  <div className="mt-4 text-center">
                    <CustomButton btnText="Assign" />
                  </div>
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
