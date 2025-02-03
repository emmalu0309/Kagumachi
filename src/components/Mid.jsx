// by 大瑋
import Slider from "react-slick";
import React, { useState } from "react";

import mid5 from "../img/5.jpg";
import mid6 from "../img/6.jpg";
import mid7 from "../img/7.jpg";
import mid8 from "../img/8.jpg";
import mid9 from "../img/9.jpg";

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

const Mid = () => {
  const [isHovered, setIsHovered] = useState(false); // 控制按鈕顯示狀態  

  const settings = {
    dots: true,          // 顯示導航點
    infinite: false,      // 無限循環
    speed: 500,          // 切換速度
    slidesToShow: 3,     // 每次顯示一張圖片
    slidesToScroll: 1,   // 每次滾動一張圖片
    autoplay: false,      // 自動播放
    autoplaySpeed: 4000, // 自動播放間隔時間 (毫秒)
    cssEase: "linear", 
    // centerMode: false, // 讓中間的卡片置中，並且有間隔
    // centerPadding: "50px", // 設定卡片間距
    // responsive: [
    //   {
    //     breakpoint: 700,
    //     settings: {
    //       slidesToShow: 2,
    //       centerPadding: "30px",
    //     }
    //   },
    //   {
    //     breakpoint: 500,
    //     settings: {
    //       slidesToShow: 1,
    //       centerPadding: "20px",
    //     }
    //   }
    // ],
    prevArrow: <CustomArrow arrowType="prev" isVisible={isHovered} />, // 自定義左箭頭
    nextArrow: <CustomArrow arrowType="next" isVisible={isHovered} />, // 自定義右箭頭
  };

  const slides = [
    {
      imageSrc: "https://www.ikea.com.tw/dairyfarm/tw/images/561/0956136_PE804547_S4.webp", 
      link: "http://localhost:5173/Kagumachi/productpage/21",
      calink: "http://localhost:5173/Kagumachi/SearchTwo?query=鞋櫃",
      title: "用心製作的質感櫃子",
      description:
        "融合精緻工藝與實用設計，兼具美觀與耐用性。\n無論收納或裝飾，都能完美融入各種空間，讓生活更有質感。",

    },
    {
      imageSrc: "https://www.ikea.com.tw/dairyfarm/tw/images/520/1352026_PE952104_S4.webp",
      link: "http://localhost:5173/Kagumachi/productpage/107",
      calink: "http://localhost:5173/Kagumachi/SearchTwo?query=餐桌",
      title: "精美設計與實用性的流行桌子",
      description:
        "時尚設計與實用性兼具，精選優質材質，適合各種空間風格，\n讓居家或辦公環境更具品味與質感。"
    },
    {
      imageSrc: "https://www.ikea.com.tw/dairyfarm/tw/images/155/1115595_PE872151_S4.webp",
      link: "http://localhost:5173/Kagumachi/productpage/260",
      calink: "http://localhost:5173/Kagumachi/SearchTwo?query=餐椅",
      title: "設計美學與舒適兼具的時尚椅子",
      description:
        "融合美學與舒適設計，精選優質材質，兼具耐用性與時尚感，\n無論居家或辦公皆能提升空間品味。"
    },
    {
      imageSrc: "https://www.ikea.com.tw/dairyfarm/tw/images/902/0690241_PE723168_S4.webp",
      link: "http://localhost:5173/Kagumachi/productpage/215",
      calink: "http://localhost:5173/Kagumachi/SearchTwo?query=L型沙發",
      title: "舒適與美感完美結合的實用沙發",
      description:
        "兼具舒適與美感，精選優質材質，提供絕佳支撐與放鬆體驗，\n完美融入各種居家風格。"
    }
    ,
    {
      imageSrc: "https://www.ikea.com.tw/dairyfarm/tw/images/862/1286246_PE933515_S4.webp",
      link: "http://localhost:5173/Kagumachi/productpage/261",
      calink: "http://localhost:5173/Kagumachi/SearchTwo?query=檯燈",
      title: "點亮空間的時尚之選的超美燈具",
      description:
        "獨特設計與精緻工藝結合，為空間增添溫暖與風格，\n照亮每個角落，提升居家氛圍。"
    }
    ,
    {
      imageSrc: "https://www.ikea.com.tw/dairyfarm/tw/images/019/1101955_PE866881_S4.webp",
      link: "http://localhost:5173/Kagumachi/productpage/233",
      calink: "http://localhost:5173/Kagumachi/SearchTwo?query=床架",
      title: "打造優質睡眠體驗的舒適寢具",
      description:
        "選用高品質材質，提供完美支撐與柔軟觸感，幫助打造舒適的睡眠環境，\n讓每個夜晚都能享受深度休息。"
    }
  ];

  return (
    <div
      className=" w-4/5 mx-auto  gap-6  flex-row " 
      onMouseEnter={() => setIsHovered(true)} // 滑鼠進入
      onMouseLeave={() => setIsHovered(false)} // 滑鼠離開
    >
      <Slider {...settings}>{slides.map((slide, index) => (
        <div
          key={index}
          className="relative max-w-md mx-4 bg-color1 text-white rounded-2xl overflow-hidden shadow-lg h-[450px] " 
        >
          <a href={slide.link}>
            <div className="relative">
              <img
                src={slide.imageSrc}
                alt={slide.title}
                className="w-full object-cover h-64"
              />
            </div>
            <div className="p-5">
              <h1 className="text-2xl font-bold mt-2 mb-4">{slide.title}</h1>
              <p className="text-gray-300 leading-relaxed">
                {slide.description}
              </p>
              <button
                className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-full shadow hover:shadow-md hover:bg-gray-200 transition"
              >
                <a href={slide.calink}>➔</a>
              </button>
            </div>
          </a>
        </div>
      ))}</Slider>
    </div>
  )
}

export default Mid