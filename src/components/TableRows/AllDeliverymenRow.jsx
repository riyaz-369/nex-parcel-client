const AllDeliverymenRow = ({ deliverymen, idx }) => {
  const { name, phone_number, no_of_delivered_parcel, rating } = deliverymen;

  return (
    <tr className="text-base">
      <th>{idx + 1}</th>
      <td>{name}</td>
      <td>{phone_number || "N/A"}</td>
      <td>{no_of_delivered_parcel}</td>
      <td>{rating || "Not yet"}</td>
    </tr>
  );
};

export default AllDeliverymenRow;
