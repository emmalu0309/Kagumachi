import { useEffect, useRef, useCallback } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

const useWebSocket = (memberId, onMessageReceived) => {
  const stompClientRef = useRef(null);
  const onMessageReceivedRef = useRef(onMessageReceived);

  useEffect(() => {
    onMessageReceivedRef.current = onMessageReceived;
  }, [onMessageReceived]);

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
          onMessageReceivedRef.current(message);
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

  const markMessagesAsReadFront = useCallback((userId) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      console.log(`Marking messages as read for front site, userId: ${userId}`);
      stompClientRef.current.publish({
        destination: "/app/markAsReadFront",
        body: JSON.stringify(userId),
      });
      console.log("Message sent to /app/markAsReadFront");
    } else {
      // console.error("WebSocket is not connected, retrying...");
      setTimeout(() => markMessagesAsReadFront(userId), 1000);
    }
  }, []);

  return { stompClientRef, markMessagesAsReadFront };
};

export default useWebSocket;