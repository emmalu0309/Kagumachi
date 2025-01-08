import { useState, useEffect } from "react";
import MyKeepItem from "../components/MyKeepItem";

function MyKeep() {
  const [itemList, setItemList] = useState([]);

  const fetchMyKeeps = async () => {
    const response = await fetch("http://localhost:8080/mykeep?memberid=100"); // 先假設memberid為100。
    setItemList(await response.json());
  };

  useEffect(() => {
    fetchMyKeeps();
  }, []);
  
  const removeItem = async (memberid, productid) => {
    await fetch(`http://localhost:8080/mykeep`, {
      method: "DELETE",
      body: JSON.stringify({ memberid, productid }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
    
    setItemList(itemList.filter((item) => item.productid !== productid));
  };

  const renderedMyKeepItems = itemList.map((item) => (
    <MyKeepItem
      key={item.productid}
      productName={item.productname}
      width={item.width}
      depth={item.depth}
      height={item.height}
      // productLink={item.productlink} // 後端目前沒給
      discountprice={item.discountprice}
      productDetails={item.productdetails}
      onRemove={() => removeItem(100, item.productid)} // 先假設memberid為100。
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
