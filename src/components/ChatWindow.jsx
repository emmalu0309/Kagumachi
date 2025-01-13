// ChatWindow.jsx
import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  meridiem: (hour) => {
    if (hour < 12) {
      return "上午";
    } else {
      return "下午";
    }
  },
});

const ChatWindow = ({ messages, memberId }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (timestamp) => {
    return dayjs(timestamp).format("A hh:mm");
  };

  const formatDate = (timestamp) => {
    return dayjs(timestamp).format("YYYY-MM-DD");
  };

  const renderMessagesWithDate = () => {
    const renderedMessages = [];
    let lastDate = null;

    messages.forEach((msg, index) => {
      const currentDate = formatDate(msg.timestamp);
      if (currentDate !== lastDate) {
        renderedMessages.push(
          <div key={`date-${index}`} className="text-center text-gray-500 my-2">
            {currentDate}
          </div>
        );
        lastDate = currentDate;
      }

      const isSender = msg.senderid.toString() === memberId.toString();
      renderedMessages.push(
        <div
          key={index}
          className={`mt-3 flex ${isSender ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`relative p-3 rounded break-words whitespace-pre-wrap ${
              isSender ? "bg-[#E0F2FC] text-right" : "bg-[#FBDCEA] text-left"
            } rounded-lg font-chat text-lg`}
          >
            {msg.content}
            <div
              className={`absolute text-xs text-gray-500 bottom-[0.2rem] ${
                isSender ? "left-[-4.5rem]" : "right-[-4.5rem]"
              } font-chat`}
            >
              {formatTime(msg.timestamp)}
            </div>
          </div>
        </div>
      );
    });

    return renderedMessages;
  };

  return (
    <div
      ref={chatContainerRef}
      className="w-[70%] mb-5 h-96 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-[#FCF6F0]"
    >
      {renderMessagesWithDate()}
    </div>
  );
};

export default ChatWindow;