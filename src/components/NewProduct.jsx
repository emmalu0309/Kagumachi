import Slider from "react-slick";
import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";

const CustomArrow = ({ className, style, onClick, arrowType, isVisible }) => (
    <button
        onClick={onClick}
        style={{
            ...style,
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)", // 半透明背景
            color: "#fff", // 按鈕文字顏色
            border: "none", // 移除邊框
            borderRadius: "50%", // 圓形按鈕
            width: "40px", // 按鈕寬度
            height: "40px", // 按鈕高度
            fontSize: "20px", // 按鈕內字體大小
            cursor: "pointer",
            display: isVisible ? "flex" : "none", // 控制按鈕是否顯示
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            ...(arrowType === "prev" ? { left: "10px" } : { right: "10px" }),
        }}
    >
        {arrowType === "prev" ? "❮" : "❯"}
    </button>
);

// 網站圖片
const Logo1 = 'https://www.ikea.com.tw/dairyfarm/tw/images/751/1375106_PE960171_S4.webp'

const NewProduct = () => {
    const [isHovered, setIsHovered] = useState(false); // 控制按鈕顯示狀態  
    const [isLiked, setIsLiked] = useState(false);
    const liked =() => setIsLiked(!isLiked);
    const maxPrice = '5000'; //商品價錢
    const dataPrice = '2999'; //商品價錢
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
                style={{ margin: "0 auto", position: "relative" }}
                onMouseEnter={() => setIsHovered(true)} // 滑鼠進入
                onMouseLeave={() => setIsHovered(false)} // 滑鼠離開
            >
                <div className="col12">
                    <strong style={{ fontSize: '30px', display: 'inline' }}>猜你喜歡</strong>
                    <br />
                </div>
                <div className="col12">
                    <div className="carousel-container">
                        <Slider {...settings}>
                            {/* 1 */}
                            <div className="relative ">
                                <div className="slide ">
                                    <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">
                                        <img src={Logo1} alt="Image 1" className="carousel-image" />
                                    </a>
                                </div>
                                <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                                    {isLiked ? <FaHeart size={35} color="red" onClick={() => setIsLiked(!isLiked)}/> : <CiHeart size={35} onClick={() => setIsLiked(!isLiked)}/>}
                                    {/* <FaHeart size={35} className={`absolute top-1 right-1 text-2xl cursor-pointer 
                                    `} */}
                                </div>
                                <div className="cardbody ;">
                                    <p>TONSTAD </p>
                                    <p>邊桌, 淺乳白色, 64x40 公分</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", }}>
                                    <div style={{ flex: 1, fontSize: '30px', textAlign: 'center' }}>${dataPrice}</div>
                                    <div style={{ flex: 1, fontSize: '20px', textDecoration: 'line-through', textAlign: 'left', alignItems: 'stretch' }}>${maxPrice}</div>
                                    <div style={{ flex: 1, }}></div>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="relative ">
                                <div className="slide">
                                    <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">
                                        <img src={Logo1} alt="Image 1" className="carousel-image" />
                                    </a>
                                </div>
                                <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                                    {isLiked ? <FaHeart size={35} color="red" onClick={() => setIsLiked(!isLiked)}/> : <CiHeart size={35} onClick={() => setIsLiked(!isLiked)}/>}
                                </div>
                                <div className="cardbody ;">
                                    <p>TONSTAD </p>
                                    <p>邊桌, 淺乳白色, 64x40 公分</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", }}>
                                    <div style={{ flex: 1, fontSize: '30px', textAlign: 'center' }}>${dataPrice}</div>
                                    <div style={{ flex: 1, fontSize: '20px', textDecoration: 'line-through', textAlign: 'left', alignItems: 'stretch' }}>${maxPrice}</div>
                                    <div style={{ flex: 1, }}></div>
                                </div>
                            </div>
                            {/* 3 */}
                            <div className="relative ">
                                <div className="slide ">
                                    <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">
                                        <img src={Logo1} alt="Image 1" className="carousel-image" />
                                    </a>
                                </div>
                                <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                                    {isLiked ? <FaHeart size={35} color="red" onClick={() => setIsLiked(!isLiked)}/> : <CiHeart size={35} onClick={() => setIsLiked(!isLiked)}/>}
                                </div>
                                <div className="cardbody ;">
                                    <p>TONSTAD </p>
                                    <p>邊桌, 淺乳白色, 64x40 公分</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", }}>
                                    <div style={{ flex: 1, fontSize: '30px', textAlign: 'center' }}>${dataPrice}</div>
                                    <div style={{ flex: 1, fontSize: '20px', textDecoration: 'line-through', textAlign: 'left', alignItems: 'stretch' }}>${maxPrice}</div>
                                    <div style={{ flex: 1, }}></div>
                                </div>
                            </div>
                            {/* 4 */}
                            <div className="relative ">
                                <div className="slide ">
                                    <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">
                                        <img src={Logo1} alt="Image 1" className="carousel-image" />
                                    </a>
                                </div>
                                <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                                    {isLiked ? <FaHeart size={35} color="red" onClick={() => setIsLiked(!isLiked)}/> : <CiHeart size={35} onClick={() => setIsLiked(!isLiked)}/>}
                                </div>
                                <div className="cardbody ;">
                                    <p>TONSTAD </p>
                                    <p>邊桌, 淺乳白色, 64x40 公分</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", }}>
                                    <div style={{ flex: 1, fontSize: '30px', textAlign: 'center' }}>${dataPrice}</div>
                                    <div style={{ flex: 1, fontSize: '20px', textDecoration: 'line-through', textAlign: 'left', alignItems: 'stretch' }}>${maxPrice}</div>
                                    <div style={{ flex: 1, }}></div>
                                </div>
                            </div>
                            {/* 5 */}
                            <div className="relative ">
                                <div className="slide ">
                                    <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">
                                        <img src={Logo1} alt="Image 1" className="carousel-image" />
                                    </a>
                                </div>
                                <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                                    {isLiked ? <FaHeart size={35} color="red" onClick={() => setIsLiked(!isLiked)}/> : <CiHeart size={35} onClick={() => setIsLiked(!isLiked)}/>}
                                </div>
                                <div className="cardbody ;">
                                    <p>TONSTAD </p>
                                    <p>邊桌, 淺乳白色, 64x40 公分</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", }}>
                                    <div style={{ flex: 1, fontSize: '30px', textAlign: 'center' }}>${dataPrice}</div>
                                    <div style={{ flex: 1, fontSize: '20px', textDecoration: 'line-through', textAlign: 'left', alignItems: 'stretch' }}>${maxPrice}</div>
                                    <div style={{ flex: 1, }}></div>
                                </div>
                            </div>
                            {/* 6 */}
                            <div className="relative ">
                                <div className="slide ">
                                    <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">
                                        <img src={Logo1} alt="Image 1" className="carousel-image" />
                                    </a>
                                </div>
                                <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                                    {isLiked ? <FaHeart size={35} color="red" onClick={() => setIsLiked(!isLiked)}/> : <CiHeart size={35} onClick={() => setIsLiked(!isLiked)}/>}
                                </div>
                                <div className="cardbody ;">
                                    <p>TONSTAD </p>
                                    <p>邊桌, 淺乳白色, 64x40 公分</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", }}>
                                    <div style={{ flex: 1, fontSize: '30px', textAlign: 'center' }}>${dataPrice}</div>
                                    <div style={{ flex: 1, fontSize: '20px', textDecoration: 'line-through', textAlign: 'left', alignItems: 'stretch' }}>${maxPrice}</div>
                                    <div style={{ flex: 1, }}></div>
                                </div>
                            </div>
                        </Slider>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NewProduct