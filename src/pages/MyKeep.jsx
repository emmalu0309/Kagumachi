import { useState, useEffect } from "react";
import MyKeepItem from "../components/MyKeepItem";

function MyKeep() {
  // 正式：
  // const [itemList, setItemList] = useState([]);

  // const fetchMyKeeps = async () => {
  //   const response = await fetch("http://localhost:8080/mykeeps");
  //   setItemList(await response.json());
  // };

  // useEffect(() => {
  //   fetchMyKeeps();
  // }, []);

  // ==============================

  // 測試：
  const [itemList, setItemList] = useState([
    {
      productId: 1,
      productName: "墊腳凳",
      width: 35,
      depth: 25,
      height: 35,
      // 可能到時候會是類似localhost:5173/product/{productId}的網址，反正就是用productId去找到該商品頁面。
      productLink:
        "https://www.ikea.com.tw/zh/products/freestanding-kitchens-and-kitchen-furniture/kitchen-furniture/bekvam-art-50225592",
      imgSrc:
        "https://www.ikea.com.tw/dairyfarm/tw/images/282/0728262_PE736144_S4.webp",
      productPrice: 729,
      productDetails: [
        {
          color: "白楊木",
          qty: 88,
        },
      ],
    },
    {
      productId: 2,
      productName: "收納櫃",
      width: 35,
      depth: 25,
      height: 35,
      productLink:
        "https://www.ikea.com.tw/zh/products/storage/open-storage/eket-art-30428840",
      imgSrc:
        "https://www.ikea.com.tw/dairyfarm/tw/images/123/1212322_PE910595_S4.webp",
      productPrice: 500,
      productDetails: [
        {
          color: "染白橡木",
          qty: 116,
        },
        {
          color: "白色",
          qty: 150,
        },
        {
          color: "深灰色",
          qty: 74,
        },
      ],
    },
    {
      productId: 3,
      productName: "收納櫃",
      width: 35,
      depth: 35,
      height: 35,
      productLink:
        "https://www.ikea.com.tw/zh/products/storage/open-storage/eket-art-00428851",
      imgSrc:
        "https://www.ikea.com.tw/dairyfarm/tw/images/123/1212322_PE910595_S4.webp",
      productPrice: 700,
      productDetails: [
        {
          color: "染白橡木",
          qty: 0,
        },
        {
          color: "白色",
          qty: 4,
        },
        {
          color: "深灰色",
          qty: 8,
        },
      ],
    },
    {
      productId: 4,
      productName: "沙發床",
      width: 35,
      depth: 25,
      height: 35,
      productLink:
        "https://www.ikea.com.tw/zh/products/sofas/sofa-beds/fridhult-art-60355762",
      imgSrc:
        "https://www.ikea.com.tw/dairyfarm/tw/images/946/1194665_PE902051_S4.webp",
      productPrice: 5499,
      productDetails: [
        {
          color: "淺灰色",
          qty: 116,
        },
        {
          color: "黃色",
          qty: 1,
        },
      ],
    },
    {
      productId: 5,
      productName: "Led工作燈",
      width: 35,
      depth: 25,
      height: 35,
      productLink:
        "https://www.ikea.com.tw/zh/products/luminaires/desk-lamps-and-clamp-lamps/orsala-art-10482908",
      imgSrc:
        "https://www.ikea.com.tw/dairyfarm/tw/images/694/0869469_PE781440_S4.webp",
      productPrice: 1799,
      productDetails: [
        {
          color: "白色",
          qty: 18,
        },
      ],
    },
    {
      productId: 6,
      productName: "書桌/工作桌",
      width: 35,
      depth: 25,
      height: 35,
      productLink:
        "https://www.ikea.com.tw/zh/products/home-workspace/home-desks/malm-art-00359824",
      imgSrc:
        "https://www.ikea.com.tw/dairyfarm/tw/images/359/0735976_PE740310_S4.webp",
      productPrice: 5299,
      productDetails: [
        {
          color: "白色",
          qty: 41,
        },
        {
          color: "梁白橡木",
          qty: 0,
        },
      ],
    },
  ]);
  // ==============================

  const removeItem = (productId) => {
    // 正式：
    // fetch(`http://localhost:8080/mykeeps/${productid}`, {
    //   method: "DELETE",
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.text().then(text => { throw new Error(text) });
    //     }
    //     return response.json();
    //   })
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error("Error:", error));
    // 
    // setItemList(itemList.filter((item) => item.productid !== productid));

    // 測試：
    setItemList(itemList.filter((item) => item.productId !== productId));
  };

  const renderedMyKeepItems = itemList.map((item) => (
    <MyKeepItem
      // 正式：
      // key={item.productid}
      // productName={item.productname}
      // width={item.width}
      // depth={item.depth}
      // height={item.height}
      // productLink={item.productlink}
      // imgSrc={item.imgsrc}
      // productPrice={item.productprice}
      // productDetails={item.productdetails}
      // onRemove={() => removeItem(item.productid)}

      // 測試：
      key={item.productId}
      productName={item.productName}
      width={item.width}
      depth={item.depth}
      height={item.height}
      productLink={item.productLink}
      imgSrc={item.imgSrc}
      productPrice={item.productPrice}
      productDetails={item.productDetails}
      onRemove={() => removeItem(item.productId)}
    />
  ));

  return (
    <div>
      <ul className="mt-5 mx-44 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 gap-x-60 justify-evenly">
        {renderedMyKeepItems}
      </ul>
    </div>
  );
}

export default MyKeep;
