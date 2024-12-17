function MyKeepItem({itemName, imgSrc, itemPrice}) {
    return (
        <li className="MyKeepli">
              <img
                className="MyKeepDelImg"
                src="https://s1.lativ.com.tw/images/btn_del.png"
                alt=""
              />
              <a>
                <img
                  className="MyKeepImg"
                //   alt="牛津長袖襯衫-男"
                  src={imgSrc}
                />
              </a>
              <h3 className="any_display_name">{itemName}</h3>
              <h3 className="any_display_price">
                <span>
                  <span className="MyKeepCurrencySymbol">{itemPrice}</span>
                </span>
              </h3>
              <table>
                <tbody>
                  <tr>
                    <td className="MyKeepAlignL">
                      <select className="MyKeepColorOpt">
                        <option value="">顏色</option>

                        <option value="白色">白色</option>

                        <option value="卡其">卡其</option>

                        <option value="軍綠">軍綠</option>

                        <option value="藍色">藍色</option>

                        <option value="灰藍">灰藍</option>

                        <option value="藏青">藏青</option>
                      </select>
                    </td>
                    <td className="MyKeepAlignR">
                      <select className="MyKeepSizeOpt">
                        <option value="">尺寸</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="MyKeepAlignL">
                      <select className="MyKeepStockOpt">
                        <option value="">數量</option>
                      </select>
                    </td>
                    <td className="MyKeepAlignR">
                      <button className="MyKeepCheckBtn">
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