// by 大瑋
import Slider from "react-slick";
import React, { useState } from "react";

import mid5 from "../img/5.jpg";
import mid6 from "../img/6.jpg";
import mid7 from "../img/7.jpg";
import mid8 from "../img/8.jpg";
import mid9 from "../img/9.jpg";

    const CustomArrow = ({ className, style, onClick, arrowType , isVisible}) => (
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
        cssEase : "liner",
        prevArrow: <CustomArrow arrowType="prev"  isVisible={isHovered} />, // 自定義左箭頭
        nextArrow: <CustomArrow arrowType="next"  isVisible={isHovered} />, // 自定義右箭頭
      };  

       const slides = [
              {
                imageSrc: mid5,
                link: "https://example1.com"
              },
              {
                imageSrc: mid6,
                link: "https://example2.com"
              },
              {
                imageSrc: mid7,
                link: "https://example3.com"
              },
              {
                imageSrc: mid8,
                link: "https://example1.com"
              },
              {
                imageSrc: mid9,
                link: "https://example1.com"
              }
            ];
    
  return (
    <div
      style={{ width: "80%", margin: "0 auto", position: "relative" }}
      onMouseEnter={() => setIsHovered(true)} // 滑鼠進入
      onMouseLeave={() => setIsHovered(false)} // 滑鼠離開
    >
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index}>
          <a href={slide.link} target="_blank" rel="noopener noreferrer">
            <img
              src={slide.imageSrc}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </a>
          <br />
          <br />
          <br />
        </div>
        
      ))}
    </Slider>
  </div>
  )
}

export default Mid