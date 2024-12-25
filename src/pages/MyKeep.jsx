import MyKeepItem from "../components/MyKeepItem";
function MyKeep() {
  return (
    <div>
      <ul className="mt-5 mx-44 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-4 gap-x-40 justify-evenly">
        <MyKeepItem
          itemName="牛津長袖襯衫-男"
          itemPrice="NT$399"
          imgSrc="https://s1.lativ.com.tw/i/66419/66419011/6641901_360.jpg"
          // e.g.
          // itemColor={["紅色", "藍色", "黑色"]}
          // itemSize={["s", "m", "l", "xl"]}
          // itemQty={10}
        />
        <MyKeepItem
          itemName="柔軟舒適圓領毛衣-童"
          itemPrice="NT$450"
          imgSrc="	https://s2.lativ.com.tw/i/67150/67150011/6715001_360.jpg"
        />
        <MyKeepItem
          itemName="牛津長袖襯衫-男"
          itemPrice="NT$399"
          imgSrc="https://s1.lativ.com.tw/i/66419/66419011/6641901_360.jpg"
        />
        <MyKeepItem
          itemName="柔軟舒適圓領毛衣-童"
          itemPrice="NT$450"
          imgSrc="	https://s2.lativ.com.tw/i/67150/67150011/6715001_360.jpg"
        />
        <MyKeepItem
          itemName="牛津長袖襯衫-男"
          itemPrice="NT$399"
          imgSrc="https://s1.lativ.com.tw/i/66419/66419011/6641901_360.jpg"
        />
        <MyKeepItem
          itemName="柔軟舒適圓領毛衣-童"
          itemPrice="NT$450"
          imgSrc="	https://s2.lativ.com.tw/i/67150/67150011/6715001_360.jpg"
        />
        <MyKeepItem
          itemName="牛津長袖襯衫-男"
          itemPrice="NT$399"
          imgSrc="https://s1.lativ.com.tw/i/66419/66419011/6641901_360.jpg"
        />
        <MyKeepItem
          itemName="柔軟舒適圓領毛衣-童"
          itemPrice="NT$450"
          imgSrc="	https://s2.lativ.com.tw/i/67150/67150011/6715001_360.jpg"
        />
      </ul>
    </div>
  );
}

export default MyKeep;
