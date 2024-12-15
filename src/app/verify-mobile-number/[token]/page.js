"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { baseUrl } from "@/variable";

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // State to store OTP values
  const [loading, setLoading] = useState(false); // For handling loading state
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(false); // Success state
  const router = useRouter();
  const params = useParams()

  const callApi = async ()=>{
    try {
      const {data} =  await axios.post(`${baseUrl}/auth/send-otp`,{},{
        headers: {
          'Authorization': `Bearer ${params.token}`,
        }
      })

      console.log("data -- otp", data);
      alert(data.message)
      
      } catch (error) {
        console.log(error);
        if(error.response?.data?.message){

          alert(error.response?.data?.message)
        }else{
          alert(error.message)
        }
        
      }
  }

  useEffect(() => {
      if (params.token) {
        callApi()
      }
  },[])
  // Refs for each OTP input field to manage focus
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Move focus to the next input field after entering a digit
    if (e.target.value !== "" && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle Backspace key press
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Move focus to the previous input if the current one is empty
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const otpString = otp.join(""); // Convert OTP array to a string

    try {
      const response = await axios.post(`${baseUrl}/auth/verify-otp`, {
        otp: otpString,
      },
      {headers:{
        Authorization: `Bearer ${params.token}`
      }}
    );

      if (response.data) {
        setSuccess(true);
        // setTimeout(() => {
          alert(response.data?.message)
          return  router.push("/login")
         ;
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("There was an error verifying your OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Focus the first input field when the component is mounted
    inputRefs[0].current.focus();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Verify Mobile Number
        </h1>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center font-medium mb-4">{error}</p>}

        {/* Success Message */}
        {success && <p className="text-green-600 text-center font-medium mb-4">OTP Verified Successfully!</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between my-8">
            {/* OTP Inputs */}
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)} // Listen for Backspace
                ref={inputRefs[index]} // Reference each input field
                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="-"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the OTP?{" "}
            <button
              className="text-indigo-600 font-medium hover:underline"
              onClick={() => alert("Resend OTP logic goes here")}
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
