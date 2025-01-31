import { Link, useMatch } from "react-router-dom";
import "./MemberInfoNavbar.css";
import useWebSocket from "../hooks/useWebSocket";
import { useEffect } from "react";

function MemberInfoNavbar({ memberId, hasNewMessage, setHasNewMessage }) {
  const isMyKeep = useMatch("/MemberInfo/MyKeep");
  const isMyOrders = useMatch("/MemberInfo/MyOrders");
  const isChat = useMatch("/MemberInfo/Chat");
  const isProfile = useMatch("/MemberInfo/Profile");
  const link = "p-10 text-[#706E6C]";
  const { markMessagesAsReadFront } = useWebSocket(memberId, () => {});

  const handleChatClick = () => {
    setHasNewMessage(false);
    console.log("Clicking on Chat, marking messages as read");
    markMessagesAsReadFront(memberId);
  };

  useEffect(() => {
    if (isChat) {
      // console.log("Page is /MemberInfo/Chat, marking messages as read");
      setHasNewMessage(false);
      markMessagesAsReadFront(memberId);
    }

    return () => {
      if (isChat) {
        // console.log("Leaving /MemberInfo/Chat, marking messages as read");
        setHasNewMessage(false);
        markMessagesAsReadFront(memberId);
      }
    };
  }, [isChat, markMessagesAsReadFront, memberId]);

  return (
    <div className="mt-5 flex justify-center">
      <div className="w-7/12">
        <ul className="flex justify-center">
          <li className={`${isMyKeep ? 'bg-[#F0EDE5]' : 'bg-[#DDDDDD]'} hover:bg-[#F0EDE5] p-3 border rounded-md`}>
            <Link className={link} to="MyKeep">
              我的收藏
            </Link>
          </li>
          <li className={`${isMyOrders ? 'bg-[#F0EDE5]' : 'bg-[#DDDDDD]'} hover:bg-[#F0EDE5] p-3 border rounded-md ml-1`}>
            <Link className={link} to="MyOrders">
              訂單查詢 / 評論
            </Link>
          </li>
          <li className={`${isChat ? 'bg-[#F0EDE5]' : 'bg-[#DDDDDD]'} ${hasNewMessage && !isChat ? 'notification-animation' : ''} hover:bg-[#F0EDE5] p-3 border rounded-md ml-1 relative`}>
            <Link className={link} to="Chat" onClick={handleChatClick}>
              線上客服
              {hasNewMessage && !isChat && <span className="notification-animation absolute top-[0.5rem] right-[1.4rem] w-4 h-4 rounded-full"></span>}
            </Link>
          </li>
          <li className={`${isProfile ? 'bg-[#F0EDE5]' : 'bg-[#DDDDDD]'} hover:bg-[#F0EDE5] p-3 border rounded-md ml-1`}>
            <Link className={link} to="Profile">
              會員資料修改
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MemberInfoNavbar;
