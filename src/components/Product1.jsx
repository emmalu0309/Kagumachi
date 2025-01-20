// by 大瑋
import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";


const Product1 = ({ dataname, productDetails, datalink, unitprice, discountprice, count, productid }) => {
    const [isLiked, setIsLiked] = useState(false);
    const liked = () => setIsLiked(!isLiked);

    // console.log(productDetails);

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
                            {isLiked ? <FaHeart size={30} color="red" onClick={() => setIsLiked(!isLiked)} /> : <CiHeart size={30} onClick={() => setIsLiked(!isLiked)} />}
                        </div>
                        <div className="">
                            <p className="text-xl font-semibold">{dataname}</p>
                            {/* <p className="text-lg">{supplierid}</p> */}
                        </div>
                        <div className="flex  grid-cols-3 ">
                            <div className="text-2xl text-center  font-bold mr-2">${discountprice}</div>
                            {/* <div className="text-1xl line-through text-center ">{unitprice}</div> */}
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