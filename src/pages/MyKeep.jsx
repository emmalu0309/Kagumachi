import { useState, useEffect, useContext } from "react";
import MyKeepItem from "../components/MyKeepItem";
import { AuthContext } from "../context/AuthContext";

function MyKeep() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;

  const [itemList, setItemList] = useState([]);

  const fetchMyKeeps = async () => {
    const response = await fetch(`http://localhost:8080/mykeep?memberid=${memberId}`);
    setItemList(await response.json());
  };

  useEffect(() => {
    fetchMyKeeps();
  }, [memberId]);
  
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
      productid={item.productid}
      productName={item.productname}
      width={item.width}
      depth={item.depth}
      height={item.height}
      // productLink={item.productlink} // 後端目前沒給
      discountprice={item.discountprice}
      productDetails={item.productdetails}
      onRemove={() => removeItem(memberId, item.productid)}
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
