import { Link } from "react-router-dom";

function MyKeepItem({ itemName, itemSrc, imgSrc, itemPrice }) {
  return (
    <li className="w-48 h-72 justify-self-center relative text-center p-2 border border-gray-200">
      <img
        className="h-5 w-5 absolute top-2 left-2 hover:cursor-pointer"
        src="https://s1.lativ.com.tw/images/btn_del.png"
      />
      {/* 點商品圖片會到該商品頁面 */}
      <Link to={itemSrc}>
        {/* 切換顏色應切換商品圖片(未完成) */}
        <img className="h-36 w-36 ml-3.5 hover:cursor-pointer" src={imgSrc} />
      </Link>
      <h3 className="text-xs my-2.5 text-gray-500 truncate ">{itemName}</h3>
      <h3 className="text-xs m-3 text-gray-400">{itemPrice}</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <select className="text-sm w-24 border border-gray-300 rounded text-gray-400">
                <option value="" disabled selected>
                  顏色
                </option>
                {/* 再想顏色要怎放進來 */}
                <option value="白色">白色</option>

                <option value="卡其">卡其</option>

                <option value="軍綠">軍綠</option>

                <option value="藍色">藍色</option>

                <option value="灰藍">灰藍</option>

                <option value="藏青">藏青</option>
              </select>
            </td>
            <td>
              <select className="text-sm w-16 float-right border border-gray-300 rounded text-gray-400">
                <option disabled selected>
                  尺寸
                </option>
                {/* 再想尺寸要怎放進來 */}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <select className="text-sm w-16 float-left mt-2 border border-gray-300 rounded text-gray-400">
                <option disabled selected>
                  數量
                </option>
                {/* 再想數量要怎放進來 */}
              </select>
            </td>
            <td>
              <button className="ml-7 px-1 py-0 mt-1 border border-gray-300 rounded-md bg-gray-100 text-gray-600 hover:bg-[#E4D8CC] hover:text-white">
                <span>選購</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  );
}

export default MyKeepItem;
