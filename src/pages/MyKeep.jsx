import "./MyKeep.css";
import MyKeepItem from "../components/MyKeepItem";
function MyKeep() {
  return (
    <div className="MyKeepWrap">
      <div className="MyKeepWrap2">
        <div>
          <ul className="MyKeepul">
            <MyKeepItem itemName="牛津長袖襯衫-男" itemPrice="NT$399" imgSrc="https://s1.lativ.com.tw/i/66419/66419011/6641901_360.jpg" />
            <MyKeepItem itemName="柔軟舒適圓領毛衣-童" itemPrice="NT$450" imgSrc="	https://s2.lativ.com.tw/i/67150/67150011/6715001_360.jpg" />
            <MyKeepItem itemName="牛津長袖襯衫-男" itemPrice="NT$399" imgSrc="https://s1.lativ.com.tw/i/66419/66419011/6641901_360.jpg" />
            <MyKeepItem itemName="柔軟舒適圓領毛衣-童" itemPrice="NT$450" imgSrc="	https://s2.lativ.com.tw/i/67150/67150011/6715001_360.jpg" />
            <MyKeepItem itemName="牛津長袖襯衫-男" itemPrice="NT$399" imgSrc="https://s1.lativ.com.tw/i/66419/66419011/6641901_360.jpg" />
            <MyKeepItem itemName="柔軟舒適圓領毛衣-童" itemPrice="NT$450" imgSrc="	https://s2.lativ.com.tw/i/67150/67150011/6715001_360.jpg" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyKeep;
