import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { Input } from "antd";
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

const memberId = 100;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const stompClientRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        memberId: memberId.toString(),
      },
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      debug: (str) => {
        console.log("STOMP: " + str);
      },
      onConnect: (frame) => {
        console.log("WebSocket connected:", frame);
        stompClientRef.current = client;
        client.subscribe("/topic/messages/" + memberId, (messageOutput) => {
          const message = JSON.parse(messageOutput.body);
          console.log("Received message from server:", message);
          if (
            message.receiverid === memberId.toString() ||
            message.senderid === memberId.toString()
          ) {
            setMessages((prevMessages) =>
              [...prevMessages, message].sort(
                (a, b) => a.timestamp - b.timestamp
              )
            );
          }
        });

        client.subscribe("/topic/historyFront", (messageOutput) => {
          const historyMessages = JSON.parse(messageOutput.body);
          console.log("Received history from server:", historyMessages);
          setMessages((prevMessages) =>
            [...prevMessages, ...historyMessages].sort(
              (a, b) => a.timestamp - b.timestamp
            )
          );
        });

        client.publish({
          destination: "/app/historyFront",
          body: JSON.stringify({
            senderid: memberId.toString(),
            receiverid: "0",
          }),
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onWebSocketClose: (event) => {
        console.log("WebSocket disconnected:", event);
      },
    });

    client.activate();

    return () => {
      console.log("Disconnecting WebSocket");
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const message = {
        senderid: memberId.toString(),
        content: input,
        receiverid: "0",
        timestamp: Date.now(),
      };
      console.log("Sending message:", message);
      stompClientRef.current.publish({
        destination: "/app/message",
        body: JSON.stringify(message),
      });
      setMessages((prevMessages) =>
        [...prevMessages, message].sort((a, b) => a.timestamp - b.timestamp)
      );
      setInput("");
    } else {
      console.error("The connection has not been established yet");
    }
  };

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
          className={`mb-2 flex ${isSender ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`relative p-3 rounded break-words whitespace-pre-wrap ${
              isSender ? "bg-[#E0F2FC] text-right" : "bg-[#FBDCEA] text-left"
            } rounded-lg`}
          >
            {msg.content}
            <div
              className={`absolute text-xs text-gray-500 bottom-[0.2rem] ${
                isSender ? "left-[-4rem]" : "right-[-4rem]"
              }`}
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
    <div className="p-5 flex justify-center">
      <div
        ref={chatContainerRef}
        className="w-[70%] mb-5 h-96 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-[#FCF6F0]"
      >
        {renderMessagesWithDate()}
      </div>
      <div className="w-[20%] ml-5">
        <Input.TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={13}
          placeholder="請輸入訊息"
          className="mb-9"
        />
        <div className="flex justify-center">
          <button
            className="px-20 py-3 border border-gray-300 rounded-md bg-[#5783db] text-gray-100 hover:bg-[#55c2da] hover:text-gray-100 hover:cursor-pointer"
            onClick={sendMessage}
          >
            確認送出
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;