"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/variable";
import Cookies from "js-cookie";
import { api } from "@/utils/axios";

const ProfilePage = () => {
  const router = useRouter();
  const { user, loading, error } = useAuth();
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const [sendingVerificationLink, setSendingVerificationLink] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (err) {
        console.log("Error fetching orders:", err);
      } finally {
        setOrderLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleViewOrderDetails = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  const handleStartShopping = () => {
    router.push("/shop");
  };
  const handleSendVerificationLink = async () => {
    const authToken = Cookies.get("authToken");

    if (authToken) {
      setSendingVerificationLink(true);
      try {
        await api.post(`/auth/resend-verification-link`);
        alert("Verification link sent successfully!");
      } catch (err) {
        console.log("Error sending verification link:", err);
        alert("Failed to send verification link. Please try again later.");
      } finally {
        setSendingVerificationLink(false);
      }
    }
  };
  return (
    <div className="min-h-[82vh]">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 sm:p-6">
          {error && (
            <p className="text-red-600 text-center font-medium mb-4">{error}</p>
          )}

          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            {/* Left Side - Profile Image Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
              <div className="relative w-full flex flex-col items-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 text-2xl sm:text-3xl bg-gray-300 rounded-full border-4 border-indigo-600 flex justify-center items-center">
                  {user?.name?.[0] || "?"}
                </div>
                <button
                  className="mt-4 w-full max-w-[200px] bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => alert("Open image upload dialog")}
                >
                  Change Photo
                </button>
              </div>
            </div>

            {/* Right Side - User Details Section */}
            <div className="w-full md:w-2/3">
              <h1 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-6 text-center md:text-left">
                Your Profile
              </h1>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-medium text-gray-700">Full Name:</span>
                  <span className="text-gray-900 break-all">
                    {user?.name || "Not Available"}
                  </span>
                </div>
                <hr />
                {/* Email with Verification Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-medium text-gray-700">Email:</span>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 break-all">
                    <span className="text-gray-900">
                      {user?.email || "Not Available"}
                    </span>
                    <button
                      disabled={
                        user?.isEmailVerified || sendingVerificationLink
                      }
                      onClick={handleSendVerificationLink}
                      className={`${
                        user?.isEmailVerified
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      } text-sm px-2 py-1 rounded whitespace-nowrap`}
                    >
                      {user?.isEmailVerified
                        ? "Verified"
                        : `${
                            sendingVerificationLink
                              ? "Sending..."
                              : "Not Verified"
                          }`}
                    </button>
                  </div>
                </div>
                <hr />
                {/* Phone Number with Verification Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-medium text-gray-700">
                    Phone Number:
                  </span>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <span className="text-gray-900">
                      {user?.mobileNumber || "Not Available"}
                    </span>
                    <span
                      className={`${
                        user?.isMobileVerified
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      } text-sm px-2 py-1 rounded whitespace-nowrap`}
                    >
                      {user?.isMobileVerified ? "Verified" : "Not Verified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="mt-6 flex justify-center md:justify-start">
                <button
                  className="w-full sm:w-auto bg-indigo-600 text-white py-2 px-8 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Orders Section - Full Width */}
          <div className="border-t pt-8">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-600 mb-6">
              Recent Orders
            </h2>

            {orderLoading ? (
              <div className="text-center py-4">Loading orders...</div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end">
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100"
                              : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                        <p className="font-medium text-indigo-600">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {order.items.length} items
                    </div>
                    <button
                      className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      onClick={() => handleViewOrderDetails(order.id)}
                    >
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No orders found</p>
                <button
                  className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={handleStartShopping}
                >
                  Start Shopping →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
