import Carousel from "../components/Carousel"
import ProductCart from "../components/ProductCart"
import ProductDetail from "../components/ProductDetail";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";

const ProductPage = () => {

    const {productid} = useParams();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const scrollRef = useRef(null);

    const navigate = useNavigate();


    const handleClick = (relatedProductId) => {
        navigate(`/productpage/${relatedProductId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 1000;
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 1000;
        }
    };

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


            <div className="relative mt-14">
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 shadow-md rounded-full z-10"
                    onClick={scrollLeft}
                >
                    <IoIosArrowBack size={30}/>
                </button>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto scrollbar-hide space-x-6 p-2"
                    style={{scrollBehavior: "smooth"}}
                >
                    {relatedProducts.slice(0, 20).map((related) => {
                        const productImages = related.productColors[0]?.productImages || [];
                        const firstImage = productImages[0]?.imageurl || "https://via.placeholder.com/150";
                        const secondImage = productImages[1]?.imageurl || firstImage;

                        return (
                            <div
                                key={related.productid}
                                className="text-center cursor-pointer min-w-[300px] "
                                onClick={() => handleClick(related.productid)}
                                onMouseEnter={() => setHoveredProduct(related.productid)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <img
                                    src={hoveredProduct === related.productid ? secondImage : firstImage}
                                    alt={related.productname}
                                    className="w-[200px] h-[300px] object-contain rounded-lg transition-all duration-300 mx-auto"
                                />
                                <p className="font-bold mt-2">{related.productname}</p>
                                <p className="font-bold text-lg">
                                    {related.discountprice === related.unitprice ? (
                                        <>NT${related.unitprice}</>
                                    ) : (
                                        <>
                                            <span className="text-red-500">NT${related.discountprice}</span>
                                            <span
                                                className="text-gray-500 line-through ml-2">NT${related.unitprice}</span>
                                        </>
                                    )}
                                </p>


                                {related.productColors.length > 1 && (
                                    <div className="flex justify-center gap-2 mt-2">
                                        {related.productColors.map((color, index) => (
                                            <img
                                                key={index}
                                                src={color.productImages[0]?.imageurl || "https://via.placeholder.com/50"}
                                                alt={color.colorname}
                                                className="w-10 h-10 object-cover rounded-md cursor-pointer hover:border-black"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setHoveredProduct(related.productid);
                                                    setSelectedColor(color);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}

                            </div>
                        );
                    })}
                </div>

                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 shadow-md rounded-full z-10"
                    onClick={scrollRight}
                >
                    <IoIosArrowForward size={30}/>
                </button>
            </div>

        </div>

    )
}

export default ProductPage



