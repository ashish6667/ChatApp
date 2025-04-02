import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in Logout");
    }
  };
  return (
    <div className="flex justify-start items-center pl-5">
      <BiLogOutCircle
        className="text-5xl text-white  hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 "
        onClick={handleLogout}
      />
    </div>
  );
}

export default Logout;
