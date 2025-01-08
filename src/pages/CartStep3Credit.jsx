import React, { useState } from "react";
import ShoppingcartStepIcon from "../components/ShoppingcartStepIcon";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function App() {
    const [currentStep, setCurrentStep] = useState(3);
    const [selectedPayment, setSelectedPayment] = useState("");

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">

            {/* StepIcon */}
            <ShoppingcartStepIcon step={currentStep.toString()} />

            {/* 按鈕 */}
            <div className="flex justify-between mt-6">

                <Link to="/CartStep2">
                    <Button
                        label="返回"
                        onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                    >
                    </Button>
                </Link>

                <Link to="/">
                    <Button
                        label="下一步"
                        onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}
                        className={selectedPayment}>
                    </Button>
                </Link>


            </div>
        </div>
    );
}

export default App;