const AllDeliverymenRow = ({ deliverymen, idx }) => {
  const { name, phone_number, no_of_delivered_parcel, average_review } =
    deliverymen;

  return (
    <tr className="text-base">
      <th>{idx + 1}</th>
      <td>{name}</td>
      <td>{phone_number}</td>
      <td>{no_of_delivered_parcel}</td>
      <td>{average_review}</td>
    </tr>
  );
};

export default AllDeliverymenRow;
