import { Link } from "react-router-dom";

function MyOrder({
  orderDate,
  orderNumber,
  paymentMethod,
  orderStatus,
  shippingDate,
  estimatedDeliveryDate,
  price,
}) {
  const tableTd = "p-3 border border-[#ccc]";
  return (
    <tr>
      <td className={tableTd}>{orderDate}</td>
      <td className={tableTd}>
        <Link to="/orderdetail" className="hover:underline">
            {orderNumber}
        </Link>
      </td>
      <td className={tableTd}>{paymentMethod}</td>
      <td className={tableTd}>{orderStatus}</td>
      <td className={tableTd}>{shippingDate}</td>
      <td className={tableTd}>{estimatedDeliveryDate}</td>
      <td className={tableTd}>{price}</td>
      {/* <td className={tableTd}>客服</td> */}
      <td className={tableTd}>
        <Link to="/customerreviews" className="hover:underline">
          評論
        </Link>
      </td>
    </tr>
  );
}

export default MyOrder;
