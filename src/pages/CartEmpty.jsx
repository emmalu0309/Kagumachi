import { Link } from "react-router-dom";
import ShoppingcartStepIcon from "../components/ShoppingcartStepIcon";

function CartEmpty() {
  return (
    <>
      <ShoppingcartStepIcon step="0" />
      <div className="max-w-[55%] mx-auto py-6 px-10 mt-10 border border-gray-200  text-gray-500">
        <span className="py-52 flex justify-center">購物車空空如也</span>
        <div className="flex justify-center mt-6">
          <Link to="/homepage">
            <button className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]">
              繼續購物
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartEmpty;