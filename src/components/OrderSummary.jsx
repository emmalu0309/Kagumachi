import React from "react";

function OrderSummary({ itemsCount, totalPrice, shippingFee, discount, step, payableAmount }) {
    // const payableAmount = totalPrice + shippingFee - discount;
    const payableAmountWithShipping = payableAmount + shippingFee;

    return (
        <div className="border p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">訂單摘要</h2>
            <div className="flex justify-between mb-2">
                <span>共 {itemsCount} 件商品：</span>
                <span>${totalPrice}</span>
            </div>
            {step !== "CartStep2" && (
                <div className="flex justify-between mb-2">
                    <span>運費：</span>
                    <span>+ ${shippingFee}</span>
                </div>
            )}
            <div className="flex justify-between mb-2">
                <span>折扣：</span>
                <span>- ${discount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
                <span>
                    {step === "CartStep2" ? "應付金額(未含運)：" : "應付金額："}
                </span>
                <span>
                    NT$ {step === "CartStep2" ? payableAmount : payableAmountWithShipping}
                </span>
            </div>
        </div>
    );
}

export default OrderSummary;