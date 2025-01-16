import React, { useState, useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MemberInfoNavbar from "../components/MemberInfoNavbar";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import useWebSocket from "../hooks/useWebSocket";
import { AuthContext } from "../context/AuthContext";

function MemberInfo() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;

  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  const { markMessagesAsReadFront, stompClientRef } = useWebSocket(memberId, (message) => {
    if (location.pathname === '/MemberInfo/Chat') {
      markMessagesAsReadFront(memberId);
    } else {
      setHasNewMessage(true);
    }
  });

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
            if (location.pathname !== '/MemberInfo/Chat') {
              setHasNewMessage(true);
            }
          }
        });

        client.subscribe("/topic/historyFront", (messageOutput) => {
          const historyMessages = JSON.parse(messageOutput.body);
          console.log("Received history from server:", historyMessages);
          setMessages((prevMessages) =>
            [...historyMessages].sort(
              (a, b) => a.timestamp - b.timestamp
            )
          );
          const hasUnreadMessages = historyMessages.some(msg => !msg.isfrontread && msg.senderid !== memberId.toString());
          if (hasUnreadMessages) {
            setHasNewMessage(true);
          }
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
      client.deactivate();
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/MemberInfo/Chat') {
      console.log("Entering /MemberInfo/Chat, marking messages as read");
      markMessagesAsReadFront(memberId);
    }
  }, [location.pathname, markMessagesAsReadFront]);

  return (
    <>
      <MemberInfoNavbar memberId={memberId} hasNewMessage={hasNewMessage} setHasNewMessage={setHasNewMessage} />
      <div>
        <Outlet context={{ memberId }} />
      </div>
    </>
  );
}

export default MemberInfo;
