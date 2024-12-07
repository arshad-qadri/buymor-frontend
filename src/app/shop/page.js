"use client";

import Image from "next/image";
import { useState } from "react";

const ShopPage = () => {
  // Example product data
  const products = [
    {
      id: 1,
      name: "T-Shirt",
      price: 499,
      image:
        "https://images.bewakoof.com/t1080/men-s-blue-trust-your-ability-typography-t-shirt-295625-1720094608-1.jpg",
      category: "Men",
    },
    {
      id: 2,
      name: "Hoodie",
      price: 999,
      image:
        "https://images.bewakoof.com/t1080/women-s-beige-orange-all-over-printed-oversized-hoodies-641009-1731056137-1.jpg",
      category: "Women",
    },
    {
      id: 3,
      name: "Sweatshirt",
      price: 799,
      image:
      "https://images.bewakoof.com/t1080/women-s-beige-orange-all-over-printed-oversized-hoodies-641009-1731056137-1.jpg",
      category: "Men",
    },
    {
      id: 4,
      name: "T-Shirt",
      price: 559,
      image:
        "https://images.bewakoof.com/t1080/men-s-blue-trust-your-ability-typography-t-shirt-295625-1720094608-1.jpg",
      category: "Men",
    },
    {
      id: 5,
      name: "Hoodie",
      price: 1999,
      image:
        "https://images.bewakoof.com/t1080/women-s-beige-orange-all-over-printed-oversized-hoodies-641009-1731056137-1.jpg",
      category: "Women",
    },
    {
      id: 6,
      name: "Sweatshirt",
      price: 1799,
      image:
      "https://images.bewakoof.com/t1080/women-s-beige-orange-all-over-printed-oversized-hoodies-641009-1731056137-1.jpg",
      category: "Men",
    },
    {
      id: 7,
      name: "T-Shirt",
      price: 1499,
      image:
        "https://images.bewakoof.com/t1080/men-s-blue-trust-your-ability-typography-t-shirt-295625-1720094608-1.jpg",
      category: "Men",
    },
    {
      id: 8,
      name: "Hoodie",
      price: 299,
      image:
        "https://images.bewakoof.com/t1080/women-s-beige-orange-all-over-printed-oversized-hoodies-641009-1731056137-1.jpg",
      category: "Women",
    },
    {
      id: 9,
      name: "Sweatshirt",
      price: 809,
      image:
      "https://images.bewakoof.com/t1080/women-s-beige-orange-all-over-printed-oversized-hoodies-641009-1731056137-1.jpg",
      category: "Men",
    },
    
  ];

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOrder, setSortOrder] = useState("asc");

  // Function to handle filtering and sorting
  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory === "All") return true;
      return product.category === selectedCategory;
    })
    .filter((product) => product.price <= maxPrice)
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">Shop</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Section */}
        <aside >
         <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          {/* Category Filter */}
         <div className="mb-6">
            <h3 className="font-semibold mb-2">Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="All">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Price Range</h3>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>₹0</span>
                <span>₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          {/* Sort Options */}
          <div>
            <h3 className="font-semibold mb-2">Sort By</h3>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
         </div>

        </aside>

        {/* Products Section */}
        <section className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
            >
              <Image
              width={192}
              height={192}
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="font-bold text-lg mt-4">{product.name}</h2>
              <p className="text-gray-700 mt-2">₹{product.price}</p>
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Add to Cart
              </button>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-700">
              No products found.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ShopPage;
