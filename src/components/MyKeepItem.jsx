import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";

function MyKeepItem({
  productid,
  memberId,
  productName,
  width,
  depth,
  height,
  discountprice,
  productDetails,
  onRemove,
}) {
  const { user, fetchCartCount } = useContext(AuthContext);
  const [selectedColorValue, setSelectedColorValue] = useState("default");
  const [selectedColorQty, setSelectedColorQty] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [isColorSelected, setIsColorSelected] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState(
    productDetails[0].imgsrc
  );
  const [showAnimation, setShowAnimation] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const colorOptions = productDetails.map((item, index) => {
    return (
      <option key={index} value={item.color}>
        {item.color}
      </option>
    );
  });

  const selectColorChange = (event) => {
    const selectedColor = event.target.value;
    setSelectedColorValue(selectedColor);
    const selectedIndex = productDetails.findIndex(
      (item) => item.color === selectedColor
    );
    const qty = productDetails[selectedIndex].qty;
    setSelectedColorQty(`剩餘${qty}件`);
    setMaxQuantity(qty);
    setSelectedQuantity(1);
    setIsColorSelected(true);
    setSelectedImageSrc(productDetails[selectedIndex].imgsrc);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handlePurchase = async () => {
    const selectedProduct = productDetails.find(
      (item) => item.color === selectedColorValue
    );
    const requestBody = {
      memberid: parseInt(memberId),
      productid: productid,
      color: selectedProduct.color,
      quantity: selectedQuantity,
    };
    console.log(requestBody);

    try {
      const response = await fetch("http://localhost:8080/mykeep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log(data);

      setShowAnimation(true);
      setIsButtonDisabled(true);
      setTimeout(() => {
        setShowAnimation(false);
        setIsButtonDisabled(false);
      }, 1000);

      fetchCartCount(user.memberId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-60 justify-self-center relative text-center p-2 border border-gray-200 overflow-hidden">
      <FaRegTrashCan
        className="h-5 w-5 absolute top-2 left-2 hover:cursor-pointer hover:scale-125 transition-transform duration-200"
        color="gray"
        onClick={onRemove}
      />

      <Link to={`/productpage/${productid}`}>
        <img
          className="h-40 w-40 ml-9 hover:cursor-pointer"
          src={selectedImageSrc}
        />
      </Link>
      <div className="h-11 mt-2">
        <h3 className={"text-sm text-gray-600 truncate"}>{productName}</h3>
        <h3 className="text-sm mt-1 text-gray-500 truncate ">
          {`${height}x${width}x${depth}公分`}
        </h3>
      </div>
      <h3 className="text-sm m-1 text-gray-500 truncate">${discountprice}</h3>
      <div className="flex">
        <select
          className="text-sm w-28 border border-gray-300 rounded text-gray-500"
          value={selectedColorValue}
          onChange={selectColorChange}
        >
          <option value="default" disabled>
            請選擇顏色
          </option>
          {colorOptions}
        </select>

        <h3 className="text-sm ml-7 text-gray-500 truncate">
          {selectedColorQty}
        </h3>
      </div>
      <hr className="mt-2" />
      <div className="flex items-center mt-1">
        <h3 className="text-sm text-center ml-1 mt-1 text-gray-500 truncate">
          請選擇數量
        </h3>
        <input
          type="number"
          className="w-14 ml-5 mt-1 text-sm text-center border border-gray-300 rounded text-gray-400"
          value={selectedQuantity}
          onChange={handleQuantityChange}
          min={1}
          max={maxQuantity}
        />
        <button
          className={`ml-5 px-1 py-0 mt-1 border border-gray-300 rounded-md ${
            isColorSelected && maxQuantity > 0
              ? "bg-gray-100 text-gray-500 hover:bg-[#E4D8CC] hover:text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isColorSelected || maxQuantity === 0 || isButtonDisabled}
          onClick={handlePurchase}
        >
          選購
        </button>
        {showAnimation && (
          <div className="text-[#cc99cc] absolute left-1/2 transform -translate-x-1/2 mt-1 animate-riseAndFade">
            已加入購物車！
          </div>
        )}
      </div>
    </div>
  );
}

export default MyKeepItem;
