import {FaStar} from "react-icons/fa6";
import {MdOutlineShoppingCart} from "react-icons/md";
import {IoIosHeartEmpty} from "react-icons/io";
import {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const ProductCart = ( {product, colors, selectedColor, setSelectedColor} ) => {
    const {user, addToCart} = useContext(AuthContext);
    const navigate = useNavigate();

    if (!product) {
        return <p >錯誤：產品資料缺失</p>;
    }

    if (!selectedColor) {
        return <p>請選擇一種顏色</p>;
    }


    const handleMyKeep = async () => {
        if (!user) {
            alert("請先登入");
            navigate(`/login`);
            return;
        }

        const favoriteData = {
            memberid: Number(user.memberId),
            productid: Number(product.productid),
        };

        try {
            const response = await fetch("http://localhost:8080/productcart/addMyKeep", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(favoriteData)
            });

            if (response.ok) {
                alert("已加入收藏");
            } else {
                alert("操作失敗");
            }
        } catch (error) {
            console.error("收藏失敗:", error);
            alert("無法連接伺服器");
        }
    };

    const rating = Math.round(product.rating) || 0; // 四捨五入到最近的整數
    const totalStars = 5;


    return (
        <div>
            <div className="w-[100%]">
                <div className="w-[80%] mx-auto m-1">
                    <div className="text-[18px]">
                        {product.productname}, {selectedColor.colorname}, {product.width}x{product.height} 公分
                    </div>

                    <div className="flex mt-3">
                        {/*<div className="text-xl mr-4 text-[#11567b]">NT${product.unitprice}</div>*/}
                        {product.unitprice === product.discountprice ? (
                            <div className="text-2xl ">NT${product.unitprice}</div>
                        ) : (
                            <div className="flex items-center">
                                <div className="text-2xl text-red-500 font-bold">NT${product.discountprice}</div>
                                <div className="text-lg text-gray-500 line-through ml-3">NT${product.unitprice}</div>
                            </div>
                        )}

                    </div>

                    <div>
                        {product.mainCategory?.sales && (
                            <div className=" rounded-md mt-3">
                                <span>{product.mainCategory.sales.salesdesc}   </span>
                                <span>折扣: {product.mainCategory.sales.discount * 100}%</span>
                            </div>
                        )}
                    </div>

                    {/*<div className="flex my-3 items-center ">*/}
                    {/*    <FaStar className="text-sm"/>*/}
                    {/*    <FaStar className="text-sm"/>*/}
                    {/*    <FaStar className="text-sm"/>*/}
                    {/*    <FaStar className="text-sm"/>*/}
                    {/*    <FaStar className="text-sm"/>*/}
                    {/*    <div className="px-2 text-sm">5.0</div>*/}
                    {/*    <div className="text-[rgb(60,150,187)] text-sm">({product.reviewcount ?? "沒有評論"})</div>*/}
                    {/*</div>*/}

                    <div className="flex my-3 items-center">
                        {[...Array(totalStars)].map((_, index) => (
                            <FaStar key={index}
                                    className={`text-sm ${index < rating ? "text-yellow-500" : "text-gray-300"}`}/>
                        ))}
                        <div className="px-2 text-sm">{product.rating?.toFixed(1) || "0.0"}</div>
                        <div className="text-gray-500 text-sm">({product.reviewcount ?? "沒有評論"})</div>
                    </div>
                    <div className="mt-3 text-sm">{product.unitsold || 0} 個人購買過</div>
                    <div className="flex my-3">

                    </div>
                    <div className="mt-6">
                        <div>顏色</div>
                        <div className="flex mt-3">

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
                        onClick={() => addToCart(
                            {
                                memberid: Number(user.memberId),
                                productid: Number(product.productid),
                                color: selectedColor.colorname || "default",
                                quantity: 1
                            }
                        )}
                        className="flex justify-center items-center w-[100%] bg-[#5E3B25] hover:bg-[#C3A789] p-2 mb-3 mt-6 rounded-md text-white">
                        <MdOutlineShoppingCart className="m-1"/>
                        <span>加入購物車</span>
                    </button>
                    <button
                        onClick={handleMyKeep}
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