import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./app.css";

import AuthProvider from "./context/AuthContext";
import ToastProvider from "./context/ToastContext";
import CartProvider from "./context/CartContext";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import CookieConsent from "./components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmetics E-commerce Demo",
  description: "This is a demo for E-commerce website with the MVP Features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
              <CookieConsent />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
