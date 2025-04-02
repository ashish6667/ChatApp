import React from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
  return (
    <form action="" className="flex items-center gap-2 px-5 py-3 w-full">
      <input
        type="text"
        className="h-8 outline-none rounded-md w-full px-2 bg-gray-600 text-gray-300 "
        placeholder="Search"
      />
      <button className="rounded-full overflow-hidden">
        <FaSearch className="text-3xl hover:bg-gray-600 rounded-full duration-300" />
      </button>
    </form>
  );
}

export default Search;
