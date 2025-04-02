import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble  ${chatColor}`}>
            {message.message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
