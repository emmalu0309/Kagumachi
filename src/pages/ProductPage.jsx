import Carousel from "../components/Carousel"
import ProductCart from "../components/ProductCart"
import ProductDetail from "../components/ProductDetail";
import { IoIosArrowForward } from "react-icons/io";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

const ProductPage = () => {
    // const {products} = useContext(AuthContext);
    // const [selectedColor, setSelectedColor] = useState(colors[0] || null);
    //
    // // 預設選第一個顏色
    // useEffect(() => {
    //     // 當產品變更時，預設選擇第一個顏色
    //     if (colors.length > 0) {
    //         setSelectedColor(colors[0]);
    //     }
    // }, [product]);
    //
    // if (!products) {
    //     return <p>載入中...</p>;
    // }
    //
    // //等分類頁面好傳入資料
    // const product = products[0];
    // const colors = product.productColors || []; // 取得所有顏色



    const { products } = useContext(AuthContext);


    const [selectedColor, setSelectedColor] = useState(null);


    const product = products?.[0] ?? {};
    const colors = product.productColors ?? [];

    useEffect(() => {
        if (colors.length > 0) {
            setSelectedColor(colors[0]);
        }
    }, [colors]);

    if (!products || products.length === 0) {
        return <p>載入中...</p>;
    }



    return (
    <div className="w-[90%] mx-auto mt-[2%] ">
      <div className=" flex py-1 items-center ">
        <div className="p-3 text-gray-600 text-sm">{product.mainCategory.categoryname}</div>
        <IoIosArrowForward className="text-[#515156]" />
        <div className="p-3 text-gray-600 text-sm">{product.subCategory.categoryname}</div>
        
      </div>
      <div className="w-[100%] flex">
        <div className="w-[70%]">
          <Carousel selectedColor={selectedColor}/>
          <ProductDetail product={product} selectedColor={selectedColor}/>
        </div>
        <div className="w-[50%]">
          <ProductCart
              product={product}
              colors={colors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
          />
         
        </div>
      </div>
    </div>
  )
}

export default ProductPage