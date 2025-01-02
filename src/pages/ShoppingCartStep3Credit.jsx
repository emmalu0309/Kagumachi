import React, { useState } from "react";
import StepIcon from "../components/StepIcon";
import PaymentOptions from "../components/PaymentOptions";
import OrderSummary from "../components/OrderSummary";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function App() {
  const [currentStep, setCurrentStep] = useState(3);
  const [selectedPayment, setSelectedPayment] = useState("");

  const paymentOptions = [
    { id: "cod", label: "宅配貨到付款" },
    { id: "credit", label: "信用卡付款" },
  ];
}