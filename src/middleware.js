import { NextResponse } from "next/server";

export function middleware(req) {
  const authToken = req.cookies.get("authToken")?.value; // Check if the user has an auth token
  const { pathname } = req.nextUrl; // Get the current URL path

  // Define protected and public routes
  const protectedRoutes = [
    "/profile",
    "/orders",
    "/shop",
    "/cart",
    "/product",
    // "/verify-email/:path*",
    // "/verify-mobile-number/:path*",
  ];
  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
    "/verify-mobile-number",
    "/reset-password",
    ,
  ];

  if (authToken) {
    if (
      publicRoutes.some((route) => pathname.startsWith(route)) &&
      pathname !== "/"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Otherwise, allow access to protected routes
    return NextResponse.next();
  } else {
    // If not logged in and accessing protected routes, redirect to `/login`
    if (
      protectedRoutes.some((route) => pathname.startsWith(route)) ||
      pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Otherwise, allow access to public routes
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/orders",
    "/shop",
    "/cart",
    "/product/:path*",
    "/verify-email/:path*",
    "/verify-mobile-number/:path*",
    "/forgot-password",
    "/login",
    "/register",
    "/reset-password/:path*",
  ],
};
