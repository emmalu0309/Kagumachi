import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { Input } from "antd";

const memberId = 100; // 等到會員功能實作再改，現在先固定為100，想用不同會員測試的話可自行改成其他數字。

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const stompClientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws', // 先用localhost，之後再改成部署的網址，測試時要換IP請自行更改。
      connectHeaders: {
        memberId: memberId.toString(),
      },
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'), // 先用localhost，之後再改成部署的網址，測試時要換IP請自行更改。
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
      onConnect: (frame) => {
        console.log('WebSocket connected:', frame);
        stompClientRef.current = client;
        client.subscribe('/topic/messages/' + memberId, (messageOutput) => {
          const message = JSON.parse(messageOutput.body);
          console.log('Received message from server:', message);
          if (message.receiverid === memberId.toString() || message.senderid === memberId.toString()) {
            setMessages((prevMessages) => [...prevMessages, message].sort((a, b) => a.timestamp - b.timestamp));
          }
        });

        client.subscribe('/topic/historyFront', (messageOutput) => {
          const historyMessages = JSON.parse(messageOutput.body);
          console.log('Received history from server:', historyMessages);
          setMessages((prevMessages) => [...prevMessages, ...historyMessages].sort((a, b) => a.timestamp - b.timestamp));
        });

        // 請求歷史訊息
        client.publish({
          destination: '/app/historyFront',
          body: JSON.stringify({ senderid: memberId.toString(), receiverid: '0' }),
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      onWebSocketClose: (event) => {
        console.log('WebSocket disconnected:', event);
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

  const sendMessage = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const message = { senderid: memberId.toString(), content: input, receiverid: '0' };
      console.log("Sending message:", message);
      stompClientRef.current.publish({
        destination: '/app/message',
        body: JSON.stringify(message),
      });
      setMessages((prevMessages) => [...prevMessages, message].sort((a, b) => a.timestamp - b.timestamp));
      setInput("");
    } else {
      console.error("The connection has not been established yet");
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="w-[70%] mb-5 h-96 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-[#FCF6F0]">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`mb-2 p-3 rounded break-words whitespace-pre-wrap flex ${
                msg.senderid.toString() === memberId.toString() ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.senderid.toString() === memberId.toString()
                    ? "bg-[#E0F2FC] text-right"
                    : "bg-[#FBDCEA] text-left"
                } p-3 rounded-lg`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
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