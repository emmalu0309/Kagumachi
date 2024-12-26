// by 大瑋
import React, { useState } from "react";
const Logo1 = 'https://www.ikea.com.tw/dairyfarm/tw/images/751/1375106_PE960171_S4.webp'
const bigla = '椅子';
const PAGE_SIZE = 16; // 每頁顯示的商品數量

export default function SearchThree() {
    const count = 100;
    const [currentPage, setCurrentPage] = useState(1);
    const products = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `商品 ${i + 1}`,
        price: 100,
        // img:<img src={Logo1} alt="Image 1" className="carousel-image" />
    }));

    const totalPages = Math.ceil(products.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const currentProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

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
    const handleFilterChange = (e) => setFilter(e.target.value);
    const bigla = '椅子';


    return (
        <div className="p-2 w-11/12 mx-auto">
            <div className="flex items-center justify-between border w-11/12  mx-auto text-base p-2">
                <div>"{bigla}"搜尋結果</div>
            </div>

            <div className="flex items-center justify-normal mb-2 border p-2 mx-auto w-11/12 ">
                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="border rounded-xl px-2 py-1 ">
                    <option value="排序方式">排序方式v</option>
                    <option value="選項一">選項一</option>
                    <option value="選項二">選項二</option>
                </select>

                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="border rounded-xl px-2 py-1 mx-4">
                    <option value="排序方式">篩選</option>
                    <option value="選項一">選項一</option>
                    <option value="選項二">選項二</option>
                </select>

                <div className=" absolute left-3/4">產品數量:{count}</div>

            </div>

            <div className="mt-2 flex justify-end space-x-4 border w-11/12 mx-auto">
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4 w-11/12 mx-auto">
                {currentProducts.map((product) => (
                    <div
                        key={product.id}
                        className="p-4 border rounded shadow hover:shadow-lg"
                    >
                        <h2 className="font-bold text-lg">{product.name}</h2>
                        <p className="text-gray-700">${product.price}</p>
                        <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">
                            <img src={Logo1} alt="Image 1" className="carousel-image" />
                        </a>
                    </div>
                ))}
            </div>

           

        </div>
    );
}