import React from "react";
import Link from "next/link";

interface ProfileRedirectProps {
  tab: "personal" | "shipping";
  missingFields: string[];
}

const ProfileRedirect: React.FC<ProfileRedirectProps> = ({
  tab,
  missingFields,
}) => {
  return (
    <Link
      href={`/account?tab=${tab}`}
      className="inline-flex items-center gap-2 text-[theme(--primary)] hover:text-[theme(--primary-hover)] font-medium transition-colors"
    >
      Update {tab === "personal" ? "Personal Information" : "Shipping Address"}{" "}
      →
    </Link>
  );
};

export default ProfileRedirect;
