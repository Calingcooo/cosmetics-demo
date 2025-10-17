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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-elegant animate-slide-up">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-sm text-muted-foreground">
            <p>
              We use cookies to enhance your browsing experience, serve personalized content, 
              and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
              Read our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button variant="outline" size="sm" onClick={declineCookies}>
              Decline
            </button>
            <button size="sm" onClick={acceptCookies}>
              Accept All
            </button>
            <button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
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
