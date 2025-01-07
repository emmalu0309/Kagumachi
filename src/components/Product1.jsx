// by 大瑋
import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";




// 網站圖片
const Logo1 = 'https://www.ikea.com.tw/dairyfarm/tw/images/751/1375106_PE960171_S4.webp'

const Product1 = () => {
    const [isLiked, setIsLiked] = useState(false);
    const liked = () => setIsLiked(!isLiked);
    const maxPrice = '5000'; //商品價錢
    const dataPrice = '2999'; //商品價錢

    // const [isLiked, setIsLiked] = useState(false);
    // const [product, setProduct] = useState(null); // 用來存放從 API 獲取的商品資料
    // const [loading, setLoading] = useState(true); // 載入狀態
    // const [error, setError] = useState(null); // 錯誤狀態

    // useEffect(() => {
    //     // 使用 fetch 獲取商品資料
    //     const fetchProduct = async () => {
    //         try {
    //             const response = await fetch("https://api.example.com/products/1"); // 替換為您的 API URL
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             const data = await response.json();
    //             setProduct(data);
    //         } catch (err) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchProduct();
    // }, []);

    // const liked = () => setIsLiked(!isLiked);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    // if (!product) {
    //     return <div>No product data available</div>;
    // }

    return (
        <>
            <div className="w-4/5  mt-2 mx-auto items-center ">
                <div className="mx-auto ">
                    {/* 1 */}
                    <div className="relative ">
                        <div className="inline-block items-center">
                            <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer"> 
                            {/* <a href={product.link} target="_blank" rel="noopener noreferrer"> */}
                                <img src={Logo1} alt="Image 1" className="w-62 h-50 object-contain rounded " />
                                {/* <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-62 h-50 object-contain rounded"
                                /> */}
                            </a>
                        </div>
                        <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                            {isLiked ? <FaHeart size={35} color="red" onClick={() => setIsLiked(!isLiked)} /> : <CiHeart size={35} onClick={() => setIsLiked(!isLiked)} />}
                        </div>
                        <div className="cardbody">
                            <p>TONSTAD </p>
                            <p>邊桌, 淺乳白色, 64x40 公分</p>
                            {/* <p>{product.name}</p>
                            <p>{product.description}</p> */}
                        </div>
                        <div className="flex  grid-cols-3">
                            <div className="text-2xl text-center">${dataPrice}</div>
                            <div className="text-1xl line-through text-left">${maxPrice}</div>
                            {/* <div className="text-2xl text-center">${product.price}</div>
                            <div className="text-1xl line-through text-left">${product.originalPrice}</div> */}
                            <div className=""></div>
                        </div>

                        <div className="flex">
                            <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                                <button className="w-10 h-10 border bg-white rounded-3xl"></button>
                            </a>
                            <a href="https://www.example1.com" target="_blank" rel="noopener noreferrer">
                                <button className="w-10 h-10 border bg-black rounded-3xl"></button>
                            </a>
                            <a href="https://www.example2.com" target="_blank" rel="noopener noreferrer">
                                <button className="w-10 h-10 border bg-yellow-600 rounded-3xl"></button>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Product1