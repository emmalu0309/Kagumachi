import { useState, useEffect, useContext } from "react";
import MyOrder from "../components/MyOrder";
import { AuthContext } from "../context/AuthContext";

function MyOrders() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;

  const [orderList, setOrderList] = useState([]);

  const fetchOrderList = async () => {
    const response = await fetch(`http://localhost:8080/myorders?memberid=${memberId}`);
    setOrderList(await response.json());
  };

  useEffect(() => {
    fetchOrderList();
  }, [memberId]);

  const renderedOrderList = orderList.map((order) => {
    return (
      <MyOrder
        key={order.orderid}
        orderDate={order.orderdate}
        orderNumber={order.ordernumber}
        paymentMethod={order.paymentmethod}
        orderStatus={order.orderstatus}
        shippingDate={order.deliverydate}
        estimatedDeliveryDate={order.estimateddeliverydate}
        price={order.totalprice}
      />
    );
  });

  const tableTh =
    "h-12 text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]";

  return (
    <div className="mt-5 flex justify-center">
      <table className="w-4/6 text-sm font-sans text-[#706e6c] border-collapse text-center">
        <thead>
          <tr>
            <th className={tableTh}>訂購日期</th>
            <th className={tableTh}>訂單編號</th>
            <th className={tableTh}>付款方式</th>
            <th className={tableTh}>處理進度</th>
            <th className={tableTh}>出貨日期</th>
            <th className={tableTh}>預計送達日</th>
            <th className={tableTh}>應付金額</th>
            <th className={tableTh}>客服問答</th>
            <th className={tableTh}>評論</th>
          </tr>
        </thead>
        <tbody>{renderedOrderList}</tbody>
        <tfoot>
          <tr>
            <td
              className="h-12 py-2 px-5 bg-[#ebebeb] border border-[#ccc] text-[#686868] text-right"
              colSpan={9}
            >
              共 {orderList.length} 筆訂單
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default MyOrders;
