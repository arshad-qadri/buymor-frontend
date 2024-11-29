import React from "react";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  return (
    <div className="flex-grow mx-4 ">
      <div className="relative  w-[500px]   border border-gray-300 rounded-md">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full max-w-md pl-4 pr-16 py-2 border-0 rounded-md  focus:border-none focus:outline-none"
        />
        <button className="absolute top-1/2 right-1 -translate-y-1/2 h-full w-10 flex justify-center items-center">
          <IoIosSearch size={"20px"} />
        </button>
      </div>
    </div>
  );
};

export default Search;
