import {FaStar} from "react-icons/fa6";
import {MdOutlineShoppingCart} from "react-icons/md";
import {IoIosHeartEmpty} from "react-icons/io";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {TiHomeOutline} from "react-icons/ti";

const ProductCart = ({product, colors, selectedColor, setSelectedColor}) => {
    const {user, addToCart, homeData, fetchHomeData} = useContext(AuthContext);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (product?.productid) {
            fetch(`http://localhost:8080/products/${product.productid}/reviews`)
                .then((response) => response.json())
                .then((data) => setReviews(data))
                .catch((error) => console.error("Error fetching reviews:", error));
        }
    }, [product]);

    useEffect(() => {
        if (user?.memberId && !homeData) {
            fetchHomeData(user.memberId);
        }
    }, [user, homeData, fetchHomeData]);

    if (!product) {
        return <p>錯誤：產品資料缺失</p>;
    }

    if (!selectedColor) {
        return <p>請選擇一種顏色</p>;
    }
    const handleEditHomeSize = () => {
        if (!user) {
            alert("請先登入以修改家尺寸");
            navigate("/login");
            return;
        }
        navigate("/MemberInfo/Profile");
    };

    const checkFit = () => {

        if (!homeData) {
            return (
                <div>
                    無居家尺寸
                </div>
            );
        }

        const {doorwidth, doorheight, elevatorwidth, elevatorheight, elevatordepth, stairwidth, stairheight} = homeData;
        const productWidth = Number(product.width);
        const productHeight = Number(product.height);

        // 檢查是否所有資料都為 null
        const allDataMissing = [doorwidth, doorheight, elevatorwidth, elevatorheight, elevatordepth, stairwidth, stairheight]
            .every(value => value == null);

        if (allDataMissing) {
            return (
                <div className="text-black">
                    所有居家尺寸資料尚未填寫
                </div>
            );
        }

        let result = [];

        // 檢查大門尺寸
        if (doorwidth != null && doorheight != null) {
            const canFitDoor = productWidth <= doorwidth && productHeight <= doorheight;
            result.push(canFitDoor ? "可通過大門" : "無法通過大門");
        } else {
            result.push("大門無尺寸");
        }

        // 檢查電梯尺寸
        if (elevatorwidth != null && elevatorheight != null && elevatordepth != null) {
            const canFitElevator = productWidth <= elevatorwidth &&
                productHeight <= elevatorheight &&
                productHeight <= elevatordepth;
            result.push(canFitElevator ? "可進入電梯" : "無法進入電梯");
        } else {
            result.push("電梯無尺寸");
        }

        // 檢查樓梯尺寸，若無資料顯示「樓梯無尺寸」
        if (stairwidth != null && stairheight != null) {
            const canFitStairs = productWidth <= stairwidth && productHeight <= stairheight;
            result.push(canFitStairs ? "可通過樓梯" : "無法通過樓梯");
        } else {
            result.push("樓梯無尺寸");
        }

        return result.join("，");
    };

    const handleAddToCart = () => {
        if (!user) {
            alert("請先登入");
            navigate(`/login`);
            return;
        }

        addToCart({
            memberid: Number(user?.memberId),
            productid: Number(product.productid),
            color: selectedColor.colorname || "default",
            quantity: 1
        });
    };


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

    const rating = Math.round(product.rating) || 0;
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
                                {/*<span>折扣: {product.mainCategory.sales.discount * 100}%</span>*/}
                            </div>
                        )}
                    </div>


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
                        onClick={handleAddToCart}
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
                    <div>
                        <div className="my-4 text-red-500">{checkFit()}</div>
                        {/*<div*/}
                        {/*    className="bg-[#5E3B25] hover:bg-[#C3A789] p-1  text-white rounded-md flex items-center justify-center w-[23%]">*/}
                        {/*    <TiHomeOutline className="text-xl mr-2 "/>*/}

                        {/*    <Link to="/MemberInfo/Profile">修改家尺寸</Link>*/}
                        {/*</div>*/}
                        <div
                            className="bg-[#5E3B25] hover:bg-[#C3A789] p-1 text-white rounded-md flex items-center justify-center w-[23%] cursor-pointer"
                            onClick={handleEditHomeSize}>
                            <TiHomeOutline className="text-xl mr-2"/>
                            <span>修改家尺寸</span>
                        </div>
                    </div>
                </div>


                <div className="mt-10 ml-[10%] ">
                    <h2 className="text-xl font-bold mb-3">用戶評論</h2>
                    <div className="max-h-[400px] overflow-y-auto rounded-lg">
                    {reviews.length === 0 ? (
                            <p className="text-gray-500">尚無評論</p>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map((review, index) => (
                                    <div key={index} className="border p-3 rounded-md">
                                        <div className="flex items-center mb-2">
                                            <span className="font-bold">{review.username}</span>
                                            <span className="text-gray-500 text-sm ml-3">{review.date}</span>
                                        </div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i}
                                                        className={i < review.rating ? "text-yellow-500" : "text-gray-300"}/>
                                            ))}
                                        </div>
                                        <p className="text-gray-800 mt-2">{review.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCart;