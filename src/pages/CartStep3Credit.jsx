import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ShoppingcartStepIcon from "../components/ShoppingcartStepIcon";
import RecipientForm from "../components/RecipientForm";
import CreditForm from "../components/CreditForm";
import OrderSummary from "../components/OrderSummary";

const schema = z.object({
    chinese_name: z
        .string()
        .nonempty("請輸入名字")
        .regex(
            /^[\u4e00-\u9fa5]+$/, "必須皆為中文字"
        ),
    phone: z
        .string()
        .regex(
            /^[0-9]{4}-[0-9]{3}-[0-9]{3}$/,
            "請輸入有效的手機號碼，格式範例：0912-345-678。"
        ),
    city: z
        .string()
        .nonempty("請選擇縣市"),
    district: z
        .string()
        .nonempty("請選擇地區"),
    address: z
        .string()
        .nonempty("請輸入地址"),
    deliverDate: z
        .string()
        .nonempty("請選擇日期")
        .refine((value) => {
            // 這裡可以做更嚴謹的檢查，例如必須大於等於 3 天後
            const chosenDate = new Date(value);
            const todayPlus3 = new Date();
            todayPlus3.setDate(todayPlus3.getDate() + 3);
            return chosenDate >= todayPlus3;
        }, "日期必須大於等於今日起 3 天之後"),
});

function CartStep3Credit() {
    const [currentStep, setCurrentStep] = useState(3);
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({
        itemsCount: 0,
        totalPrice: 0,
        shippingFee: 0,
        discount: 0,
        payableAmount: 0,
    });
    const [shipRate, setShipRate] = useState([]);
    const [selectedShipRate, setSelectedShipRate] = useState(0);

    // 顯示預設值
    const defaultData = {
        chinese_name: "布萊德",
        phone: "0912-345-678",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            chinese_name: defaultData.chinese_name,
            phone: defaultData.phone,
            city: defaultData.city,
            district: defaultData.district,
            address: defaultData.address,
        },
    }
    );

    const fetchOrderSummary = async () => {
        const memberId = 1; // 假設目前登入的會員 ID 為 1
        try {
            const response = await fetch(
                `http://localhost:8080/ordersummary/cartstep2/${memberId}`
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

    const fetchShipRate = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/shiprate`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch shiprate.");
            }
            const data = await response.json();
            // console.log(data);
            setShipRate(data); 
            
        } catch (error) {
            console.error("Error fetching shiprate.", error);
        }
    };

    useEffect(() => {
        fetchOrderSummary();
        fetchShipRate();
    }, []);

    // 表單送出時的處理
    const onSubmit = async (formData) => {
        const orderData = {
            ...formData,
            itemsCount: orderData.itemsCount,
            totalPrice: orderData.totalPrice,
            shippingFee: orderData.shippingFee,
            discount: orderData.discount,
            payableAmount: orderData.payableAmount,
        }
        console.log("提交的表單資料：", formData);

        try {
            const response = await fetch("http://localhost:8080/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error("Failed to save order");
            }

            const result = await response.json();
            console.log("Order saved successfully:", result);

            // 成功後要導去 /CartStep4
            navigate("/CartStep4");
        } catch (error) {
            console.error("Error saving order:", error.message);
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {/* StepIcon */}
                <ShoppingcartStepIcon step={currentStep.toString()} />

                <div className="max-w-4xl mx-auto p-6 min-h-screen">

                    <RecipientForm register={register} errors={errors} shipRateData={shipRate} setSelectedShipRate={setSelectedShipRate}/>
                        
                    {/* <CreditForm /> */}

                    <OrderSummary
                        itemsCount={orderData.itemsCount}
                        totalPrice={orderData.totalPrice}
                        shippingFee={selectedShipRate}
                        discount={orderData.totalDiscount}
                        payableAmount={orderData.payableAmount}
                        step={"CartStep3Credit"}
                    />

                    {/* 按鈕 */}
                    <div className="flex justify-between mt-6">

                        <Link to="/CartStep2">
                            <button
                                className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]"
                                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}>
                                返回
                            </button>
                        </Link>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]"
                        >
                            下一步
                        </button>

                    </div>
                </div>
            </div>
        </form>
    );
}

export default CartStep3Credit;