const MyDeliveryListsRow = ({ delivery, idx }) => {
  const {
    _id,
    name,
    receiver_name,
    phone_number,
    requested_delivery_date,
    approximate_delivery_date,
    receiver_phone_number,
    delivery_address,
  } = delivery;

  return (
    <>
      <tr className="text-base" key={_id}>
        <th>{idx + 1}</th>
        <td>{name}</td>
        <td>{receiver_name}</td>
        <td>{phone_number}</td>
        <td>{new Date(requested_delivery_date).toLocaleDateString()}</td>
        <td>{new Date(approximate_delivery_date).toLocaleDateString()}</td>
        <td>{receiver_phone_number}</td>
        <td>{delivery_address}</td>
        <td></td>
      </tr>
    </>
  );
};

export default MyDeliveryListsRow;
