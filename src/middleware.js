import { NextResponse } from "next/server";

export function middleware(req) {
  const isLoggedIn = req.cookies.get("authToken"); // Check if the user has an auth token

  // Define the routes that require authentication (exclude "/")
  const protectedRoutes = ["/shop", "/cart", "/product", "/verify-email"];
  // Define the routes not accessible to logged-in users
  const publicRoutesForLoggedInUsers = ["/login", "/register", "/forgot-password"];

  const pathname = req.nextUrl.pathname;

  // If user is logged in and tries to access login, register, or forgot-password, redirect to home
  if (isLoggedIn && publicRoutesForLoggedInUsers.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage
  }

  // Handle root ("/") separately to avoid infinite loop
  if (pathname === "/" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login page
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
    "/shop",
    "/cart",
    "/product/:path*", // Pattern for product and dynamic paths
    "/login",
    "/register",
    "/verify-email",
    "/forgot-password",
  ], // Apply middleware to these routes
};
