import React from "react";

function Button({ label, onClick, disabled, className }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded ${disabled ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"} ${className}`}
        >
            {label}
        </button>
    );
}

export default Button;