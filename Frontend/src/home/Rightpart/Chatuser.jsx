import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "online" : "offline";
  };
  // console.log(selectedConversation.fullname);

  return (
    <div className="flex space-x-3 items-center justify-center w-full bg-gray-800 hover:bg-gray-700 duration-300 ">
      <div className="avatar online">
        <div className="w-12 rounded-full ">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-full"
          />
        </div>
      </div>
      <div>
        <h1 className="text-xl">
          {selectedConversation.fullname || "Unknown User"}
        </h1>
        <span className="text-sm">
          {getOnlineUsersStatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
