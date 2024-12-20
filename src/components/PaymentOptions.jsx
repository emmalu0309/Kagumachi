import React from "react";

function PaymentOptions({ options, selectedOption, onSelect }) {
    return (
      <div className="border p-4 bg-white shadow rounded mb-6">
        <h2 className="text-xl font-bold mb-4">選擇付款方式</h2>
        {options.map((option) => (
          <label key={option.id} className="flex items-center mb-2">
            <input
              type="radio"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => onSelect(option.id)}
              disabled={option.disabled}
              className="mr-2"
            />
            <span className={option.disabled ? "text-gray-400 line-through" : "text-black"}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    );
  }
  
  export default PaymentOptions;
