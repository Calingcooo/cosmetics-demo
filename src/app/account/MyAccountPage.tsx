"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

import AccountGuard from "@/guard/auth-guard";
import PersonalInformationForm from "@/components/pages/account/PersonalInformationForm";
import ShippingDetailsForm from "@/components/pages/account/ShippingDetailsForm";
import PaymentMethod from "@/components/pages/account/PaymentMethod";

const MyAccountPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read tab from URL or fallback to "personal"
  const initialTab = searchParams.get("tab") || "personal";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Whenever activeTab changes, update the URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", activeTab);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [activeTab]);

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "shipping", label: "Shipping Details" },
    { id: "payment", label: "Payment Method" },
  ];

  return (
    <AccountGuard>
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">My Account</h1>

          {/* Tabs Navigation */}
          <div className="w-full mb-8">
            <div className="grid grid-cols-3 bg-[theme(--muted)] rounded-md p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium transition-all cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    activeTab === tab.id
                      ? "bg-[theme(--background)] text-[theme(--foreground)] shadow-sm"
                      : "text-[theme(--muted-foreground)] hover:text-[theme(--foreground)]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs Content */}
          <div className="mt-4 border rounded-sm p-4 bg-[theme(--card)] shadow-[theme(--shadow-soft)] transition-all duration-300">
            {activeTab === "personal" && <PersonalInformationForm />}
            {activeTab === "shipping" && <ShippingDetailsForm />}
            {activeTab === "payment" && <PaymentMethod />}
          </div>
        </div>
      </div>
    </AccountGuard>
  );
};

export default MyAccountPage;
