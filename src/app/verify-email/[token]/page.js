'use client';

import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/variable";

export default function VerifyEmail({ params }) {
  // Unwrap `params` using `React.use()`
  const { token } = React.use(params);
  console.log("param===", token);

  // State to handle success/error messages
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyEmail = async () => {
    if (!token) {
      setMessage("Invalid token. Please try again.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage(""); // Clear any previous message

      // Call the API using Axios
      const response = await axios.get(`${baseUrl}/auth/verify-email/${token}`);

      // Handle the response
      setMessage(response.data.message || "Email successfully verified!");
    } catch (error) {
      // Handle errors
      if (error.response) {
        setMessage(error.response.data.message || "Verification failed. Please try again.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
      console.error("Error verifying email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          Please click the button below to verify your email address and complete the setup of your account.
        </p>

        {message && (
          <div
            className={`mb-4 p-4 rounded-lg text-white ${
              message.includes("successfully")
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <button
          onClick={handleVerifyEmail}
          disabled={isLoading}
          className={`px-6 py-3 text-white ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          } rounded-lg shadow`}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
}
