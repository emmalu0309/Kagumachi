import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { Input } from "antd";
import ChatWindow from "../components/ChatWindow";
import useWebSocket from "../hooks/useWebSocket";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [lastMessageId, setLastMessageId] = useState(null);
  const stompClientRef = useRef(null);
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;
  const location = useLocation();
  const { orderNumber } = location.state || {};
  const [input, setInput] = useState(orderNumber ? `您好，關於訂單編號${orderNumber}有些疑問，請協助處理。` : "");

  const { markMessagesAsReadFront } = useWebSocket(memberId, (message) => {
    // console.log("Received message in useWebSocket callback:", message);
    setMessages((prevMessages) => {
      const messageExists = prevMessages.some(
        (msg) => msg.id === message.id
      );
      if (messageExists) {
        // console.log("Message already exists, not updating state.");
        return prevMessages;
      }
      const updatedMessages = [...prevMessages, message].sort((a, b) => a.timestamp - b.timestamp);
      // console.log("Updated messages state:", updatedMessages);
      return updatedMessages;
    });
  });

  const connectWebSocket = useCallback(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        memberId: memberId.toString(),
      },
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      debug: (str) => {
        // console.log("STOMP: " + str);
      },
      onConnect: (frame) => {
        // console.log("WebSocket connected:", frame);
        stompClientRef.current = client;
        client.subscribe("/topic/messages/" + memberId, (messageOutput) => {
          const message = JSON.parse(messageOutput.body);
          // console.log("Received message from server:", message);
          if (!message.id) {
            message.id = Date.now(); // 確保訊息有唯一的 id
          }
          // console.log("Comparing message.id:", message.id, "with lastMessageId:", lastMessageId);
          if (
            message.receiverid === memberId.toString() ||
            message.senderid === memberId.toString()
          ) {
            if (message.id !== lastMessageId) {
              setMessages((prevMessages) => {
                const messageExists = prevMessages.some(
                  (msg) => msg.id === message.id
                );
                if (messageExists) {
                  // console.log("Message already exists, not updating state.");
                  return prevMessages;
                }
                const updatedMessages = [...prevMessages, message].sort((a, b) => a.timestamp - b.timestamp);
                // console.log("Updated messages state:", updatedMessages);
                return updatedMessages;
              });
              setLastMessageId(message.id);
            } else {
              // console.log("Message ID is the same as the last one, not updating state.");
            }
          }
        });

        client.subscribe("/topic/historyFront", (messageOutput) => {
          const historyMessages = JSON.parse(messageOutput.body);
          // console.log("Received history from server:", historyMessages);
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
        // console.error("Broker reported error: " + frame.headers["message"]);
        // console.error("Additional details: " + frame.body);
      },
      onWebSocketClose: (event) => {
        // console.log("WebSocket disconnected:", event);
      },
    });

    client.activate();

    return () => {
      // console.log("Disconnecting WebSocket");
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [memberId, lastMessageId]);

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  useEffect(() => {
    if (location.pathname === '/MemberInfo/Chat') {
      // console.log("Entering /MemberInfo/Chat, marking messages as read");
      markMessagesAsReadFront(memberId);
    }
  }, [location.pathname, markMessagesAsReadFront, memberId]);

  const sendMessage = useCallback(() => {
    if (input.trim() === "") {
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
      // console.log("Sending message:", message);
      stompClientRef.current.publish({
        destination: "/app/message",
        body: JSON.stringify(message),
      });
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message].sort((a, b) => a.timestamp - b.timestamp);
        // console.log("Updated messages state after sending message:", updatedMessages);
        return updatedMessages;
      });
      setInput("");
      setLastMessageId(message.id); // 更新 lastMessageId
    } else {
      // console.error("The connection has not been established yet");
      connectWebSocket(); // 重新連接 WebSocket
    }
  }, [input, memberId, connectWebSocket]);

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