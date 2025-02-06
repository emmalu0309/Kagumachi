import React from "react";

function PaymentOptions({ options, selectedOption, onSelect }) {
    return (
        <div className="border-b border-gray-200 pt-2 pb-4 ">
            <h2 className="text-xl font-bold mb-4 border-b">選擇付款方式</h2>
            <div className="flex flex-col space-y-2">
                {options.map((option) => (
                    <label
                        key={option.id}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <input
                            type="radio"
                            value={option.id}
                            checked={selectedOption === option.id}
                            onChange={() => onSelect(option.id)}
                            disabled={option.disabled}
                            className="hidden peer" // 隱藏原生按鈕
                        />
                        {/* 自訂樣式的方形按鈕 */}
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-md peer-checked:bg-[#C3A789]"></div>
                        <span
                            className={
                                option.disabled
                                    ? "text-gray-400 line-through"
                                    : "text-black"
                            }
                        >
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default PaymentOptions;
