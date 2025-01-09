// by 大瑋
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import Product1 from "./Product1";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const CustomArrow = ({ className, style, onClick, arrowType, isVisible }) => (
    <button
        onClick={onClick}
        className={`absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none rounded-full w-10 h-10 text-xl cursor-pointer flex items-center justify-center z-10 ${arrowType === "prev" ? "left-2" : "right-2"
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

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/test/test3');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);

            // setData({
            //         dataname: result.dataname,
            //         dataimage: result.dataimage,
            //         datalink: result.datalink,
            //         dataprice: result.dataprice,
            //         originalprice: result.originalprice
            //     });
            setData(result);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const product1list = data.map((item) => {
        return <Product1 dataname={item.dataname}
            dataimage={item.dataimage}
            datalink={item.datalink}
            dataprice={item.dataprice}
            originalprice={item.originalprice} />
    })

    // const maxPrice = '5000'; //商品價錢
    // const dataPrice = '2999'; //商品價錢
    // const abc = <Product1 />;
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
                        {product1list}
                            {/* <div className="w-4/5  mt-2 mx-auto items-center ">
                                <div className="mx-auto ">
                                    <div className="relative ">
                                        <div className="inline-block items-center" >
                                            
                                            <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer"> 
                                            <a href={data.datalink} target="_blank" rel="noopener noreferrer">
                                                <img src={Logo1} alt="Image 1" className="w-62 h-50 object-contain rounded " /> 
                                                <img
                                                    src={data.dataimage}
                                                    alt={data.dataname}
                                                    className="w-62 h-50 object-contain rounded"
                                                />
                                            </a>

                                        </div>
                                        <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                                            {isLiked ? <FaHeart size={35} color="red" onClick={() => setIsLiked(!isLiked)} /> : <CiHeart size={35} onClick={() => setIsLiked(!isLiked)} />}
                                        </div>
                                        <div className="cardbody">
                                            <p>TONSTAD </p>
                                            <p>邊桌, 淺乳白色, 64x40 公分</p>
                                            <p>{data.dataname}</p>
                                            <p>{data.description}</p>
                                        </div>
                                        <div className="flex  grid-cols-3">
                                            <div className="text-2xl text-center">${dataPrice}</div>
                                                        <div className="text-1xl line-through text-left">${maxPrice}</div>
                                            <div className="text-2xl text-center">{data.dataprice}</div>
                                            <div className="text-1xl line-through text-left">{data.originalprice}</div>
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
                            </div> */}
                        </Slider>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NewProduct