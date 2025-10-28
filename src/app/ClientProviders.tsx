"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

import SessionInitializer from "@/lib/helpers/SessionInitializer";

import ProductProvider from "@/context/ProductContext";
import ToastProvider from "@/context/ToastContext";
import UserProvider from "@/context/UserContext";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CookieConsent from "@/components/CookieConsent";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ProductProvider>
        <ToastProvider>
          <UserProvider>
              <SessionInitializer />
              <Header />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
              <CookieConsent />
          </UserProvider>
        </ToastProvider>
      </ProductProvider>
    </Provider>
  );
}
