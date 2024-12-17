import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";

import { useState } from "react";

function ProductCard({ id, unitPrice, removeProductCard }) {
  const [isChecked, setIsChecked] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const myCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const subQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : quantity);
  };

  return (
    <div className="flex flex-col px-4 py-4 border-b-4 border-black">
      <div className="flex justify-end">
        <button className=" cursor-pointer" onClick={()=>{removeProductCard(id)}}>
          <IoMdClose className="w-8 h-8 fill-gray-300 hover:fill-black" />
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <label className="flex cursor-pointer items-center space-x-4">
            <input
              className="cursor-pointer scale-150"
              type="checkbox"
              onChange={myCheckbox}
              checked={isChecked}
            />
            <img src="./src/img/1.png" className="w-28 h-28" />
          </label>
          <div className="flex flex-col ml-8">
            <span className="flex-grow text-xl font-semibold">商品名稱</span>
            <span className="flex-grow text-xl font-semibold">商品規格</span>
            <span className="flex-grow text-xl font-semibold">優惠推薦</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex pr-16">
            <button
              className="border-2 border-black text-3xl"
              onClick={subQuantity}
            >
              <IoIosRemove />
            </button>
            <span className="px-8 border-t-2 border-b-2 border-black text-2xl">
              {quantity}
            </span>
            <button
              className="border-2 border-black text-3xl"
              onClick={addQuantity}
            >
              <IoMdAdd />
            </button>
          </div>
          <div className="pr-8 text-xl font-semibold">
            {quantity * unitPrice}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
