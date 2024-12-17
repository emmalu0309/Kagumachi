import  { useState, useEffect } from "react";
import Img1 from "../img/closet1.png";
import Img2 from "../img/closet2.png";
import Img3 from "../img/closet3.png";
import Img4 from "../img/closet4.png"
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Carousel = () => {
    const images = [Img1,Img2,Img3,Img4];
    
    const [currentIndex, setCurrentIndex] = useState(0);
  
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); 
  
      return () => clearInterval(interval); 
    }, [images.length]);
  
   
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    
    const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    return (
      <div className="relative h-[500px] overflow-hidden group">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((img, index) => (
              <div key={index} className="w-full flex-shrink-0  h-[500px]">
            <img key={index} src={img} alt={`Slide ${index + 1}`} className="object-contain w-full h-full" />
              </div>
          ))}
        </div>
       
        {currentIndex !== 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 border border-gray-400 text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <IoIosArrowBack/>
        </button>
        )}
        {currentIndex !== images.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 border border-gray-400 text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
         <IoIosArrowForward />
        </button>
          )}
       
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-black" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    );
  };

export default Carousel