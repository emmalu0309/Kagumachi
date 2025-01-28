import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";

const Orderdetail = () => {
  // const { user } = useContext(AuthContext);
  // const memberId = user.memberId;

  const { orderserial } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      console.log("orderserial from useParams:", orderserial);
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
      console.log("回傳資料:", data);
      setOrderData(data);
      setLoading(false);
    };
    fetchOrderData();
  }, [orderserial]);

  if (loading) {
    return <div>載入中...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* 外層容器，水平垂直置中 */}
      <div className="w-3/4 space-y-6 mt-0">
        {/* 訂單編號區塊 */}
        <div className="text-left  text-gray-400 mt-8">
          您的訂單編號為：<span className="font-semibold">{orderserial}</span>
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
          <span className="block">付款方式</span>
          <span className="block">訂購姓名</span>
          <span className="block">取貨地址</span>
        </div>
      </div>
    </div>
  );
};

export default Orderdetail;
