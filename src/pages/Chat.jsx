import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import { Input } from "antd";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const stompClientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log("Connected: " + frame);
      stompClientRef.current = client;

      client.subscribe("/topic/messages", (messageOutput) => {
        const message = JSON.parse(messageOutput.body);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    });

    return () => {
      console.log("Disconnecting WebSocket");
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
    };
  }, []);

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  const sendMessage = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const randomId = generateRandomId();
      stompClientRef.current.send(
        "/app/message",
        {},
        JSON.stringify({ id: randomId, content: input, sender: "user" })
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: randomId, content: input, sender: "user" },
      ]);
      setInput("");
    } else {
      console.error("The connection has not been established yet");
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="w-[70%] mb-5 h-96 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-[#FCF6F0]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded break-words whitespace-pre-wrap flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.sender === "user"
                  ? "bg-[#E0F2FC] text-right"
                  : "bg-[#FBDCEA] text-left"
              } p-3 rounded-lg`}
            >
              {msg.content}
            </div>
          </div>
        ))}
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
