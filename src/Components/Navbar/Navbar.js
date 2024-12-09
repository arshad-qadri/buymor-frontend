"use client";
import Link from "next/link";
import { BsBucket } from "react-icons/bs";
import Search from "./Search";
import { Suspense, useState, useEffect } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const {user, logout} = useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking for authToken in cookies/localStorage)
    const authToken = document.cookie.includes("authToken"); // Or localStorage.getItem("authToken")
    setIsLoggedIn(authToken);
  }, []);


  const handleLogout = () => {
    // Handle user logout (clear cookies/localStorage and redirect to login)
    logout(setIsLoggedIn)
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-20">
      {/* Logo and Links */}
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold text-indigo-600">
          <Link href={"/"}>Buymor</Link>
        </h1>
        <Link
          href="/shop?category=men"
          className="text-gray-700 hover:text-indigo-600 hidden md:block"
        >
          Men
        </Link>
        <Link
          href="/shop?category=women"
          className="text-gray-700 hover:text-indigo-600 hidden md:block"
        >
          Women
        </Link>
      </div>

      {/* Search Box */}
      <Suspense>
        <Search />
      </Suspense>

      {/* Cart and User Section */}
      <div className="space-x-4 flex items-center relative">
        <Link href="/cart" className="text-gray-700 hover:text-indigo-600">
          <BsBucket size={"20px"} />
        </Link>

        {isLoggedIn ? (
          // Profile Dropdown
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className=" px-3 py-1 rounded-full bg-gray-300 font-semibold text-xl  uppercase"
            >
              {user?.name[0]}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-100"
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-100"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Login Button
          <Link
            href="/login"
            className="bg-transparent text-black px-4 py-2 rounded-md"
          >
            Login
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button className="block md:hidden">
          <FaBarsStaggered size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
