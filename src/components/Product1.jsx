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


    return (
        <>
            <div className="w-4/5  mt-2 mx-auto items-center ">
                <div className="mx-auto ">
                        {/* 1 */}
                        <div className="relative ">
                            <div className="inline-block items-center">
                                <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">
                                    <img src={Logo1} alt="Image 1" className="w-62 h-50 object-contain rounded " />
                                </a>
                            </div>
                            <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                                {isLiked ? <FaHeart size={35} color="red" onClick={() => setIsLiked(!isLiked)} /> : <CiHeart size={35} onClick={() => setIsLiked(!isLiked)} />}
                            </div>
                            <div className="cardbody">
                                <p>TONSTAD </p>
                                <p>邊桌, 淺乳白色, 64x40 公分</p>
                            </div>
                            <div className="flex  grid-cols-3">
                                <div className="text-2xl text-center">${dataPrice}</div>
                                <div className="text-1xl line-through text-left">${maxPrice}</div>
                                <div className=""></div>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Product1