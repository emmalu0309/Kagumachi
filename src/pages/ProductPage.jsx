import Carousel from "../components/Carousel"
import ProductCart from "../components/ProductCart"
import ProductDetail from "../components/ProductDetail";
import { IoIosArrowForward } from "react-icons/io";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";

const ProductPage = () => {

    const { productid } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const navigate = useNavigate(); // 定義 navigate



    const handleClick = (relatedProductId) => {
        navigate(`/productpage/${relatedProductId}`); // 讓它跳轉到該產品的詳細頁面
    };

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

    useEffect(() => {
        if (product?.mainCategory?.maincategoryid) {
            fetchRelatedProducts(product.mainCategory.maincategoryid, product.productid);
        }
    }, [product]);

    const fetchRelatedProducts = async (maincategoryid, currentProductId) => {
        if (!maincategoryid) {
            console.error(" 無法獲取同分類產品，因為 maincategoryid 是 null");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/products/byMainCategory/${maincategoryid}`);
            if (!response.ok) throw new Error("無法獲取同分類產品");

            const data = await response.json();

            const filteredProducts = data.filter(p => p.productid !== currentProductId);
            setRelatedProducts(filteredProducts);
        } catch (error) {
            console.error("獲取同分類產品時發生錯誤:", error);
        }
    };


    if (!product) {
        return <p>載入中...</p>;
    }

    return (
        <div className="w-[90%] mx-auto mt-[2%] ">
            <div className=" flex py-1 items-center ">
                <div className="p-3 text-gray-600 text-sm">
                    {product.mainCategory?.categoryname || "無主類別"}
                </div>
                <IoIosArrowForward className="text-[#515156]"/>
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

            <div className="grid grid-cols-5 gap-6 mt-14">
                {relatedProducts
                    .filter((related) => related.productColors?.length > 0)
                    .slice(0, 10)
                    .map((related) => (
                        <div
                            key={related.productid} className="text-center"
                            onClick={() => handleClick(related.productid)}
                        >
                            <img
                                src={related.productColors[0]?.productImages?.[0]?.imageurl || "https://via.placeholder.com/150"}
                                alt={related.productname}
                                className="w-full h-80 object-cover"
                            />
                            <p className="font-bold mt-2">{related.productname}</p>
                            <p className="font-bold text-lg">
                                NT${related.discountprice || related.unitprice}
                            </p>
                        </div>
                    ))}
            </div>
        </div>

    )
}

export default ProductPage



