import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import CustomButton from "../../../components/Shared/CustomButton";
import Container from "../../../components/Shared/Container";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateBooking = () => {
  const { register, handleSubmit, watch, control, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const bookingData = useLoaderData();

  const {
    _id,
    name,
    email,
    phone_number,
    parcel_type,
    parcel_weight,
    price,
    receiver_name,
    receiver_phone_number,
    requested_delivery_date,
    delivery_address,
    delivery_address_latitude,
    delivery_address_longitude,
    status,
  } = bookingData || {};

  const [startDate, setStartDate] = useState(new Date(requested_delivery_date));
  const [parcelPrice, setParcelPrice] = useState(price);

  const handleUpdate = async (formData) => {
    try {
      const { data } = await axiosSecure.put(`/bookings/${_id}`, {
        ...formData,
        requested_delivery_date: startDate,
      });

      if (status !== "pending") {
        toast.error("You can't update right now");
      } else if (data.modifiedCount > 0) {
        toast.success("Your parcel updated successfully");
        navigate("/dashboard/my-parcel");
      } else {
        toast.error("You did't change any information");
      }
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
    setParcelPrice(calcPrice);
    setValue("price", calcPrice);
  }, [parcelWeight, setValue]);

  const inputStyle =
    "block w-full px-4 py-3 border border-opacity-30 border-[#F43F5E] rounded-lg focus:border-[#F43F5E] focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-[#F43F5E]";

  return (
    <Container>
      <div>
        <h4 className="text-3xl">Update Your Booked parcel</h4>
        <Helmet>
          <title>Book a Parcel</title>
        </Helmet>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4">
            <div className="mt-6">
              <label className="lev">Name</label>
              <input
                className={inputStyle}
                type="text"
                value={name}
                readOnly
                {...register("name")}
              />
            </div>

            <div className="mt-6">
              <label className="lev">Email</label>
              <input
                className={inputStyle}
                type="text"
                value={email}
                readOnly
                {...register("email")}
              />
            </div>

            <div className="mt-6">
              <label className="lev">Phone Number</label>
              <Controller
                name="phone_number"
                control={control}
                rules={{ required: true }}
                defaultValue={phone_number}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    className={`${inputStyle} focus:border-none`}
                    placeholder="Enter Your Phone Number"
                    defaultCountry="BD"
                  />
                )}
              />
            </div>

            <div className="mt-6">
              <label className="lev">Parcel Type</label>
              <input
                className={inputStyle}
                type="text"
                placeholder="Enter Your Parcel Type"
                defaultValue={parcel_type}
                {...register("parcel_type", { required: true })}
              />
            </div>
            {/* Parcel Weight */}
            <div className="mt-6">
              <label className="lev">Parcel Weight</label>
              <input
                className={inputStyle}
                type="number"
                placeholder="Enter Your Parcel Weight: kg"
                defaultValue={parcel_weight}
                {...register("parcel_weight", { required: true })}
              />
            </div>

            <div className="mt-6">
              <label className="lev">Price</label>
              <input
                className={inputStyle}
                type="number"
                value={parcelPrice}
                readOnly
                {...register("price")}
              />
            </div>

            <div className="mt-6">
              <label className="lev">Receiver Name</label>
              <input
                className={inputStyle}
                type="text"
                placeholder="Enter the Receiver Name"
                defaultValue={receiver_name}
                {...register("receiver_name", { required: true })}
              />
            </div>

            <div className="mt-6">
              <label className="lev">Receiver Phone Number</label>
              <Controller
                name="receiver_phone_number"
                control={control}
                rules={{ required: true }}
                defaultValue={receiver_phone_number}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    className={inputStyle}
                    placeholder="Enter Receiver Phone Number"
                    defaultCountry="BD"
                  />
                )}
              />
            </div>

            <div className="mt-6">
              <label className="lev">Requested Delivery Date</label>
              {/* date picker input */}
              <ReactDatePicker
                className={inputStyle}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="mt-6">
              <label className="lev">Delivery Address</label>
              <input
                className={inputStyle}
                type="text"
                placeholder="Enter the Parcel Delivery Address"
                defaultValue={delivery_address}
                {...register("delivery_address", { required: true })}
              />
            </div>

            <div className="mt-6">
              <label className="lev">Delivery Address Latitude</label>
              <input
                className={inputStyle}
                type="text"
                placeholder="ex 23.8041"
                defaultValue={delivery_address_latitude}
                {...register("delivery_address_latitude")}
              />
            </div>

            <div className="mt-6">
              <label className="lev">Delivery Address Longitude</label>
              <input
                className={inputStyle}
                type="text"
                placeholder="ex 90.4152"
                defaultValue={delivery_address_longitude}
                {...register("delivery_address_longitude")}
              />
            </div>
          </div>
          <div className="mt-6">
            <CustomButton btnText="Update" pxLg={true} />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default UpdateBooking;
