import { useState } from "react";
import ProductCard from "./ProductCard";

function CheckList() {
  const unitPrice = 100; //商品單價測試用
  const [isChecked, setIsChecked] = useState(true); //框選確認
  const [productCards, setProductCards] = useState([]); //用陣列管理商品
  const [cardId, setCardId] = useState(1); //假的商品id(後續可以改成key，確認第幾個)

  const myCheckbox = () => {
    setIsChecked(!isChecked);
  }; //勾選框狀態變化

  const addProductCard = () => {
    setProductCards((prevCards) => [
      ...prevCards,
      { id: cardId, unitPrice: unitPrice },
    ]);
    setCardId((prevId) => prevId + 1);
  }; //新增商品

  const removeProductCard = (id) => {
    setProductCards((prevCards) => prevCards.filter((card) => card.id != id));
  };//刪除商品

  return (
    <div className="mt-10 mx-8 border-4 border-black">
      <button onClick={addProductCard}>模擬新增商品</button>
      <div className="pl-4 py-2 border-b-4 border-black">
        <label className="cursor-pointer">
          <input
            className="cursor-pointer scale-150"
            type="checkbox"
            onChange={myCheckbox}
            checked={isChecked}
          />
          <span className="text-xl font-semibold pl-2">全選</span>
        </label>
      </div>
      <div>
        {/* <ProductCard unitPrice={unitPrice} /> */}
        {productCards.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            unitPrice={product.unitPrice}
            removeProductCard={removeProductCard}
          />
        ))}
        {/* 管理商品列 */}
      </div>
      <div className="flex justify-end text-xl font-semibold border-b-4 border-black">
        <span className="pr-5">共 0 件商品</span>
        <div className="pr-5">
          <p>商品金額</p>
          <p>活動特惠</p>
          <p>運費</p>
          <p>帳戶折抵</p>
        </div>
      </div>
      <div className="flex justify-end text-xl font-semibold">
        <span className="pr-5">小計</span>
      </div>
    </div>
  );
}

export default CheckList;
