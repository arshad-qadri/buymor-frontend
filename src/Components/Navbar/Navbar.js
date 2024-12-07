import Link from "next/link";
import { BsBucket } from "react-icons/bs";
import Search from "./Search";

const Navbar = () => (
  <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-20">
    {/* Logo and Links */}
    <div className="flex items-center space-x-6">
      <h1 className="text-2xl font-bold text-indigo-600"><Link href={"/"}>Buymor</Link></h1>
      <Link href="/shop?category=men" className="text-gray-700 hover:text-indigo-600">
        Men
      </Link>
      <Link href="/shop?category=women" className="text-gray-700 hover:text-indigo-600">
        Women
      </Link>
    </div>

    {/* Search Box */}
    <Search />

    {/* Cart and Login */}
    <div className="space-x-4 flex items-center">
      <Link href="/cart" className="text-gray-700 hover:text-indigo-600">
        <BsBucket size={"20px"} />
      </Link>
      <Link href="/login" className="bg-transparent text-black px-4 py-2 rounded-md ">
        Login
      </Link>
    </div>
  </nav>
);

export default Navbar;
