import React from "react";

function Button({ label, onClick, disabled, className }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded ${disabled ? "bg-gray-300" : "bg-[#5E3B25] text-white hover:bg-[#C3A789]"} ${className}`}
        >
            {label}
        </button>
    );
}

export default Button;