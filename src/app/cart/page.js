"use client";

import AddNewAddressModal from "@/Components/modals/AddNewAddress";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(1);
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

  const [step, setStep] = useState(1);

 

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

 

  const renderCartSummary = () => (
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
    </div>
  );

  const renderAddress = () => {
    const addresses = [
      {
        id: 1,
        country: "India",
        fullName: "John Doe",
        mobile: "1234567890",
        pincode: "123456",
        flat: "Flat 101",
        area: "Main Street",
        landmark: "Near Park",
        city: "Mumbai",
        state: "Maharashtra",
      },
      {
        id: 2,
        country: "India",
        fullName: "Jane Smith",
        mobile: "9876543210",
        pincode: "654321",
        flat: "Flat 202",
        area: "Baker Street",
        landmark: "Opposite Mall",
        city: "Pune",
        state: "Maharashtra",
      },
    ];
  
    const handleAddAddress = (newAddress) => {
      console.log("Address Added:", newAddress);
      // Handle the new address as required (send to an API, update the UI, etc.)
    };
  
    const handleAddressSelect = (addressId) => {
      setSelectedAddress(addressId);
    };
  
    return (
      <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
  
        <div className=" mb-4 flex justify-start items-center gap-x-2 flex-wrap">
          {addresses.map((address) => (
            <div key={address.id} className="flex items-center border p-2 rounded-lg">
              <input
                type="radio"
                checked={selectedAddress === address.id}
                onChange={() => handleAddressSelect(address.id)}
                className="mr-2 scale-110"
              />
              <div >
                <p>{address.fullName}</p>
                <p>{address.flat}, {address.area}</p>
                <p>{address.city}, {address.state} - {address.pincode}</p>
                <p>{address.mobile}</p>
              </div>
            </div>
          ))}
        </div>
  
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-indigo-600  p-2 rounded"
        >
          Add New Address
        </button> <br />
        <button
        onClick={() => setStep(3)}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Proceed to Payment
      </button>
        <AddNewAddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddAddress={handleAddAddress}
        />
      </div>
    );
  };

  const renderPayment = () => (
    <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Payment Method</h2>
      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="payment"
            value="cash"
            defaultChecked
            className="mr-2"
          />
          Cash on Delivery
        </label>
      </div>
      <button
        onClick={() => setStep(4)}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );

  const renderOrderSuccess = () => (
    <div className="lg:col-span-2 flex justify-center items-center flex-col bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-2xl font-bold text-green-600">
        Order Placed Successfully!
      </h2>
      <p className="mt-2">Thank you for shopping with us.</p>
      <Link href={"/"} className="bg-indigo-600 text-white px-3 py-2 rounded-md shadow-md mt-3">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {step === 1 && (
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <Image
                  width={92}
                  height={92}
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
        )}
        <div>
          {renderCartSummary()}
          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          )}
        </div>
        {step === 2 && renderAddress()}
        {step === 3 && renderPayment()}
        {step === 4 && renderOrderSuccess()}
      </div>
    </div>
  );
};

export default CartPage;
