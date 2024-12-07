"use client"
import { useRouter ,useSearchParams} from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Search = ({}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams()
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/shop?q=${search}`);
  };

  useEffect(() => {
    const q = searchParams.get("q")
      // console.log();
      if(q) {
        setSearch(q);
      }
      
  },[searchParams])
  return (
    <form className="flex-grow mx-4" onSubmit={handleSubmit}>
      <div className="relative  w-[500px]   border border-gray-300 rounded-md">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for products..."
          className="w-full max-w-md pl-4 pr-16 py-2 border-0 rounded-md  focus:border-none focus:outline-none"
          value={search}
        />
        <button
          type="submit"
          className="absolute top-1/2 right-1 -translate-y-1/2 h-full w-10 flex justify-center items-center"
        >
          <IoIosSearch size={"20px"} />
        </button>
      </div>
    </form>
  );
};

export default Search;
