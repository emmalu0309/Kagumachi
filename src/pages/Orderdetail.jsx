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
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mr-1 mb-2"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <rect width="14" height="17" x="5" y="4" rx="2" />
                <path strokeLinecap="round" d="M9 9h6m-6 4h6m-6 4h4" />
              </g>
            </svg>
            <div className="mt-1 font-bold text-gray-600">購物明細</div>
          </div>

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
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mr-2 mb-2"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                color="currentColor"
              >
                <circle cx="17" cy="18" r="2" />
                <circle cx="7" cy="18" r="2" />
                <path d="M5 17.972c-1.097-.054-1.78-.217-2.268-.704s-.65-1.171-.704-2.268M9 18h6m4-.028c1.097-.054 1.78-.217 2.268-.704C22 16.535 22 15.357 22 13v-2h-4.7c-.745 0-1.117 0-1.418-.098a2 2 0 0 1-1.284-1.284C14.5 9.317 14.5 8.945 14.5 8.2c0-1.117 0-1.675-.147-2.127a3 3 0 0 0-1.926-1.926C11.975 4 11.417 4 10.3 4H2m0 4h6m-6 3h4" />
                <path d="M14.5 6h1.821c1.456 0 2.183 0 2.775.354c.593.353.938.994 1.628 2.276L22 11" />
              </g>
            </svg>
            <div className="mt-1 mb-1 font-bold">付款方式與寄送資料</div>
          </div>

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
