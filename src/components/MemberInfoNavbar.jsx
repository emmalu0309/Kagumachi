import { Link, useMatch } from "react-router-dom";

function LoginNavbar() {

  const isMyKeep = useMatch("/MemberInfo/MyKeep");
  const isMyOrders = useMatch("/MemberInfo/MyOrders");
  const isChat = useMatch("/MemberInfo/Chat");
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
              訂單查詢 / 評論
            </Link>
          </li>
          <li className={`${isChat?'bg-[#F0EDE5]':'bg-[#DDDDDD]'} hover:bg-[#F0EDE5] p-3 border rounded-md ml-1`}>
            <Link className={link} to="Chat">
              線上客服
            </Link>
          </li>
          <li className={`${isProfile?'bg-[#F0EDE5]':'bg-[#DDDDDD]'} hover:bg-[#F0EDE5] p-3 border rounded-md ml-1`}>
            <Link className={link} to="Profile">
              會員資料修改
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LoginNavbar;
