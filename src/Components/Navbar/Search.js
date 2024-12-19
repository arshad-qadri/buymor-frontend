"use client";
// import useDebounce from "@/context/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/shop?q=${search}`);
  };

  useEffect(() => {
    const q = searchParams.get("q");
    // console.log();
    if (q) {
      setSearch(q);
    }
  }, [searchParams]);
  // const debaounceSearch = useDebounce(search, 300);
  // useEffect(() => {
  //   if (debaounceSearch) {
  //     alert(debaounceSearch);
  //   }
  // }, [debaounceSearch]);
  return (
    <form className=" mx-4 hidden md:block" onSubmit={handleSubmit}>
      <div className="relative  lg:w-[500px] md:w-[300px]   border border-red-300 rounded-md">
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
