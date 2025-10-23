"use client";

import React, { useState } from "react";
import clsx from "clsx";

import AccountGuard from "@/guard/auth-guard";
import PersonalInformationForm from "@/components/pages/account/PersonalInformationForm";
import ShippingDetailsForm from "@/components/pages/account/ShippingDetailsForm";
import PaymentMethod from "@/components/pages/account/PaymentMethod";

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState("personal");

  console.log("gg");
  

  return (
    <AccountGuard>
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">My Account</h1>

          {/* Tabs Navigation */}
          <div className="w-full mb-8">
            <div className="grid grid-cols-3 bg-[theme(--muted)] rounded-md p-1">
              {[
                { id: "personal", label: "Personal Info" },
                { id: "shipping", label: "Shipping Details" },
                { id: "payment", label: "Payment Method" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
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
          <div className="mt-4 border rounded-sm">
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
