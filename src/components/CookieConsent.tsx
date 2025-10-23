"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LuX } from "react-icons/lu";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[theme(--card)] border-t border-[theme(--border)] shadow-[theme(--elegant)] animate-slide-up">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-sm text-muted-foreground">
            <p>
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. By clicking
              &quot;Accept All&quot;, you consent to our use of cookies. Read
              our{" "}
              <Link
                href="/privacy"
                className="text-[theme(--primary)] hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={declineCookies}
              className="h-9 rounded-md px-3 border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-[theme(--background)] transition-colors cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="h-9 rounded-md px-3 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-[theme(--background)] transition-colors cursor-pointer"
            >
              Accept All
            </button>
            <button
              className="h-8 w-8 hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[theme(--background)] transition-colors cursor-pointer"
              onClick={declineCookies}
            >
              <LuX className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
