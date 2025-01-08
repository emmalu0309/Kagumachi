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
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 mt-10 border-2 border-black">
        <div className="pl-4 py-2 border-b-2 border-black">
          <label className="cursor-pointer">
            <input
              className="cursor-pointer scale-150"
              type="checkbox"
              checked={selectAll}
              onChange={purchaseAll}
            />
            <span className="text-xl font-semibold pl-2">全選</span>
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
        <div className="flex justify-end text-xl font-semibold border-b-2 border-black">
          <span className="pr-5">共 {products.length} 件商品</span>
          <div className="pr-10">
            <p>商品金額</p>
            <p>活動特惠</p>
            <p>運費</p>
            <p>帳戶折抵</p>
          </div>
          <div className="pr-10">
            <p></p>
            <p>無</p>
            <p>免運</p>
            <p>無</p>
          </div>
        </div>
        <div className="flex justify-end text-xl font-semibold">
          <span className="pr-10">小計</span>
          <p className="pr-10">100</p>
        </div>

        <div className="flex justify-between mt-6">
          <Link>
            <button className="px-4 py-2 rounded text-white bg-gray-400 hover:bg-gray-600">
              繼續購物
            </button>
          </Link>
          <Link>
            <button className="px-4 py-2 rounded text-white bg-gray-400 hover:bg-gray-600">
              下一步
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartStep1;
