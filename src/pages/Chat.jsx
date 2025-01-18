import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { Input } from "antd";
import ChatWindow from "../components/ChatWindow";
import useWebSocket from "../hooks/useWebSocket";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const stompClientRef = useRef(null);
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;

  const { markMessagesAsReadFront } = useWebSocket(memberId, (message) => {
    setMessages((prevMessages) => {
      const messageExists = prevMessages.some(
        (msg) => msg.id === message.id
      );
      if (messageExists) {
        return prevMessages;
      }
      return [...prevMessages, message].sort((a, b) => a.timestamp - b.timestamp);
    });
  });

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws", // 先用localhost，之後再改成部署的網址，測試時要換IP請自行更改。
      connectHeaders: {
        memberId: memberId.toString(),
      },
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"), // 先用localhost，之後再改成部署的網址，測試時要換IP請自行更改。
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
            setMessages((prevMessages) => {
              const messageExists = prevMessages.some(
                (msg) => msg.id === message.id
              );
              if (messageExists) {
                return prevMessages;
              }
              return [...prevMessages, message].sort((a, b) => a.timestamp - b.timestamp);
            });
          }
        });

        client.subscribe("/topic/historyFront", (messageOutput) => {
          const historyMessages = JSON.parse(messageOutput.body);
          console.log("Received history from server:", historyMessages);
          setMessages(
            historyMessages.sort((a, b) => a.timestamp - b.timestamp)
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
  }, [memberId]);

  useEffect(() => {
    if (location.pathname === '/MemberInfo/Chat') {
      console.log("Entering /MemberInfo/Chat, marking messages as read");
      markMessagesAsReadFront(memberId);
    }
  }, [location.pathname, markMessagesAsReadFront]);

  const sendMessage = useCallback(() => {
    if (input.trim() === "") {
      // console.error("訊息不可為空");
      return;
    }
    if (stompClientRef.current && stompClientRef.current.connected) {
      const message = {
        id: Date.now(),
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
  }, [input, memberId]);

  return (
    <div className="p-5 flex justify-center">
      <ChatWindow messages={messages} memberId={memberId} />
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