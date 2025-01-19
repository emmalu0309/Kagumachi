import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ShoppingcartStepIcon from "../components/ShoppingcartStepIcon";
import RecipientForm from "../components/RecipientForm";
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
            // 必須大於等於 3 天後
            const chosenDate = new Date(value);
            const todayPlus3 = new Date();
            todayPlus3.setDate(todayPlus3.getDate() + 3);
            return chosenDate >= todayPlus3;
        }, "日期必須大於等於今日起 3 天之後"),
});

function CartStep3COD() {
    const [currentStep, setCurrentStep] = useState(3);
    const navigate = useNavigate();

    // 顯示預設值
    const data = {
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
            chinese_name: data.chinese_name,
            phone: data.phone,
            city: data.city,
            district: data.district,
            address: data.address,
        },
    }
    );

    // 表單送出時的處理
    const onSubmit = (formData) => {
        console.log("提交的表單資料：", formData);
        // 成功後要導去 /CartStep4
        navigate("/CartStep4");
    };

    const orderData = {
        itemsCount: 2,
        totalPrice: 2000,
        shippingFee: 60,
        discount: 0,
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {/* StepIcon */}
                <ShoppingcartStepIcon step={currentStep.toString()} />

                <div className="max-w-4xl mx-auto p-6 min-h-screen">

                    <RecipientForm register={register} errors={errors} />

                    <OrderSummary
                        itemsCount={OrderData.itemsCount}
                        totalPrice={OrderData.totalPrice}
                        shippingFee={OrderData.shippingFee}
                        discount={OrderData.totalDiscount}
                        payableAmount={OrderData.payableAmount}
                        step={"CartStep3COD"}
                    />

                    <div className="flex justify-between mt-6">
                        {/* 返回 */}
                        <Link to="/CartStep2">
                            <button
                                className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]"
                                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}>
                                返回
                            </button>
                        </Link>
                        {/* 下一步 */}
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

export default CartStep3COD;