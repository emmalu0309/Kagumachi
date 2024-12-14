import { FaStar } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";

const ProductCart = () => {
    return (
        <div>
            <div className="w-[100%]">
                <div className="w-[80%] mx-auto m-1">
                    <div className="text-[20px]">
                        滑門衣櫃, 黑棕色, 117x176 公分
                    </div>
                    <div className="flex my-3 items-center ">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <div className="px-2">5.0</div>
                        <div className="text-[rgb(60,150,187)]">(26)</div>
                    </div>
                    <div className="flex">
                        <div className="text-xl mr-4 text-[#11567b]">NT$ 4,999</div>
                    </div>
                    <div className="flex my-3">

                    </div>
                    <div className="mt-6">
                        <div>顏色</div>
                        <div className=" relative w-32 my-1">
                            <select className="block w-full px-4 py-2 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none rounded-none">
                                <option>黑色</option>
                                <option>白色</option>

                            </select>
                            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                ▼
                            </div>
                        </div>
                    </div>
                    <button className="flex justify-center items-center w-[100%] bg-[#0058a3] hover:bg-[#014f93] p-2 mb-3 mt-6 rounded-md text-white">
                        <MdOutlineShoppingCart className="m-1" />
                        <span>加入購物車</span>
                    </button>
                    <button className="flex justify-center items-center w-[100%] border border-gray-400 hover:border-black p-2 my-3 rounded-md">
                        <IoIosHeartEmpty />
                        <span>收藏商品</span>
                    </button>
                    <div className="text-sm">400件庫存</div>
                </div>

            </div>
        </div>
    );
};

export default ProductCart;