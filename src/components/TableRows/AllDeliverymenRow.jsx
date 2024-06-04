const AllDeliverymenRow = ({ deliverymen, idx }) => {
  const { name, phone_number, number_of_parcel_delivered, average_review } =
    deliverymen;

  return (
    <tr className="text-base">
      <th>{idx + 1}</th>
      <td>{name}</td>
      <td>{phone_number}</td>
      <td>{number_of_parcel_delivered}</td>
      <td>{average_review}</td>
    </tr>
  );
};

export default AllDeliverymenRow;
