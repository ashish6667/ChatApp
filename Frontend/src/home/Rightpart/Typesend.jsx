import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage(); 

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex justify-start items-center p-4 gap-3 w-full bg-inherit">
        <input
          type="text"
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=" border border-gray-700 rounded-xl  outline-none w-full px-3 py-2   bg-slate-700 text-gray-300  "
        />
        <button className="w-5">
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
