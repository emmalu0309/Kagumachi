import MyKeepItem from "../components/MyKeepItem";
function MyKeep() {
  // =============================
  const itemList = [
    {
      productId: 1,
      productName: "墊腳凳",
      productSize: null,
      productLink:
        "https://www.ikea.com.tw/zh/products/freestanding-kitchens-and-kitchen-furniture/kitchen-furniture/bekvam-art-50225592",
      imgSrc:
        "https://www.ikea.com.tw/dairyfarm/tw/images/282/0728262_PE736144_S4.webp",
      productPrice: 729,
      productDetails: [
        {
          color: "白楊木",
          qty: 88,
        }
      ]
    },
    {
      productId: 2,
      productName: "收納櫃",
      productSize: {
        width: 35,
        depth: 25,
        height: 35,
      },
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
          qty: 74
        }
      ]
    },
    {
      productId: 3,
      productName: "收納櫃",
      productSize: {
        width: 35,
        depth: 35,
        height: 35,
      },
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
        }
      ]
    },
    
  ];
  // =============================

  const renderedMyKeepItems = itemList.map((item) => (
    <MyKeepItem
      key={item.productId}
      productName={item.productName}
      productSize={item.productSize}
      productLink={item.productLink}
      imgSrc={item.imgSrc}
      productPrice={item.productPrice}
      productDetails={item.productDetails}
    />
  ));

  return (
    <div>
      <ul className="mt-5 mx-44 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-4 gap-x-40 justify-evenly">
        {renderedMyKeepItems}
      </ul>
    </div>
  );
}

export default MyKeep;
