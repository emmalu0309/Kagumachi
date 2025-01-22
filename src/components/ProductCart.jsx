import {FaStar} from "react-icons/fa6";
import {MdOutlineShoppingCart} from "react-icons/md";
import {IoIosHeartEmpty} from "react-icons/io";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

const ProductCart = ( {product, colors, selectedColor, setSelectedColor} ) => {

    // const {products} = useContext(AuthContext);
    //
    // if (!products) {
    //     return <p>載入中...</p>;
    // }
    //
    // //等分類頁面好傳入資料 傳入資料需包含哪個顏色的商品
    // const product = products[0];
    // const colors = product.productColors || [];
    if (!product) {
        return <p >錯誤：產品資料缺失</p>;
    }

    // 🛑 確保 `selectedColor` 存在
    if (!selectedColor) {
        return <p>請選擇一種顏色</p>;
    }


    return (
        <div>
            <div className="w-[100%]">
                <div className="w-[80%] mx-auto m-1">
                    <div className="text-[20px]">
                        {product.productname}, {selectedColor.colorname}, {product.width}x{product.height} 公分
                    </div>
                    <div className="flex my-3 items-center ">
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <div className="px-2">5.0</div>
                        <div className="text-[rgb(60,150,187)]">({product.reviewcount ?? "沒有評論"})</div>
                    </div>
                    <div className="flex">
                        <div className="text-xl mr-4 text-[#11567b]">NT${product.unitprice}</div>
                    </div>
                    <div className="flex my-3">

                    </div>
                    <div className="mt-6">
                        <div>顏色</div>
                        <div className="flex mt-3">
                            {/*{colors.map((color, index) => {*/}
                            {/*    const primaryImage = color.productImages.find(img => img.isprimary === true);*/}

                            {/*    return (*/}
                            {/*        <div key={index} className="flex flex-col items-center mr-3">*/}
                            {/*            {primaryImage ? (*/}
                            {/*                <img src={primaryImage.imageurl} alt={color.colorname}*/}
                            {/*                     className="w-16 h-16 object-cover border rounded-md"/>*/}
                            {/*            ) : (*/}
                            {/*                <div*/}
                            {/*                    className="w-20 h-20 bg-gray-300 flex items-center justify-center border rounded-md">*/}
                            {/*                    無圖片*/}
                            {/*                </div>*/}
                            {/*            )}*/}
                            {/*            <div className="text-sm mt-1">{color.colorname}</div>*/}
                            {/*        </div>*/}
                            {/*    );*/}
                            {/*})}*/}

                            {colors.map((color, index) => {
                                const primaryImage = color.productImages.find(img => img.isprimary === true);

                                return (
                                    <div
                                        key={index}
                                        className={`flex flex-col items-center mr-3 ${color.colorname === selectedColor.colorname ? "border border-black rounded-md" : ""}`}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {primaryImage ? (
                                            <img src={primaryImage.imageurl} alt={color.colorname}
                                                 className="w-16 h-16 object-cover rounded-md m-1"/>
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-300 flex items-center justify-center">
                                                無圖片
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button
                        className="flex justify-center items-center w-[100%] bg-[#5E3B25] hover:bg-[#C3A789] p-2 mb-3 mt-6 rounded-md text-white">
                        <MdOutlineShoppingCart className="m-1"/>
                        <span>加入購物車</span>
                    </button>
                    <button
                        className="flex justify-center items-center w-[100%] border border-gray-400 hover:border-black p-2 my-3 rounded-md">
                        <IoIosHeartEmpty/>
                        <span>收藏商品</span>
                    </button>
                    <div className="text-sm">{selectedColor.stock}件庫存</div>
                </div>

            </div>
        </div>
    );
};

export default ProductCart;