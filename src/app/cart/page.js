"use client";

import { useState } from "react";

const CartPage = () => {
  // Example cart items (You can replace this with data from a global store like Redux or Context API)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "T-Shirt",
      price: 499,
      image:
        "https://images.bewakoof.com/t1080/men-s-blue-trust-your-ability-typography-t-shirt-295625-1720094608-1.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Hoodie",
      price: 999,
      image:
        "https://images.bewakoof.com/t1080/women-s-beige-orange-all-over-printed-oversized-hoodies-641009-1731056137-1.jpg",
      quantity: 2,
    },
  ]);

  // Function to handle quantity change
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to handle item removal
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-gray-700">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <button
              onClick={() => alert("Proceeding to checkout...")}
              className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700">
          Your cart is empty.{" "}
          <a href="/" className="text-indigo-600 hover:underline">
            Continue Shopping
          </a>
        </p>
      )}
    </div>
  );
};

export default CartPage;
