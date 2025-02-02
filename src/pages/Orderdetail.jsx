import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Orderdetail = () => {
  const { orderserial } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [deliveryData, setDeliveryData] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [loadingDelivery, setLoadingDelivery] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/orderdetail/${orderserial}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error Response:", errorText);
          throw new Error(
            `抓取訂單資料失敗: ${response.status} ${response.statusText} - ${errorText}`
          );
        }
        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error("Fetch Order Error:", error.message);
      } finally {
        setLoadingOrder(false);
      }
    };
    fetchOrderData();
  }, [orderserial]);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/orderdetail/delivery/${orderserial}`
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error Response:", errorText);
          throw new Error(
            `抓取運送資料失敗: ${response.status} ${response.statusText} - ${errorText}`
          );
        }
        const data = await response.json();
        setDeliveryData(data);
      } catch (error) {
        console.error("Fetch Delivery Error:", error.message);
      } finally {
        setLoadingDelivery(false);
      }
    };
    fetchDeliveryData();
  }, [orderserial]);

  if (loadingOrder || loadingDelivery) {
    return <div>載入中...</div>;
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-3/4 space-y-6 mt-0">
        {/* 訂單編號區塊 */}
        <div className="mb-2 font-bold text-gray-600">
          訂單編號：<span className="font-semibold">{orderserial}</span>
        </div>

        {/* 購物明細區塊 */}
        <div className="border border-gray-400 rounded-lg p-4">
          <div className="mb-2 font-bold text-gray-600">購物明細</div>
          <hr />
          <div className="flex items-center m-2 text-gray-600">
            <div id="pic" className="flex-[1]"></div>
            <div className="flex-[4] text-left">商品名稱</div>
            <div className="flex-[1] text-center">數量</div>
            <div className="flex-[1] text-center">價格</div>
            <div className="flex-[1] text-center">小計</div>
          </div>
          <hr />
          {orderData.map((item, index) => (
            <div key={index}>
              <div className="flex items-center m-2 text-gray-600">
                <div
                  id="pic"
                  className="flex-[1] aspect-square max-w-[80px] max-h-[80px] overflow-hidden mr-6"
                >
                  <img
                    src={item.imageurl}
                    alt={item.productname}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-[4] text-left">
                  <span className="block">{item.productname}</span>
                  <span className="block">規格:{item.colorname}</span>
                </div>
                <div className="flex-[1] text-center">{item.quantity}</div>
                <div className="flex-[1] text-center">{item.price}</div>
                <div className="flex-[1] text-center">
                  {item.price * item.quantity}
                </div>
              </div>
              {index !== orderData.length - 1 && <hr />}
            </div>
          ))}
        </div>

        {/* 寄送資料區塊 */}
        <div className="border border-gray-400 rounded-lg p-4 text-left text-gray-600">
          <div className="mb-4 font-bold">付款方式與寄送資料</div>
          <hr />
          <span className="mt-4 block font-bold">
            付款方式：
            <span className="font-normal">{deliveryData.shippingmethod}</span>
          </span>
          <span className="block font-bold">
            取貨人姓名：
            <span className="font-normal">{deliveryData.recipient}</span>
          </span>
          <span className="block font-bold">
            取貨地址：
            <span className="font-normal">
              {deliveryData.ordercity}
              {deliveryData.district}
              {deliveryData.address}
            </span>
          </span>
          <span className="block font-bold">
            取貨電話：<span className="font-normal">{deliveryData.phone}</span>
          </span>
        </div>

        <div className="flex items-center justify-center mt-4 space-y-2">
          <Link
            to="/MemberInfo/MyOrders"
            className="px-8 py-2 bg-[#5e3b25] text-white rounded-md hover:bg-[#c3a789] w-[10rem] text-center"
          >
            返回會員頁面
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orderdetail;
