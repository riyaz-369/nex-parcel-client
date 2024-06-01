import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";

const DeliveryMenCard = () => {
  const [rating, setRating] = useState(4);

  const Star = (
    <path
      d="M398.799,141.794c-43.394-3.977-86.776-6.52-130.158-8.418C258.835,99.302,242.633-4.751,193.173,0.169
        c-39.659,3.944-61.012,90.515-73.08,130.306c-32.333,0.283-64.692,1.062-97.09,2.416c-14.735,0.615-27.908,17.9-18.207,31.732
        c19.157,27.316,44.198,49.389,70.487,70.103c-11.83,38.196-21.665,77.499-29.759,116.53c-3.504,16.91-5.31,32.212,3.881,44.82
        c2.411,9.987,12.018,18.494,22.429,18.029c51.805-2.313,93.872-44.738,133.991-77.119c33.156,26.317,66.309,52.64,99.475,78.951
        c12.835,10.183,37.057,5.178,35.798-14.828c-3.039-48.158-15.477-96.473-30.599-144.041c32.951-25.229,65.899-50.459,99.11-75.353
        C426.818,168.817,420.858,143.814,398.799,141.794z"
    />
  );

  const customStyles = {
    itemShapes: Star,
    activeFillColor: "#F43F5E",
    inactiveFillColor: "#808080",
  };

  return (
    <div className="max-w-md px-8 py-4 mt-16 rounded shadow-lg">
      <div className="flex justify-center -mt-16 md:justify-start">
        <img
          className="object-cover w-32 h-32 border-2 border-[#F43F5E] rounded-full"
          alt="Testimonial avatar"
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
        />
      </div>
      <div className="flex justify-start mt-4">
        <a className="text-2xl font-medium text-[#F43F5E]">John Doe</a>
      </div>
      <p className="mt-2 text-lg font-medium">Parcel Delivered: 5</p>
      <div className="flex items-center  gap-4">
        <p className="text-lg font-medium">Rating:</p>
        <Rating
          style={{ maxWidth: 150 }}
          value={rating}
          onChange={setRating}
          itemStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default DeliveryMenCard;
