import { Link, useMatch } from "react-router-dom";

function LoginNavbar() {

  const isMyKeep = useMatch("/MemberInfo/MyKeep");
  const isMyOrders = useMatch("/MemberInfo/MyOrders");
  const isProfile = useMatch("/MemberInfo/Profile");
  const link = "p-10 text-[#706E6C]";

  return (
    <div className="mt-5 flex justify-center">
      <div className="w-7/12">
        <ul className="flex justify-center">
          <li className={`${isMyKeep?'bg-[#F0EDE5]':'bg-[#DDDDDD]'} hover:bg-[#F0EDE5] p-3 border rounded-md`}>
            <Link className={link} to="MyKeep">
              我的收藏
            </Link>
          </li>
          <li className={`${isMyOrders?'bg-[#F0EDE5]':'bg-[#DDDDDD]'} hover:bg-[#F0EDE5] p-3 border rounded-md ml-1`}>
            <Link className={link} to="MyOrders">
              訂單 / 問答 / 退貨進度
            </Link>
          </li>
          <li className={`${isProfile?'bg-[#F0EDE5]':'bg-[#DDDDDD]'} hover:bg-[#F0EDE5] p-3 border rounded-md ml-1`}>
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
