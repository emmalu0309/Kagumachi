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
    cssEase: "liner",
    prevArrow: <CustomArrow arrowType="prev" isVisible={isHovered} />, // 自定義左箭頭
    nextArrow: <CustomArrow arrowType="next" isVisible={isHovered} />, // 自定義右箭頭
  };

  const slides = [
    {
      imageSrc: "mid5.jpg", // Replace with your image paths
      link: "https://example1.com",
      calink: "https://example1.com",
      title: "用心製作的手工藝品",
      description:
        "職人手工製作，質樸色調，簡單但富有傳統魅力，\n同時為需要的人創造就業機會。",

    },
    {
      imageSrc: "mid6.jpg",
      link: "https://example2.com",
      calink: "https://example1.com",
      title: "精美設計與實用性",
      description:
        "融合傳統與現代風格，手工藝品不僅美觀更實用。"
    },
    {
      imageSrc: "mid7.jpg",
      link: "https://example3.com",
      calink: "https://example1.com",
      title: "獨特的個人化作品",
      description:
        "每件手工製品都是獨一無二，適合作為珍貴的禮物。"
    },
    {
      imageSrc: "mid9.jpg",
      link: "https://example1.com",
      calink: "https://example1.com",
      title: "支持本地工匠",
      description:
        "購買手工藝品即是支持本地社區的成長與發展。"
    }
    ,
    {
      imageSrc: "mid9.jpg",
      link: "https://example1.com",
      calink: "https://example1.com",
      title: "支持本地工匠",
      description:
        "購買手工藝品即是支持本地社區的成長與發展。"
    }
    ,
    {
      imageSrc: "mid9.jpg",
      link: "https://example1.com",
      calink: "https://example1.com",
      title: "支持本地工匠",
      description:
        "購買手工藝品即是支持本地社區的成長與發展。"
    }
  ];

  return (
    <div
      className="p-3 w-4/5 mx-auto relative"
      onMouseEnter={() => setIsHovered(true)} // 滑鼠進入
      onMouseLeave={() => setIsHovered(false)} // 滑鼠離開
    >
      <Slider {...settings}>{slides.map((slide, index) => (
        <div
          key={index}
          className="relative max-w-lg mx-auto bg-yellow-600 text-white rounded-2xl overflow-hidden shadow-lg h-[400px]" 
        >
          <a href={slide.link} target="_blank" rel="noopener noreferrer">
            <div className="relative">
              <img
                src={slide.imageSrc}
                alt={slide.title}
                className="w-full object-cover h-64"
              />
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold mt-2 mb-4">{slide.title}</h1>
              <p className="text-gray-300 leading-relaxed">
                {slide.description}
              </p>
              {/* <button
                className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-full shadow hover:shadow-md hover:bg-gray-200 transition"
              >
                <a href={slide.calink}>➔</a>
              </button> */}
            </div>
          </a>
        </div>
      ))}</Slider>
    </div>
  )
}

export default Mid