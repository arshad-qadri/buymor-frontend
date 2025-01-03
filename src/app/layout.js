import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Buymor - Shop Your Style",
  description: "An e-commerce app like Bewakoof built with Next.js 14.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-800`}
      >
        <AuthProvider>
        <Navbar />
          <div className="min-h-[82vh]">{children}</div>
          <ToastContainer />
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
