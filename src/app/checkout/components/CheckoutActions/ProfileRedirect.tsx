// checkout/components/CheckoutActions/ProfileRedirect.tsx
import React from "react";
import Link from "next/link";

interface ProfileRedirectProps {
  tab?: "personal" | "shipping";
}

const ProfileRedirect: React.FC<ProfileRedirectProps> = ({
  tab = "shipping", // Default to shipping since that's usually what's missing
}) => {
  return (
    <div className="bg-[theme(--destructive)]/10 border border-[theme(--destructive)]/20 rounded-[theme(--radius)] p-6 text-center">
      <h3 className="text-lg font-semibold text-[theme(--destructive)] mb-2">
        Complete Your Profile
      </h3>
      <p className="text-[theme(--muted-foreground)] mb-4">
        Please add your shipping address before proceeding to checkout.
      </p>
      <Link
        href={`/account?tab=${tab}`}
        className="inline-block bg-[theme(--primary)] text-white px-6 py-2 rounded-[theme(--radius)] hover:bg-[theme(--primary-hover)] transition-colors"
      >
        Update {tab === "personal" ? "Personal Information" : "Shipping Address"}
      </Link>
    </div>
  );
};

export default ProfileRedirect;