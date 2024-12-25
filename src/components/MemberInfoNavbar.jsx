import { Link } from "react-router-dom";

function LoginNavbar() {
  const ulLi = "bg-[#DDDDDD] p-3 hover:bg-[#F0EDE5] border ml-1";
  const link = "p-10 text-[#706E6C]";
  return (
    <div className="mt-5 flex justify-center">
      <div className="w-7/12">
        <ul className="flex justify-center">
          <li className={ulLi}>
            <Link className={link} to="MyKeep">
              我的收藏
            </Link>
          </li>
          <li className={ulLi}>
            <Link className={link} to="MyOrders">
              訂單 / 問答 / 退貨進度
            </Link>
          </li>
          <li className={ulLi}>
            <Link className={link} to="Profile">
              個人資料修改及密碼修改
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LoginNavbar;
