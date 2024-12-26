"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { baseUrl } from "@/variable";

const ForgotPasswordPage = () => {
  const [method, setMethod] = useState("mobile"); // State to toggle between email and mobile
  const [inputValue, setInputValue] = useState(""); // State for email/mobile input
  const [isOtpSent, setIsOtpSent] = useState(false); // State to manage OTP flow
  const [otp, setOtp] = useState(Array(4).fill("")); // State for OTP input
  const [isOtpVerified, setIsOtpVerified] = useState(false); // State for OTP verification
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  }); // State for new password inputs

  const sentResetPasswordLinkToEmail = async () => {
    await axios
      .post(`${baseUrl}/auth/forgot-password`,{email:inputValue})
      .then((res) => {
        setInputValue("")
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data?.message);
        console.log(err);
      });
  };
  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (method === "email") {
      sentResetPasswordLinkToEmail();
    } else {
      console.log("Reset code sent to mobile number:", inputValue);
      setIsOtpSent(true); // Change UI for OTP entry
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Move focus to next input automatically
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    setOtp(newOtp);
  };

  const handleOtpBackspace = (index) => {
    if (index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);

    // Simulate OTP verification
    const isVerified = enteredOtp === "1234"; // Replace with backend verification
    if (isVerified) {
      console.log("OTP Verified Successfully");
      setIsOtpVerified(true); // Switch to change password UI
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Password changed successfully:", passwords.newPassword);
    // Integrate with the backend to update the password
    alert("Password changed successfully. You can now log in.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          {isOtpVerified
            ? "Change Password"
            : isOtpSent
            ? "Verify Mobile Number"
            : "Forgot Password"}
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          {isOtpVerified
            ? "Enter your new password to reset it."
            : isOtpSent
            ? "Enter the 4-digit OTP sent to your mobile number."
            : "Choose how you want to reset your password."}
        </p>

        {!isOtpVerified && !isOtpSent && (
          <>
            {/* Toggle between email and mobile */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                className={`px-4 py-2 rounded-l border ${
                  method === "mobile"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setMethod("mobile")}
              >
                Mobile
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-r border ${
                  method === "email"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setMethod("email")}
              >
                Email
              </button>
            </div>

            {/* Form for Email or Mobile */}
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label
                  htmlFor={method}
                  className="block text-gray-700 font-medium"
                >
                  {method === "email" ? "Email Address" : "Mobile Number"}
                </label>
                <input
                  type={method === "email" ? "email" : "text"}
                  id={method}
                  name={method}
                  placeholder={
                    method === "email"
                      ? "Enter your email address"
                      : "Enter your mobile number"
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {method === "email" ? "Send Reset Link" : "Send Reset Code"}
              </button>
            </form>
          </>
        )}

        {/* OTP Entry */}
        {!isOtpVerified && isOtpSent && (
          <form onSubmit={handleOtpSubmit}>
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index]) {
                      handleOtpBackspace(index);
                    }
                  }}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Change Password */}
        {isOtpVerified && (
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Change Password
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="mt-6 border-t border-gray-300"></div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
