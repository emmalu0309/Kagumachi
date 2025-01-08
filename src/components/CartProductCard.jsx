import { IoMdClose, IoMdAdd, IoIosRemove } from "react-icons/io";
import { useEffect, useState } from "react";
// { id, name, color, count, price, picture, purchase, setTotalPrice}
function CartProductCard(props) {
  const [isChecked, setIsChecked] = useState(
    props.purchase == true ? true : false
  );
useEffect(() => {
  setIsChecked(props.purchase);
}, [props.purchase]);

  const [quantity, setQuantity] = useState(parseInt(props.count));
  const addUrl = `http://localhost:8080/shoppingcart/step1/add/${props.id}`;
  const subUrl = `http://localhost:8080/shoppingcart/step1/sub/${props.id}`;
  const purchaseUrl = `http://localhost:8080/shoppingcart/step1/purchase/${props.id}`;

  const addQuantity = () => {
    if (quantity < 50) {
      fetch(addUrl, { method: "POST" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error:" + response.status);
          }else{
            setQuantity((prev) => prev + 1);
          }
        })
        .catch((error) => {
          console.Error(error.message);
        });
    } else {
      setQuantity(quantity);
    }
  };
  const subQuantity = () => {
    if (quantity > 1) {
      fetch(subUrl, { method: "POST" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error:" + response.status);
          }else{
            setQuantity((prev) => prev - 1);
          }
        })
        .catch((error) => {
          console.Error(error.message);
        });
    } else {
      setQuantity(quantity);
    }
  };
  const myCheckbox = () => {
    fetch(purchaseUrl, { method: "POST" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error:" + response.status);
          }else{
            setIsChecked(!isChecked);
            props.onCheckbox(props.id, !isChecked);
          }
        })
        .catch((error) => {
          console.Error(error.message);
        });
  };

//待寫刪除傳給資料庫
  return (
    <div
      id={props.id}
      className="flex flex-col px-4 py-4 border-b-2 border-gray-200"
    >
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={()=>props.onDelete(props.id)}>
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
            <img src={props.picture} className="w-28 h-28" />
          </label>
          <div className="flex flex-col ml-8">
            <span className="flex-grow">
              商品名稱：{props.name}
            </span>
            <span className="flex-grow">
              商品規格：{props.color}
            </span>
            <span className="flex-grow">優惠推薦</span>
          </div>
        </div>
        <div className="flex items-center w-60">
          <div className="flex pr-16">
            <button
              className="border-2"
              onClick={subQuantity}
            >
              <IoIosRemove className="hover:fill-black"/>
            </button>
            <span className="w-12 border-t-2 border-b-2 text-center">
              {quantity}
            </span>
            <button
              className="border-2 "
              onClick={addQuantity}
            >
              <IoMdAdd className="hover:fill-black"/>
            </button>
          </div>
          <div className="pr-8 font-semibold">
            {quantity * props.price}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartProductCard;
