"use client";

import useToast from "@/hooks/useToast";
import { baseUrl } from "@/variable";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Provide Auth State Globally
export const AuthProvider = ({ children }) => {
  const { successToast, errorToast } = useToast();
  const [user, setUser] = useState(null); // `null` means not logged in
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [error, setError] = useState(null);

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
  }, [pathname]);

  const login = async (emailOrMobile, password) => {
    await axios
      .post(`${baseUrl}/auth/login`, {
        emailOrMobile,
        password,
      })
      .then((res) => {
        const { token } = res.data;
        document.cookie = `authToken=${token}; path=/`; // Replace 'token' with the correct field name if different
        successToast(res.data?.message);
        setTimeout(() => {
          location.href = "/"
        }, 1000);
      })
      .catch((err) => {
        errorToast(err.response.data?.message || err.message);
        if (err?.response?.data?.token) {
          location.href = `/verify-mobile-number/${err?.response?.data?.token}`;
        }
      });
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
