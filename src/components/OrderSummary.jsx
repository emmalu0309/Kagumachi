import React, { useState } from "react";

function OrderSummary({ itemsCount, totalPrice, shippingFee, step, itemDetails }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // 計算應付金額（含運費與不含運費）
    const payableAmount = totalPrice;
    const payableAmountWithShipping = totalPrice + shippingFee;

    return (
        <div className="border-gray-200 pt-2 pb-2">
            {/* 收闔控制區域 */}
            <div className="flex justify-between items-center border-b pb-2">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xl font-bold"
                >
                    {isExpanded ? `商品明細 ▲` : `商品明細 ▼`}
                </button>
            </div>
            {/* 商品列表動畫容器 */}
            <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                {/* 商品列表 */}
                {itemDetails.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between border-b py-4"
                    >
                        <img
                            src={item.imageUrl}
                            className="w-20 h-20 object-cover"
                        />
                        <div className="flex-1 ml-4">
                            <p className="font-semibold">商品名稱：{item.productName}</p>
                            <p>商品顏色：{item.productColor}</p>
                            <p>商品規格：{item.productSpecs}</p>
                        </div>
                        <p className="w-[13%] pt-2">數量 {item.quantity}</p>
                        <p className="w-[13%] text-right">NT$ {item.price}</p>
                    </div>
                ))}
            </div>

            {/* 商品數量與金額 */}
            <div className="flex justify-end">
                <span className="w-[16%] py-2">共 {itemsCount} 件商品</span>
                <div className="w-[13%]">
                    <p className="py-2">商品金額</p>
                </div>
                <div className="w-[13%] text-right">
                    <p className="py-2">NT$ {totalPrice}</p>
                </div>
            </div>
            {/* 運費 (在非 CartStep2 顯示) */}
            {step !== "CartStep2" && (
                <div className="flex justify-end mb-2 border-b">
                    <span className="w-[13%]">運費</span>
                    <span className="w-[13%] text-right">NT$ {shippingFee}</span>
                </div>
            )}
            {/* 小計 */}
            <div className="flex justify-end">
                <span className="w-[13%] pt-2">
                    {step === "CartStep2" ? "未含運小計" : "含運小計"}
                </span>
                <p className="w-[13%] text-right pt-2">
                    NT$ {step === "CartStep2" ? payableAmount : payableAmountWithShipping}
                </p>
            </div>
        </div>
    );
}

export default OrderSummary;