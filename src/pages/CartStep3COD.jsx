import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ShoppingcartStepIcon from "../components/ShoppingcartStepIcon";
import RecipientForm from "../components/RecipientForm";
import OrderSummary from "../components/OrderSummary";
import { AuthContext } from "../context/AuthContext";

const schema = z.object({
    chineseName: z
        .string()
        .nonempty("請輸入姓名")
        .regex(
            /^[\u4e00-\u9fa5]+$/, "必須皆為中文字"
        ),
    phone: z
        .string()
        .nonempty("請輸入手機號碼")
        .regex(
            /^[0-9]{4}-[0-9]{3}-[0-9]{3}$/,
            "請輸入有效的手機號碼"
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
    deliveryDate: z
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
    const { user, fetchCartCount } = useContext(AuthContext);
    if (!user) {
        return <div>載入會員</div>;
    }
    const memberid = user.memberId;

    const [currentStep, setCurrentStep] = useState(3);
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({
        itemsCount: 0,
        totalPrice: 0,
        shippingFee: 0,
        payableAmount: 0,
        itemDetails: []
    });
    const [shipRate, setShipRate] = useState([]);
    const [selectedShipRate, setSelectedShipRate] = useState(0);

    // 顯示預設值
    const defaultData = {
        chineseName: "",
        phone: "",
        city: "",
        district: "",
        address: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // 用於更新欄位值
        watch,
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange", // 即時驗證
        defaultValues: {
            chineseName: defaultData.chineseName,
            phone: defaultData.phone,
            city: defaultData.city,
            district: defaultData.district,
            address: defaultData.address,
        },
    });

    // 監聽電話欄位的值
    const phoneValue = watch("phone");

    // 自動格式化電話號碼
    const handlePhoneChange = (event) => {
        const rawValue = event.target.value.replace(/\D/g, ""); // 移除非數字
        if (rawValue.length > 10) return; // 防止超過 10 碼

        const formattedValue = rawValue
            .replace(/^(\d{4})(\d{3})(\d{0,3}).*$/, "$1-$2-$3")
            .replace(/-$/, ""); // 格式化為 0912-345-678
        setValue("phone", formattedValue, { shouldValidate: true }); // 更新電話欄位值
    };

    // 獲取訂單摘要數據
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

    // 獲取運費數據
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
    }, [memberid]);

    // 表單送出時的處理
    const onSubmit = async (formData) => {
        // console.log("orderData:", orderData);
        localStorage.setItem('orderserial', memberid.toString() + Date.now()); // 存訂單編號在localstorage
        const completeOrderData = {
            orderstatus: "準備中",
            paymentmethod: "貨到付款",
            shippingmethod: "宅配",
            ordercity: formData.city,
            address: formData.address,
            recipient: formData.chineseName,
            phone: formData.phone,
            district: formData.district,
            estimateddeliverydate: formData.deliveryDate,
            totalprice: orderData.totalPrice + selectedShipRate,
            orderserial: localStorage.getItem('orderserial')
        }
        // console.log("提交的完整訂單資料：", completeOrderData);

        try {
            // 1. 先創建訂單主資料
            const response = await fetch(`http://localhost:8080/order/${memberid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(completeOrderData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("後端返回的錯誤信息：", errorMessage);
                throw new Error("Failed to save order");
            }

            // 獲取返回的 orderId
            const orderId = await response.json();
            console.log("Order created successfully");

            // 2. 使用 orderId 提交訂單詳情
            const orderDetails = orderData.itemDetails.map(item => ({
                productId: item.productId,
                colorsId: item.colorsId,
                quantity: item.quantity
            }));
            // console.log("Order details being submitted:", orderDetails);

            const detailResponse = await fetch(`http://localhost:8080/orderdetail/${orderId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderDetails),
            });

            if (!detailResponse.ok) {
                const errorMessage = await detailResponse.text();
                console.error("後端返回的錯誤信息：", errorMessage);
                throw new Error("Failed to save order details");
            }
            console.log("Order details saved successfully");
            //Emma
            await fetchCartCount(memberid);

            // 3. 成功後導去下一步
            navigate("/CartStep4");
        } catch (error) {
            console.error("Error saving order:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <ShoppingcartStepIcon step={currentStep.toString()} />

                <div className="max-w-[55%] mx-auto py-6 px-10 mt-10 border border-gray-200  text-gray-500">
                    <RecipientForm
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        shipRateData={shipRate}
                        setSelectedShipRate={setSelectedShipRate}
                        phoneValue={phoneValue}
                        handlePhoneChange={handlePhoneChange}
                    />

                    <OrderSummary
                        itemsCount={orderData.itemsCount}
                        totalPrice={orderData.totalPrice}
                        shippingFee={selectedShipRate}
                        payableAmount={orderData.totalPrice + selectedShipRate}
                        itemDetails={orderData.itemDetails}
                        step={"CartStep3COD"}
                    />

                    {/* 按鈕 */}
                    <div className="flex justify-between mt-6">
                        <Link to="/CartStep2">
                            <button
                                type="button"
                                className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]"
                                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                            >
                                返回
                            </button>
                        </Link>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]"
                        >
                            完成下訂
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );

}

export default CartStep3COD;