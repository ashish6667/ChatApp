import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 cursor-pointer ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}>
      <div className="flex space-x-6 px-5 py-2 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt={`${user.fullname}'s profile`}
            />
          </div>
           {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          )} 
        </div>
        <div>
          <h1 className="font-bold">{user.fullname}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
