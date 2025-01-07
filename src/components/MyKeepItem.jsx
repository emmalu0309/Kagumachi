import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";

function MyKeepItem({
  productName,
  width,
  depth,
  height,
  productLink,
  imgSrc,
  productPrice,
  productDetails,
  onRemove,
}) {
  const [selectedColorValue, setSelectedColorValue] = useState("default");
  const [selectedColorQty, setSelectedColorQty] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [isColorSelected, setIsColorSelected] = useState(false);

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
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setSelectedQuantity(newQuantity);
    }
  };

  return (
    <div className="w-60 justify-self-center relative text-center p-2 border border-gray-200 overflow-hidden">
      <FaRegTrashCan
        className="h-5 w-5 absolute top-2 left-2 hover:cursor-pointer"
        color="gray"
        onClick={onRemove}
      />

      <Link to={productLink}>
        <img className="h-40 w-40 ml-9 hover:cursor-pointer" src={imgSrc} />
      </Link>

      <div className="h-11 mt-2">
        <h3 className={"text-sm text-gray-600 truncate"}>{productName}</h3>
        <h3 className="text-sm mt-1 text-gray-500 truncate ">
          {`${height}x${width}x${depth}公分`}
        </h3>
      </div>

      <h3 className="text-sm m-1 text-gray-500 truncate">${productPrice}</h3>

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
          disabled={!isColorSelected || maxQuantity === 0}
        >
          選購
        </button>
      </div>
    </div>
  );
}

export default MyKeepItem;
