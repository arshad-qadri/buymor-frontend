import Link from "next/link";

const ForgotPasswordSuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Check Your Email
        </h1>
        <p className="text-center text-gray-700 mb-4">
          We've sent a password reset link to your email address. Follow the link to reset your password.
        </p>

        {/* Illustration (Optional) */}
        <div className="flex justify-center mb-6">
          <img
            src="/email-sent.png" // Replace with an illustration/image of your choice
            alt="Email Sent Illustration"
            className="w-48 h-48"
          />
        </div>

        {/* Back to Login Button */}
        <Link href="/login">
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Back to Login
          </button>
        </Link>

        {/* Resend Email Option */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Didn't receive the email?{" "}
          <Link
            href="/forgot-password"
            className="text-indigo-600 font-medium hover:underline"
          >
            Resend Link
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordSuccessPage;
