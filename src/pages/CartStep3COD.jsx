import React, { useState } from "react";
import ShoppingcartStepIcon from "../components/ShoppingcartStepIcon";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import RecipientForm from "../components/RecipientForm";

function CartStep3COD() {
    const [currentStep, setCurrentStep] = useState(3);
    const [selectedPayment, setSelectedPayment] = useState("");

    return (
        <div>
            {/* StepIcon */}
            <ShoppingcartStepIcon step={currentStep.toString()} />

            <div className="max-w-4xl mx-auto p-6 min-h-screen">

                <RecipientForm />

                {/* 按鈕 */}
                <div className="flex justify-between mt-6">

                    <Link to="/CartStep2">
                        <Button
                            label="返回"
                            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}>
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
        </div>
    );
}

export default CartStep3COD;