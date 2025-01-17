import { Link } from "react-router-dom";
import ShoppingcartStepIcon from "../components/ShoppingcartStepIcon";

function CartStep4() {
  return (
    <>
      <ShoppingcartStepIcon step="4" />
      <div className="max-w-[55%] mx-auto py-6 px-10 mt-10 border border-gray-200  text-gray-500">
        <div className="py-32 flex-cow justify-items-center">
          <p className="pb-20">訂單完成</p>
          <p>訂單編號：123456789</p>
        </div>
        <div className="flex justify-between mt-6">
          <Link to="/homepage">
            <button className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]">
              繼續購物
            </button>
          </Link>
          <Link to="/MemberInfo/MyOrders">
            <button className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]">
              查看訂單
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartStep4;