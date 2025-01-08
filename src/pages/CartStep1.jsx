import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShoppingcartStepIcon from "../components/ShoppingcartStepIcon";
import CartProductCard from "../components/CartProductCard";

function CartStep1() {
  const [products, setProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.cartsid !== id));
  };

  // 待使用session抓取會員ID
  const purchaseAllUrl = `http://localhost:8080/shoppingcart/step1/purchaseAll/1`;
  const url = "http://localhost:8080/shoppingcart/step1/1";

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.Error(error.message);
      });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setSelectAll(products.every((product) => product.purchase == true));
    }
  }, [products]);

  const purchaseAll = () => {
    fetch(purchaseAllUrl, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        } else {
          const updatStatu = products.map((product) => {
            return {
              ...product,
              purchase: !selectAll,
            };
          });
          setProducts(updatStatu);
          setSelectAll(!selectAll);
        }
      })
      .catch((error) => {
        console.Error(error.message);
      });
  };

  const handleChildCheckbox = (id, isChecked) => {
    const updatStatu = products.map((product) =>
      product.cartsid == id ? { ...product, purchase: isChecked } : product
    );
    setProducts(updatStatu);
    const allChecked = updatStatu.every((product) => product.purchase);
    setSelectAll(allChecked);
  };

  return (
    <>
      <ShoppingcartStepIcon step="1" />
      <div className="max-w-[55%] mx-auto py-6 px-10 mt-10 border border-gray-200  text-gray-500">
        <div className="pl-4 py-2 border">
          <label className="cursor-pointer">
            <input
              className="cursor-pointer scale-150"
              type="checkbox"
              checked={selectAll}
              onChange={purchaseAll}
            />
            <span className="font-semibold pl-2">全選</span>
          </label>
        </div>
        <div>
          {/* 商品列 */}
          {products.map((data) => (
            <CartProductCard
              key={data.cartsid}
              id={data.cartsid}
              name={data.products.productname}
              color={data.productcolors.colorname}
              count={data.quantity}
              price={data.products.unitprice}
              picture={
                data.products.productimages.find(
                  (img) =>
                    img.productcolors.colorname === data.productcolors.colorname
                )?.imageurl || ""
              }
              purchase={data.purchase}
              onDelete={handleDelete}
              onCheckbox={handleChildCheckbox}
            />
          ))}
        </div>
        <div className="flex justify-end border-b-2 border-gray-200">
          <span className="pr-10 py-2">共 {products.length} 件商品</span>
          <div className="pr-10">
            <p className="py-2">商品金額</p>
            <p>活動特惠</p>
            <p className="py-2">運費</p>
            <p className="pb-2">帳戶折抵</p>
          </div>
          <div className="pr-10">
            <p className="py-2">123</p>
            <p>無</p>
            <p className="py-2">免運</p>
            <p>無</p>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="pr-10 pt-2">小計</span>
          <p className="pr-10 pt-2">100</p>
        </div>

        <div className="flex justify-between mt-6">
          <Link to="/homepage">
            <button className="px-4 py-2 text-white bg-gray-400 hover:bg-gray-600">
              繼續購物
            </button>
          </Link>
          <Link to="/CartStep2">
            <button className="px-4 py-2 text-white bg-gray-400 hover:bg-gray-600">
              下一步
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartStep1;
