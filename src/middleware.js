import { NextResponse } from "next/server";

export function middleware(req) {
  const isLoggedIn = req.cookies.get("authToken"); // Check if the user has an auth token

  // Define the routes that require authentication (exclude "/")
  const protectedRoutes = ["/shop", "/cart", "/product", "/verify-email"];
  // Define the routes not accessible to logged-in users
  const publicRoutesForLoggedInUsers = ["/login", "/register", "/forgot-password"];
  
  // Define the routes that allow access even if the mobile number is not verified
  const allowUnverifiedRoutes = ["/verify-mobile-number"];

  const pathname = req.nextUrl.pathname;

  // If user is logged in and tries to access login, register, or forgot-password, redirect to home
  if (isLoggedIn && publicRoutesForLoggedInUsers.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage
  }

  // Handle root ("/") separately to avoid infinite loop
  if (pathname === "/" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login page
  }

  // Check if the user is logged in and if the mobile is not verified
  if (isLoggedIn) {
    const token = req.cookies.get("authToken");
    let isMobileVerified = false;

    if (token) {
      try {
        // Split the token and check the format
        const parts = token.value.split(".");
        if (parts.length === 3) {
          // Decode the payload part (middle part of JWT)
          const decodedPayload = atob(parts[1]);
          const decodedToken = JSON.parse(decodedPayload);
          isMobileVerified = decodedToken.isMobileVerified; // Assuming 'isMobileVerified' is part of the token payload
        } else {
          console.error("Invalid token structure:", token.value);
        }
      } catch (error) {
        console.error("Error decoding token:", error); // Log the error here
      }
    } else {
      console.error("Token is missing");
    }

    // Restrict access to `/verify-mobile-number` if logged in and mobile is verified
    if (isMobileVerified && pathname === "/verify-mobile-number") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage
    }

    // If the user is logged in but their mobile number is not verified, they should only access certain pages
    if (!isMobileVerified && !allowUnverifiedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/verify-mobile-number", req.url)); // Redirect to verify-mobile-number page
    }
  }

  // If user is not logged in and tries to access protected routes, redirect to login page
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login page
  }

  return NextResponse.next(); // Allow access if conditions are met
}

export const config = {
  matcher: [
    "/", // Include root path for special handling
    "/profile",
    "/orders",
    "/shop",
    "/cart",
    "/product/:path*", // Pattern for product and dynamic paths
    "/verify-email",
    "/verify-mobile-number", // Include the verify-mobile-number page in the matcher
  ], // Apply middleware to these routes
};
