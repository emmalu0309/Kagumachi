// by 大瑋
import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Product1 = ({ dataname, productDetails, datalink, unitprice, discountprice, count, productid }) => {
    // const { user } = useContext(AuthContext);
    // const memberId = user.memberId;

    const [isLiked, setIsLiked] = useState(false);
    const liked = () => setIsLiked(!isLiked);

    const [products, setProducts] = useState([]); // 存储所有产品
    const [favorites, setFavorites] = useState([]); // 存储已收藏产品的 ID

    // useEffect(() => {
    //     // 获取产品列表
    //     fetch('http://localhost:8080/myhome/test')
    //         .then(response => response.json())
    //         .then(data => setProducts(data))
    //         .catch(error => console.error('Error fetching products:', error));
    
    //     // 获取收藏的产品 ID 列表
    //     fetch('http://localhost:8080/weikeep/test')
    //         .then(response => response.json())
    //         .then(data => {
    //             if (Array.isArray(data)) {
    //                 setFavorites(data.map(item => item.productid));
    //             } else {
    //                 console.error('Expected an array but got:', data);
    //                 setFavorites([]);
    //             }
    //         })
    //         .catch(error => console.error('Error fetching favorites:', error));
    // }, []);

    // const toggleFavorite = async (productId) => {
    //     const isFavorited = favorites.includes(productId);
    //     const method = isFavorited ? 'DELETE' : 'POST';

    //     try {
    //         const response = await fetch(`http://localhost:8080/weikeep/${productId}`, {
    //             method: method,
    //             headers: { 'Content-Type': 'application/json' }
    //         });

    //         if (response.ok) {
    //             setFavorites(prevFavorites => {
    //                 if (isFavorited) {
    //                     // 移除收藏
    //                     return prevFavorites.filter(id => id !== productId);
    //                 } else {
    //                     // 添加收藏
    //                     return [...prevFavorites, productId];
    //                 }
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };



    return (
        <>
            <div className="w-4/5  mt-2 mx-auto items-center ">
                <div className="mx-auto ">
                    <div className="relative ">
                        <div className=" inline-block items-center">
                            <a href={datalink} target="_blank" rel="noopener noreferrer">
                                {/* <img src={Logo1} alt="Image 1" className="w-62 h-50 object-contain rounded " />  */}
                                <img
                                    src={productDetails[0].dataimage}
                                    alt={dataname}
                                    className="w-40 h-40 object-contain rounded"
                                />
                            </a>
                        </div>
                        <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                            {/* {isLiked ? <FaHeart size={30} color="red" onClick={() => setIsLiked(!isLiked)} /> : <CiHeart size={30} onClick={() => setIsLiked(!isLiked)} />} */}
                            <button
                                onClick={() => toggleFavorite(dataname.id)}
                                className={`p-2 ${favorites.includes(dataname.id) ? 'text-red-500' : 'text-gray-500'}`}
                            >
                                {favorites.includes(dataname.id) ? <FaHeart size={30} color="red" />: <CiHeart size={30}/> }
                            </button>
                        </div>
                        <div className="">
                            <p className="text-xl font-semibold">{dataname}</p>
                            {/* <p className="text-lg">{supplierid}</p> */}
                        </div>
                        <div className="flex  grid-cols-3 ">
                            <div className="text-2xl text-center  font-bold mr-2">{(discountprice == unitprice ? "" : discountprice)}</div>
                            {/* <div className="text-1xl  line-through text-center" >{unitprice}</div> */}
                            <div className={(discountprice == unitprice) ? "text-2xl text-center font-bold" : "text-1xl  line-through text-center"} >{unitprice}</div>
                            {/* <div className="ml-2">優惠價</div> */}
                        </div>

                        <div className="inline-flex">
                            <div>
                                {productDetails.map((detail, index) => (
                                    <div key={index} className="mr-3 inline-flex">
                                        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                                            <button className="w-10 h-10  rounded-3xl">
                                                <img src={detail.dataimage} alt={`Product ${index + 1}`} className="w-full h-full object-fill" />
                                            </button>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Product1