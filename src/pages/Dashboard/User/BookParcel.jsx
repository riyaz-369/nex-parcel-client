import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import CustomButton from "../../../components/Shared/CustomButton";
import Container from "../../../components/Shared/Container";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BookParcel = () => {
  const [price, setPrice] = useState(0);
  const { user } = useAuth();
  const { register, handleSubmit, watch, control, setValue } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleBook = async (formData) => {
    try {
      const { data } = await axiosSecure.post("/bookings", {
        ...formData,
        status: "pending",
        requested_delivery_date: startDate,
        booking_date: new Date(),
      });

      if (data.insertedId) {
        toast.success("Booked your parcel successfully");
        navigate("/dashboard/my-parcel");
      }

      const response = await axiosSecure.put(`/users/${user?.email}`);
      console.log(response.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const parcelWeight = watch("parcel_weight");

  useEffect(() => {
    const weight = parseFloat(parcelWeight);
    // console.log(!isNaN(weight));
    let calcPrice = 0;
    if (!isNaN(weight)) {
      if (weight === 1) {
        calcPrice = 50;
      } else if (weight === 2) {
        calcPrice = 100;
      } else if (weight > 2) {
        calcPrice = 150;
      }
    }
    setPrice(calcPrice);
    setValue("price", calcPrice);
  }, [parcelWeight, setValue]);

  return (
    <Container>
      <div>
        <h4 className="text-3xl font-semibold">Book a parcel</h4>
        <Helmet>
          <title>Book a Parcel</title>
        </Helmet>
        <form onSubmit={handleSubmit(handleBook)} className="">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4">
            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                className="input-style"
                type="text"
                defaultValue={user?.displayName}
                readOnly
                {...register("name")}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                className="input-style"
                type="text"
                defaultValue={user?.email}
                readOnly
                {...register("email")}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Phone Number
              </label>
              <Controller
                name="phone_number"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    className="input-style focus:border-none"
                    placeholder="Enter Your Phone Number"
                    defaultCountry="BD"
                  />
                )}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Parcel Type
              </label>
              <input
                className="input-style"
                type="text"
                placeholder="Enter Your Parcel Type"
                {...register("parcel_type", { required: true })}
              />
            </div>
            {/* Parcel Weight */}
            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Parcel Weight
              </label>
              <input
                className="input-style"
                type="number"
                placeholder="Enter Your Parcel Weight: kg"
                {...register("parcel_weight", { required: true })}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">Price</label>
              <input
                className="input-style"
                type="number"
                value={price}
                readOnly
                {...register("price")}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Receiver Name
              </label>
              <input
                className="input-style"
                type="text"
                placeholder="Enter the Receiver Name"
                {...register("receiver_name", { required: true })}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Receiver Phone Number
              </label>
              <Controller
                name="receiver_phone_number"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    className="input-style"
                    placeholder="Enter Receiver Phone Number"
                    defaultCountry="BD"
                  />
                )}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Requested Delivery Date
              </label>
              {/* date picker input */}
              <ReactDatePicker
                className="input-style"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Delivery Address
              </label>
              <input
                className="input-style"
                type="text"
                placeholder="Enter the Parcel Delivery Address"
                {...register("delivery_address", { required: true })}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Delivery Address Latitude
              </label>
              <input
                className="input-style"
                type="text"
                placeholder="ex 23.8041"
                {...register("delivery_address_latitude")}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Delivery Address Longitude
              </label>
              <input
                className="input-style"
                type="text"
                placeholder="ex 90.4152"
                {...register("delivery_address_longitude")}
              />
            </div>
          </div>
          <div className="mt-6">
            <CustomButton btnText="Book" pxLg={true} />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default BookParcel;
