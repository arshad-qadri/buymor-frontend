"use client";

import { baseUrl } from "@/variable";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Provide Auth State Globally
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // `null` means not logged in
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [error, setError ] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${document.cookie.replace(
              "authToken=",
              ""
            )}`,
          },
        });
        setUser(response.data?.data); // Save user data
      } catch (error) {
        console.log("Failed to fetch user:", error.stack);
        setError(error.message);
        setUser(null); // Reset user if not authenticated
      } finally {
        setLoading(false); // Stop the loading state
      }
    };
    if (document.cookie.replace("authToken=", "")) fetchUser(); // Fetch user on app load
  }, []);

  const login = async (emailOrMobile, password) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        emailOrMobile,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Save the token (or any required data) to cookies/localStorage
        document.cookie = `authToken=${token}; path=/`; // Replace 'token' with the correct field name if different
        alert("Login successful!");

        // Redirect to the shop page
        location.href = "/";
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Error during login:", error);
      
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      if(error.response?.data?.token){
        location.href = `/verify-mobile-number/${error.response?.data?.token}`
      }
    }
  };
  const register = async (
    formData,
    setSuccessMessage,
    setFormData,
    setErrorMessage,
    setLoading
  ) => {
    try {
      const fData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobileNumber: formData.phone,
      };
      await axios.post(`${baseUrl}/auth/register`, fData);

      setSuccessMessage(
        "Account created successfully! Please verify your email."
      );
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/login");
    } catch (error) {
      const errorResponse =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrorMessage(errorResponse);
    } finally {
      setLoading(false);
    }
  };
  const logout = async (setIsLoggedIn) => {
    try {
      await axios.post(`${baseUrl}/auth/logout`);
      document.cookie = "authToken=; Max-Age=0; path=/;"; // Clear auth token
      setIsLoggedIn(false); // Update state
      window.location.href = "/login"; // Redirect to login page
      setUser(null); // Clear user data on logout
    } catch (error) {
      console.log("error while logout", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
export const useAuth = () => useContext(AuthContext);
