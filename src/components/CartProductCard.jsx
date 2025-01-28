import { IoMdClose, IoMdAdd, IoIosRemove } from "react-icons/io";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// { id, name, color, count, price, picture, purchase
// addTotalCount(Map), addToTotalPrice(Map)
// delTotalCount(Map), delToTotalPrice(Map)}
function CartProductCard(props) {
//Emma
  const { user, fetchCartCount } = useContext(AuthContext);

  const addUrl = `http://localhost:8080/shoppingcart/step1/add/${props.id}`;
  const subUrl = `http://localhost:8080/shoppingcart/step1/sub/${props.id}`;
  const purchaseUrl = `http://localhost:8080/shoppingcart/step1/purchase/${props.id}`;
  const deleteUrl = `http://localhost:8080/shoppingcart/step1/delete/${props.id}`;
  const [quantity, setQuantity] = useState(parseInt(props.count));
  const [isChecked, setIsChecked] = useState(
    props.purchase == true ? true : false
  );
  const price =
    props.price == props.discountprice ? props.price : props.discountprice;
  const showPrice =
    props.price == props.discountprice ? (
      <>
        <div className="pr-8 font-semibold">{quantity * props.price}</div>
      </>
    ) : (
      <>
      <div>
        <p className="pr-8 font-semibold text-red-500">{quantity * props.discountprice}</p>
        <p className="pr-8 pt-2 font-semibold line-through">{quantity * props.price}</p>
      </div>
      </>
    );
  //監控並回傳勾選
  useEffect(() => {
    setIsChecked(props.purchase);
  }, [props.purchase]);
  //監控並回傳金額
  useEffect(() => {
    if (isChecked == true) {
      props.addTotalCount(props.id, quantity);
      props.addToTotalPrice(props.id, quantity * price);
    } else {
      props.delTotalCount(props.id);
      props.delToTotalPrice(props.id);
    }
  }, [isChecked, quantity]);

  const addQuantity = () => {
    if (quantity < 50) {
      fetch(addUrl, { method: "POST" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error:" + response.status);
          } else {
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
          } else {
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
        } else {
          setIsChecked(!isChecked);
          props.onCheckbox(props.id, !isChecked);
        }
      })
      .then(() => {
        if (!isChecked == true) {
          props.addToTotalPrice(props.id, quantity * props.price);
        } else {
          props.delToTotalPrice(props.id);
        }
      })
      .catch((error) => {
        console.Error(error.message);
      });
  };
  const delectCard = () => {
    fetch(deleteUrl, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        }
      })
      .then(() => {
        props.onDelete(props.id);
        console.log("DELECT OK");

        props.delTotalCount(props.id);
        props.delToTotalPrice(props.id);

        //Emma
        if (user) {
          fetchCartCount(user.memberId);
        }
      })
      .catch((error) => {
        console.Error(error.message);
      });
  };

  return (
    <div
      id={props.id}
      className="flex flex-col px-4 py-4 border-b border-gray-200"
    >
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={delectCard}>
          <IoMdClose className="w-6 h-6 fill-gray-300 hover:fill-black" />
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
            <span className="flex-grow">商品名稱：{props.name}</span>
            <span className="flex-grow">商品顏色：{props.color}</span>
            <span className="flex-grow">
              商品規格：寬:{props.width}高:{props.height}深:{props.depth}
            </span>
            <span className="flex-grow">活動特惠：{props.salesname == "NULL" ? "無" : props.salesname}</span>
          </div>
        </div>
        <div className="flex items-center w-60">
          <div className="flex pr-16">
            <button className="border" onClick={subQuantity}>
              <IoIosRemove className="hover:fill-black" />
            </button>
            <span className="w-12 border-t border-b text-center">
              {quantity}
            </span>
            <button className="border " onClick={addQuantity}>
              <IoMdAdd className="hover:fill-black" />
            </button>
          </div>
          {showPrice}
        </div>
      </div>
    </div>
  );
}
export default CartProductCard;
