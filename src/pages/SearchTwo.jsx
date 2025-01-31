// by 大瑋
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Product1 from "../components/Product1";

const PAGE_SIZE = 16; // 每頁顯示的商品數量


export default function SearchTwo() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const categoryMap = {
        '衣櫃': { main: 1, sub: 1 },
        '鞋櫃': { main: 1, sub: 2 },
        '書櫃': { main: 1, sub: 3 },
        '櫥櫃': { main: 1, sub: 4 },
        '電視櫃': { main: 1, sub: 5 },
        '浴櫃': { main: 1, sub: 6 },
        '餐桌': { main: 2, sub: 7 },
        '茶几': { main: 2, sub: 8 },
        '書桌': { main: 2, sub: 9 },
        '升降桌': { main: 2, sub: 10 },
        '餐椅': { main: 3, sub: 11 },
        '小椅凳': { main: 3, sub: 12 },
        '辦公椅': { main: 3, sub: 13 },
        '電競椅': { main: 3, sub: 14 },
        '吧台椅': { main: 3, sub: 15 },
        '單人沙發': { main: 4, sub: 16 },
        '雙人沙發': { main: 4, sub: 17 },
        'L型沙發': { main: 4, sub: 18 },
        '吸頂燈': { main: 5, sub: 19 },
        '吊燈': { main: 5, sub: 20 },
        '檯燈': { main: 5, sub: 21 },
        '壁燈': { main: 5, sub: 22 },
        '床架': { main: 6, sub: 23 },
        '床墊': { main: 6, sub: 24 },
        '床包/棉被/枕頭': { main: 6, sub: 25 }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [priceRange, setPriceRange] = useState("");
    const [product1list, setProduct1list] = useState([]);

    const [totalPages, settotalPages] = useState(1);
    const [startIndex, setstartIndex] = useState(0);
    const [currentProducts, setcurrentProducts] = useState([]);

    const fetchData = async () => {
        var { main, sub } = categoryMap[query] || { main: 0, sub: 0 };

        try {
            var response;
            if (!priceRange) {
                response = await fetch(`http://localhost:8080/mysearchtwo/stwo/${main}/${sub}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } else {
                response = await fetch(`http://localhost:8080/mysearchtwo/stwo/${main}/${sub}/${priceRange}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            }

            const result = await response.json();
            if (result.length != 0) {
                setCount(result[0].count);
                setData(result);
            } else {
                setCount(0);
                setData([]);
            }
            // console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // useEffect(() => {
    //     fetchData();
    //     setCurrentPage(1);
    // }, [query, priceRange]);

    // useEffect(() => {
    //     fetchData();
    // }, [query, priceRange, data]);

    // // const totalPages = Math.ceil(data.length / PAGE_SIZE); 
    // // const startIndex = (currentPage - 1) * PAGE_SIZE;
    // // const currentProducts = data.slice(startIndex, startIndex + PAGE_SIZE); 
    // // const product1list = currentProducts.map((item) => {
    // //     return (
    // //         <Product1
    // //             //Emma
    // //             key={item.productid}
    // //             dataname={item.dataname}
    // //             productid={item.productid}
    // //             // supplierid={item.supplierid}
    // //             // dataimage={item.dataimage}
    // //             // datalink={item.datalink}
    // //             unitprice={item.unitprice}
    // //             discountprice={item.discountprice}
    // //             productDetails={item.productdetails}
    // //             count={item.count}
    // //         />
    // //     );
    // // });

    // useEffect(() => {
    //     settotalPages(Math.ceil(data.length / PAGE_SIZE)==0?1:Math.ceil(data.length / PAGE_SIZE));
    //     setstartIndex((currentPage - 1) * PAGE_SIZE);
    //     setcurrentProducts(data.slice(startIndex, startIndex + PAGE_SIZE));
    //     setProduct1list(currentProducts.map((item) => (
    //         <Product1
    //             key={item.productid}
    //             dataname={item.dataname}
    //             productid={item.productid}
    //             unitprice={item.unitprice}
    //             discountprice={item.discountprice}
    //             productDetails={item.productdetails}
    //             count={item.count}
    //         />
    //     )));
    // }, [data, query, priceRange]);


    useEffect(() => {
        fetchData();
        setCurrentPage(1);
    }, [query, priceRange]);


    useEffect(() => {
        const total = Math.ceil(data.length / PAGE_SIZE);
        settotalPages(total === 0 ? 1 : total);
    
        const startIdx = (currentPage - 1) * PAGE_SIZE;
        const slicedProducts = data.slice(startIdx, startIdx + PAGE_SIZE);
    
        setcurrentProducts(slicedProducts); 
    
        setProduct1list(slicedProducts.map((item) => (
            <Product1
                key={item.productid}
                dataname={item.dataname}
                productid={item.productid}
                unitprice={item.unitprice}
                discountprice={item.discountprice}
                productDetails={item.productdetails}
                count={item.count}
            />
        )));
    }, [data, currentPage]);


    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const [filter, setFilter] = useState("排序方式");

    const handleFilterChange = (event) => {
        const selectedValue = event.target.value;
        setFilter(selectedValue);

        let sortedData = [...data];
        if (selectedValue === '低到高') {
            sortedData.sort((a, b) => a.discountprice - b.discountprice);
        } else if (selectedValue === '高到低') {
            sortedData.sort((a, b) => b.discountprice - a.discountprice);
        }
        setData(sortedData);
    };

    const priceFilterChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setPriceRange(selectedValue);
        
    };

    // useEffect(() => {
    //     // console.log("Current Page:", currentPage);
    //     // console.log("Total Pages:", totalPages);
    //     // setCurrentPage(1);
    // }, [currentPage, totalPages]);

    return (
        <>
            <div className="p-2 w-11/12 mx-auto ">
                <div className="flex items-center  w-11/12  mx-auto text-base p-2">
                    <div>
                        <a href="http://localhost:5173/Kagumachi/">首頁&nbsp;&nbsp;</a>
                    </div>
                    &gt;&nbsp;&nbsp;{query}
                </div>

                <div className="flex items-center justify-normal mb-2  p-2 mx-auto w-11/12 ">
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        className="border rounded-xl px-2 py-1 ">
                        <option value="排序方式">排序方式</option>
                        <option value="低到高">低到高</option>
                        <option value="高到低">高到低</option>
                    </select>

                    <select
                        value={priceRange}
                        onChange={priceFilterChange}
                        className="border rounded-xl px-2 py-1 mx-4">
                        <option value="篩選">篩選</option>
                        <option value='500'>500以下</option>
                        <option value='3000'>3000以下</option>
                        <option value='5000'>5000以下</option>
                    </select>

                    <div className=" absolute left-3/4">產品數量:{count}</div>

                </div>

                <div className="mt-2 flex justify-end space-x-4  w-11/12 mx-auto">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-300 text-white rounded disabled:bg-gray-100"
                    >
                        &lt;
                    </button>
                    <span className="text-lg">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-300 text-white rounded disabled:bg-gray-100"
                    >
                        &gt;
                    </button>
                </div>
                <h1 className="text-xl font-bold mb-4 p-2 w-11/12 mx-auto">商品列表</h1>
            </div>
            <div className=" w-[80vw] mx-auto grid grid-cols-4 gap-4">
                {product1list}
            </div>
        </>
    );
}