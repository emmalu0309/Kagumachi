// by 大瑋
import Slider from "react-slick";
import React, { useState } from "react";
import Product1 from "./Product1";

const CustomArrow = ({ className, style, onClick, arrowType, isVisible }) => (
<button
  onClick={onClick}
  className={`absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none rounded-full w-10 h-10 text-xl cursor-pointer flex items-center justify-center z-10 ${
    arrowType === "prev" ? "left-2" : "right-2"
  }`}
  style={{ display: isVisible ? "flex" : "none" }}
>
  {arrowType === "prev" ? "❮" : "❯"}
</button>
);

// 網站圖片
const Logo1 = 'https://www.ikea.com.tw/dairyfarm/tw/images/751/1375106_PE960171_S4.webp'

const NewProduct = () => {
    const [isHovered, setIsHovered] = useState(false); // 控制按鈕顯示狀態  
    const [isLiked, setIsLiked] = useState(false);
    const liked = () => setIsLiked(!isLiked);
    const maxPrice = '5000'; //商品價錢
    const dataPrice = '2999'; //商品價錢
    const abc = <Product1 />;
    const settings = {
        dots: true, // 顯示下方點點
        infinite: false, // 無限循環
        speed: 500,
        slidesToShow: 5, // 每次顯示一個「頁面」
        slidesToScroll: 1, // 每次滾動一個「頁面」
        autoplay: false, // 自動播放
        autoplaySpeed: 3000, // 每 3 秒滾動一次
        // cssEase : "liner",
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            }],
        prevArrow: <CustomArrow arrowType="prev" isVisible={isHovered} />, // 自定義左箭頭
        nextArrow: <CustomArrow arrowType="next" isVisible={isHovered} />, // 自定義右箭頭
    };

    return (
        <>
            <div
                className="mx-auto relative"
                onMouseEnter={() => setIsHovered(true)} // 滑鼠進入
                onMouseLeave={() => setIsHovered(false)} // 滑鼠離開
            >
                <div className="w-4/5  mt-2 mx-auto items-center">
                    <strong className="inline text-3xl">猜你喜歡</strong>
                    <br />
                </div>
                <div className="w-4/5  mt-2 mx-auto items-center">
                    <div className="mx-auto">
                        <Slider {...settings}>
                            {/* 1 */}
                            {abc}{abc}{abc}{abc}{abc}{abc}{abc}{abc}{abc}{abc}
                            {/* 範例 */}
                            {/* <div className="relative ">
                                <div className="slide ">
                                    <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">
                                        <img src={Logo1} alt="Image 1" className="carousel-image" />
                                    </a>
                                </div>
                                <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                                    {isLiked ? <FaHeart size={35} color="red" onClick={() => setIsLiked(!isLiked)} /> : <CiHeart size={35} onClick={() => setIsLiked(!isLiked)} />}
                                </div>
                                <div className="cardbody ;">
                                    <p>TONSTAD </p>
                                    <p>邊桌, 淺乳白色, 64x40 公分</p>
                                </div>
                                <div className="flex  grid-cols-3">
                                    <div className="text-2xl text-center">${dataPrice}</div>
                                    <div className="text-1xl line-through text-left">${maxPrice}</div>
                                    <div className=""></div>
                                </div>
                            </div> */}
                        </Slider>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NewProduct