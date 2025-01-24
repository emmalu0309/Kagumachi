import Carousel from "../components/Carousel"
import ProductCart from "../components/ProductCart"
import ProductDetail from "../components/ProductDetail";
import { IoIosArrowForward } from "react-icons/io";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {useParams} from "react-router-dom";

const ProductPage = () => {

    const { productid } = useParams(); // 獲取 URL 中的 `productid`
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/${productid}`);
                if (!response.ok) throw new Error("商品數據獲取失敗");

                const data = await response.json();
                setProduct(data);

                if (data.productColors.length > 0) {
                    setSelectedColor(data.productColors[0]);
                }
            } catch (error) {
                console.error("錯誤:", error);
            }
        };

        fetchProduct();
    }, [productid]);

    if (!product) {
        return <p>載入中...</p>;
    }

    return (
        <div className="w-[90%] mx-auto mt-[2%] ">
          <div className=" flex py-1 items-center ">
            <div className="p-3 text-gray-600 text-sm">
                {product.mainCategory?.categoryname || "無主類別"}
            </div>
            <IoIosArrowForward className="text-[#515156]" />
            <div className="p-3 text-gray-600 text-sm">
                {product.subCategory?.categoryname || "無副類別"}
            </div>

          </div>
          <div className="w-[100%] flex">
            <div className="w-[70%]">
              <Carousel selectedColor={selectedColor}/>
              <ProductDetail product={product} selectedColor={selectedColor}/>
            </div>
            <div className="w-[50%]">
              <ProductCart
                  product={product}
                  colors={product.productColors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
              />

            </div>
          </div>
        </div>

    )
}

export default ProductPage



