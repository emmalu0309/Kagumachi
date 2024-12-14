import Carousel from "../components/Carousel"
import ProductCart from "../components/ProductCart"
import ProductDetail from "../components/ProductDetail";
import { IoIosArrowForward } from "react-icons/io";

const ProductPage = () => {
  return (
    <div className="w-[90%] mx-auto mt-[4%] ">
      <div className=" flex py-1 items-center ">
        <div className="p-3 text-gray-600 text-sm">櫃子</div>
        <IoIosArrowForward className="text-[#515156]" />
        <div className="p-3 text-gray-600 text-sm">衣櫃</div>
        
      </div>
      <div className="w-[100%] flex">
        <div className="w-[70%]">
          <Carousel />
          <ProductDetail />
        </div>
        <div className="w-[50%]">
          <ProductCart />
         
        </div>
      </div>
    </div>
  )
}

export default ProductPage