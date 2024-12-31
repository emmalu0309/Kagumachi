import MyOrder from "../components/MyOrder";

function MyOrders() {
  // ==============================
  const orderList = [
    {
      orderDate: "2024/11/19",
      orderNumber: "241119011502",
      paymentMethod: "信用卡",
      orderStatus: "訂單完成",
      shippingDate: "2024/11/20",
      estimatedDeliveryDate: "2024/11/23",
      price: "2063",
    },
    {
      orderDate: "2024/11/19",
      orderNumber: "241119011502",
      paymentMethod: "信用卡",
      orderStatus: "訂單完成",
      shippingDate: "2024/11/20",
      estimatedDeliveryDate: "2024/11/23",
      price: "2063",
    },
    {
      orderDate: "2024/11/19",
      orderNumber: "241119011502",
      paymentMethod: "信用卡",
      orderStatus: "訂單完成",
      shippingDate: "2024/11/20",
      estimatedDeliveryDate: "2024/11/23",
      price: "2063",
    },
  ];
  // ==============================

  const renderedOrderList = orderList.map((order, index) => {
    return (
      <MyOrder
        key={index}
        orderDate={order.orderDate}
        orderNumber={order.orderNumber}
        paymentMethod={order.paymentMethod}
        orderStatus={order.orderStatus}
        shippingDate={order.shippingDate}
        estimatedDeliveryDate={order.estimatedDeliveryDate}
        price={order.price}
      />
    );
  });

  const tableTh = "h-12 text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]";
  
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
            <th className={tableTh}>客服</th>
            <th className={tableTh}>評論</th>
          </tr>
        </thead>
        <tbody>
          {renderedOrderList}
        </tbody>
        <tfoot>
          <tr>
            <td className="h-12 py-2 px-5 bg-[#ebebeb] border border-[#ccc] text-[#686868] text-right" colSpan={9}>
              共{orderList.length}筆訂單
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default MyOrders;
