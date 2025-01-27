import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ShoppingcartStepIcon from "../components/ShoppingcartStepIcon";
import PaymentOptions from "../components/PaymentOptions";
import OrderSummary from "../components/OrderSummary";
import { AuthContext } from "../context/AuthContext";

function CartStep2() {
    const { user } = useContext(AuthContext);
    const memberid = user.memberId;
    // const memberid = 103;
    
    const [currentStep, setCurrentStep] = useState(2);
    const [selectedPayment, setSelectedPayment] = useState("");
    const [OrderData, setOrderData] = useState({
        itemsCount: 0,
        totalPrice: 0,
        shippingFee: 0,
        payableAmount: 0,
        itemDetails: [],
    });

    const paymentOptions = [
        { id: "credit", label: "信用卡付款" },
        { id: "cod", label: "貨到付款" },
    ];

    // 獲取訂單摘要
    const fetchOrderSummary = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/ordersummary/cartstep2/${memberid}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch order summary.");
            }
            const data = await response.json();
            setOrderData(data); // 更新訂單摘要數據
        } catch (error) {
            console.error("Error fetching order summary:", error);
        }
    };

    useEffect(() => {
        fetchOrderSummary();
    }, []);

    // 下一步按鈕處理
    const handleNextStep = (e) => {
        if (!selectedPayment) {
            e.preventDefault(); // 阻止導航
            alert("您尚未選擇付款方式");
        }
    };

    return (
        <div>
            {/* StepIcon */}
            <ShoppingcartStepIcon step={currentStep.toString()} />
            <div className="max-w-[55%] mx-auto py-6 px-10 mt-10 border border-gray-200  text-gray-500">

                {/* 付款方式選擇 */}
                <PaymentOptions
                    options={paymentOptions}
                    selectedOption={selectedPayment}
                    onSelect={setSelectedPayment}
                />

                {/* 訂單摘要 */}
                <OrderSummary
                    itemsCount={OrderData.itemsCount}
                    totalPrice={OrderData.totalPrice}
                    shippingFee={OrderData.shippingFee}
                    payableAmount={OrderData.payableAmount}
                    itemDetails={OrderData.itemDetails}
                    step={"CartStep2"}
                />

                {/* 按鈕 */}
                <div className="flex justify-between mt-6">

                    <Link to="/CartStep1">
                        <button className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]"
                            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}>
                            返回
                        </button>
                    </Link>

                    <Link to=
                        // "/CartStep3"
                        {
                            selectedPayment === "cod"
                                ? "/CartStep3COD"
                                : selectedPayment === "credit"
                                    ? "/CartStep3Credit"
                                    : "#"  // 未選擇付款方式時，導航設為空連結
                        }
                        onClick={handleNextStep} // 在按鈕點擊時觸發提示
                    >
                        <button
                            className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]"
                            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}
                        >
                            下一步
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartStep2;