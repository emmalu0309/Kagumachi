import {useState, useEffect, useContext} from "react";
import {IoIosArrowForward} from "react-icons/io";
import {IoIosArrowBack} from "react-icons/io";
import {AuthContext} from "../context/AuthContext.jsx";

const Carousel = ({ selectedColor}) => {

    const images = selectedColor ? selectedColor.productImages.map(img => img.imageurl) : [];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0); // 當顏色變更時重置索引
    }, [selectedColor]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (

        <div className="relative h-[500px] overflow-hidden group">
            <div className="flex transition-transform duration-500"
                 style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                {images.map((img, index) => (
                    <div key={index} className="w-full flex-shrink-0 h-[500px]">
                        <img src={img} alt={`Slide ${index + 1}`} className="object-contain w-full h-full"/>
                    </div>
                ))}
            </div>

            <button onClick={() => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-gray-400 text-gray-600 flex items-center justify-center">
                <IoIosArrowBack/>
            </button>
            <button onClick={() => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-gray-400 text-gray-600 flex items-center justify-center">
                <IoIosArrowForward/>
            </button>

        </div>

    )
        ;
};

export default Carousel


