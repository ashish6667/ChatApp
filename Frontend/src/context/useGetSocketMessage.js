import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessage([...messages, newMessage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessage]);
};

export default useGetSocketMessage;
