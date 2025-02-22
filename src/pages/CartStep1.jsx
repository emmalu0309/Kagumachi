import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingcartStepIcon from "../components/ShoppingcartStepIcon";
import CartProductCard from "../components/CartProductCard";
import { AuthContext } from "../context/AuthContext";

function CartStep1() {
  const { user } = useContext(AuthContext);
  const memberId = user == null ? "" : user.memberId;
  const purchaseAllUrl = `http://localhost:8080/shoppingcart/step1/purchaseAll/${memberId}`;
  const url = `http://localhost:8080/shoppingcart/step1/${memberId}`;
  const [products, setProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const purchaseAll = () => {
    fetch(purchaseAllUrl, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        } else {
          const updatStatu = products.map((product) => {
            return {
              ...product,
              ispurchase: !selectAll,
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
      product.cartsid == id ? { ...product, ispurchase: isChecked } : product
    );
    setProducts(updatStatu);
    const allChecked = updatStatu.every((product) => product.ispurchase);
    setSelectAll(allChecked);
  };

  const navigate = useNavigate();
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.cartsid !== id));
  };

  const [totalPrice, setTotalPrice] = useState(new Map());
  const addToTotalPrice = (key, value) => {
    setTotalPrice((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    });
  };
  const delToTotalPrice = (key) => {
    setTotalPrice((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  };
  const sumTotalPrice = [...totalPrice.values()].reduce(
    (sum, value) => sum + value,
    0
  );

  const [totalCount, setTotalCount] = useState(new Map());
  const addTotalCount = (key, value) => {
    setTotalCount((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    });
  };
  const delTotalCount = (key) => {
    setTotalCount((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  };
  const sumTotalCount = [...totalCount.values()].reduce(
    (sum, value) => sum + value,
    0
  );

  //進入頁面時獲取資料庫
  useEffect(() => {
    if (user != null) {
      fetch(url, { method: "GET" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error:" + response.status);
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data);
          if (data.length < 1) {
            navigate("/cartEmpty");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [memberId, totalCount]);

  //全選的狀態
  useEffect(() => {
    if (products.length > 0) {
      setSelectAll(products.every((product) => product.ispurchase == true));
    }
  }, [products]);

  if (memberId == null) {
    return <></>;
  } else {
    return (
      <>
        <ShoppingcartStepIcon step="1" />
        <div className="max-w-[55%] mx-auto py-6 px-10 mt-10 border border-gray-200  text-gray-500">
          <div className="pl-4 py-2 border-b">
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
                name={data.productname}
                color={data.colorname}
                count={data.quantity}
                price={data.unitprice}
                discountprice={data.discountprice}
                picture={data.imageurl}
                purchase={data.ispurchase}
                width={data.width}
                height={data.height}
                depth={data.depth}
                salesname={data.salesname}
                selectAll={selectAll}
                onDelete={handleDelete}
                onCheckbox={handleChildCheckbox}
                addToTotalPrice={addToTotalPrice}
                delToTotalPrice={delToTotalPrice}
                addTotalCount={addTotalCount}
                delTotalCount={delTotalCount}
              />
            ))}
          </div>
          <div className="flex justify-end pt-2 pb-2"> 
          {/* border-b border-gray-200 */}
            <span className="w-[18%] py-2">共 {sumTotalCount} 件商品</span>
            <div className="w-[10%]">
              <p className="py-2">小計</p>
              {/* <p className="pb-2">活動特惠</p> */}
            </div>
            <div className="w-[11%]">
              <p className="py-2">NT${sumTotalPrice}</p>
              {/* <p className="pb-2">無</p> */}
            </div>
          </div>
          {/* <div className="flex justify-end pr-10 pt-2">
            <span className="w-[13%] pt-2">小計</span>
            <p className="w-[8%] pt-2">NT${sumTotalPrice}</p>
          </div> */}

          <div className="flex justify-between mt-6">
            <Link to="/homepage">
              <button className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]">
                繼續購物
              </button>
            </Link>
            <Link to="/CartStep2">
              <button
                className="px-4 py-2 rounded text-white bg-[#5E3B25] hover:bg-[#C3A789]"
                disabled={sumTotalCount == 0}
              >
                下一步
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default CartStep1;
