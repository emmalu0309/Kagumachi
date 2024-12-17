import { Link } from "react-router-dom";
import './LoginNavbar.css'
function LoginNavbar() {
  return (
        <div className="LoginNavbarContent">
          <div className="login_nav">
            <ul className="LoginNavbarul">
              <li className="LoginNavbarli">
                <Link className="LoginNavbarLink" to="MyKeep">
                  我的收藏
                </Link>
              </li>
              <li className="LoginNavbarli">
                <Link className="LoginNavbarLink" to="Member">
                  訂單 / 問答 / 退貨進度
                </Link>
              </li>
              <li className="LoginNavbarli">
                <Link className="LoginNavbarLink" to="Profile">
                  個人資料修改及密碼修改
                </Link>
              </li>
            </ul>
          </div>
        </div>
  );
}

export default LoginNavbar;