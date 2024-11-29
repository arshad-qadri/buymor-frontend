"use client"
import Link from "next/link";

const ForgotPasswordPage = () => {
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Forgot password form submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">Forgot Password</h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email address to reset your password.
        </p>
        <form onSubmit={handleForgotPassword}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send Reset Link
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-300"></div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Remembered your password?{" "}
          <Link href="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
