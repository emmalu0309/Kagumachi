// by 大瑋
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import Product1 from "./Product1";


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
            const response = await fetch('http://localhost:8080/myhome');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            setData(result);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    // const product1list = data.map((item,index) => {
    //     return <Product1 dataname={item.dataname}
    //         productid={item.productid}
    //         // supplierid={item.supplierid}
    //         // dataimage={item.dataimage}
    //         // datalink={item.datalink}
    //         unitprice={item.unitprice}
    //         discountprice={item.discountprice} 
    //         productDetails={item.productdetails}
    //         count={item.count}
    //         />
    // })


    const product1list = data.map((item, index) => {
        return (
            <Product1
                key={item.productid || index} // 添加唯一的 key
                dataname={item.dataname}
                productid={item.productid}
                // supplierid={item.supplierid}
                // dataimage={item.dataimage}
                // datalink={item.datalink}
                unitprice={item.unitprice}
                discountprice={item.discountprice}
                productDetails={item.productdetails}
                count={item.count}
            />
        );
    });

    const settings = {
        dots: true, // 顯示下方點點
        infinite:false, // 無限循環
        speed: 500,
        slidesToShow: 5, // 每次顯示一個「頁面」
        slidesToScroll: 2, // 每次滾動一個「頁面」
        autoplay: false, // 自動播放
        autoplaySpeed: 5000, // 每 3 秒滾動一次
        cssEase: "linear", 
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
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
                    <strong className="inline text-3xl">新品上市</strong>
                    <br />
                </div>
                <div className="w-4/5  mt-2 mx-auto items-center mb-10 ">
                    <div  className="mx-auto">
                        <Slider {...settings}>
                        {product1list}
                        </Slider>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NewProduct