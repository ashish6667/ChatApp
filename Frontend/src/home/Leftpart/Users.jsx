import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  console.log(allUsers);
  return (
    <div className="flex flex-col justify-center w-full items-center ">
      <h1 className="px-5 py-2 w-full text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="flex flex-col justify-start overflow-y-auto scroll-smooth w-full px-5"
        style={{
          height: "400px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          {allUsers.map((user,index) => (
            <User key={index} user={user} />
            ))}
        </div>
    </div>
  );
}

export default Users;
