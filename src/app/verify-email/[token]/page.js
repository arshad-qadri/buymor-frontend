'use client';

export default function VerifyEmail() {
  const handleVerifyEmail = async () => {
    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
      });

      if (response.ok) {
        alert('Email verified successfully!');
      } else {
        alert('Failed to verify email. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      alert('Something went wrong. Please try again.');
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
        <button
          onClick={handleVerifyEmail}
          className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
}
