// by 大瑋(綁Navbar)
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Product1 from "../components/Product1";

const PAGE_SIZE = 16; // 每頁顯示的商品數量


export default function SearchOne() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [priceRange, setPriceRange] = useState(null);
    

    const fetchData = async () => {
        try {
            var response;
            if(!priceRange){
                console.log('無職');
                response = await fetch(`http://localhost:8080/mysearch/sone/${query}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            }else{
                console.log('有職');
                response = await fetch(`http://localhost:8080/mysearch/sone/${query}/${priceRange}`, {
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
            console.log(result);
            setCount(result[0].count);
            setData(result);
            // console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query,priceRange]);



    const product1list = data.map((item) => {
        return <Product1 dataname={item.dataname}
        productid={item.productid}
        // supplierid={item.supplierid}
        // dataimage={item.dataimage}
        // datalink={item.datalink}
        // unitprice={item.unitprice} />
        discountprice={item.discountprice} 
        productDetails={item.productdetails}
        count={item.count}
        />
    })



    const totalPages = Math.ceil(count / PAGE_SIZE);
    // const startIndex = (currentPage - 1) * PAGE_SIZE;
    // const currentProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const [filter, setFilter] = useState("排序方式");

    const handleFilterChange = (event) => {
        const selectedValue = event.target.value;
        setFilter(selectedValue);

        let sortedData = [...data];
        if (selectedValue === '低到高') {
            sortedData.sort((a, b) => a.dataprice - b.dataprice);
        } else if (selectedValue === '高到低') {
            sortedData.sort((a, b) => b.dataprice - a.dataprice);
        }
        setData(sortedData); // 
    };

    const priceFilterChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setPriceRange(selectedValue);
        console.log(selectedValue);
        
    };



    return (
        <>
            <div className="p-2 w-11/12 mx-auto ">
                <div className="flex items-center justify-between  w-11/12  mx-auto text-base p-2">
                    <div className="text-xl ">"{query}"搜尋結果</div>
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

                    {/* <div className="relative">
                        <button
                            onClick={toggleSidebar}
                            className="border rounded-xl px-2 py-1 mx-4">
                            篩選
                        </button>

                        <div
                            className={`fixed top-0 right-0 h-full bg-white border-l shadow-lg p-4 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                                } w-1/4 z-50`}>
                            <h3 className="text-xl font-bold mb-4">篩選</h3>
                            <div>
                                <label className="block mb-2">
                                    <input type="checkbox" className="mr-2" /> 再創低價
                                </label>
                                <label className="block mb-2">
                                    <input type="checkbox" className="mr-2" /> 可供線上購買
                                </label>
                                
                            </div>
                            <div className="mt-auto flex justify-between items-center">
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                >
                                    清除
                                </button>
                                <button
                                    onClick={viewResults}
                                    className="px-4 py-2 bg-black text-white rounded"
                                >
                                    查看 (41)
                                </button>
                            </div>
                        </div>
                    </div>*/}
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