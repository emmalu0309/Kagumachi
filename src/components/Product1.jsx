// by 大瑋
import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const Product1 = ({ dataname, productDetails, datalink, unitprice, discountprice, count, productid }) => {
    const { user } = useContext(AuthContext);
    //Emma
    const memberid = user ? user.memberId : null;

    // var memberid = user.memberId;
    // var [memberid, setMemberid] = useState(user.memberId);

    // var memberid = 101;
    // var memberid = null;

    //Emma
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        // if (memberid == null) {
        //     navigate(`/login`);
        // } else {
        //     if (isLiked) {
        //         removeFavorite();
        //     } else {
        //         addFavorite();
        //     }
        // }

        //Emma
        if (!user) {
            alert("請先登入");
            navigate(`/login`);
            return;
        }

        if (isLiked) {
            removeFavorite();
        } else {
            addFavorite();
        }
    };


    const fetchData = async () => {
        try {
            var response;
            response = await fetch(`http://localhost:8080/weikeep/test?memberid=${memberid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            // console.log(result);
            setData(result);
            // console.log(data[0].productid);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // 添加收藏
    const addFavorite = async () => {
        // try {
        //     const response = await fetch(`http://localhost:8080/weikeep`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ memberid, productid }),
        //     });
        //
        //     if (response.ok) {
        //         setIsLiked(true); // 更新收藏状态
        //     } else {
        //         console.error("Failed to add favorite");
        //     }
        // } catch (error) {
        //     console.error("Error:", error);
        // }

    //Emma
        if (!user) {
            alert("請先登入");
            navigate(`/login`);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/weikeep`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberid, productid }),
            });

            if (response.ok) {
                setIsLiked(true);
            } else {
                console.error("Failed to add favorite");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // 取消收藏
    const removeFavorite = async () => {
        // try {
        //     const response = await fetch(`http://localhost:8080/weikeep`, {
        //         method: "DELETE",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ memberid, productid }),
        //     });
        //
        //     if (response.ok) {
        //         setIsLiked(false); // 更新收藏状态
        //     } else {
        //         console.error("Failed to remove favorite");
        //     }
        // } catch (error) {
        //     console.error("Error:", error);
        // }

        //Emma
        if (!user) {
            alert("請先登入");
            navigate(`/login`);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/weikeep`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberid, productid }),
            });

            if (response.ok) {
                setIsLiked(false);
            } else {
                console.error("Failed to remove favorite");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const isProductLiked = data.some((item) => item.productid === productid);
        setIsLiked(isProductLiked);
    }, [data, productid]);



    return (
        <>

            <div className="mx-auto ">
                <div className="relative ">
                    <div className=" inline-block items-center">
                        <a
                            href={`http://localhost:5173/Kagumachi/productpage/${productid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            
                            <img
                                src={productDetails[0].dataimage}
                                alt={dataname}
                                className="w-45 h-45 object-contain rounded"
                            />
                        </a>
                    </div>
                    <div className="absolute top-1 right-5 text-2xl cursor-pointer">

                        <button onClick={handleLikeClick}>
                            {isLiked ? <FaHeart size={20} color="red" onClick={() => setIsLiked(!isLiked)} /> : <CiHeart size={20} onClick={() => setIsLiked(!isLiked)} />}
                        </button>
                    </div>
                    <div className="">
                        <p className="text-lg font-semibold">{dataname}</p>
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
                                    <a
                                        href={`http://localhost:5173/Kagumachi/productpage/${productid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
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
        </>
    )
}

export default Product1