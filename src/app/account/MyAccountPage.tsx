"use client";

import React, { useState } from "react";
import clsx from "clsx";

import { useAuth } from "../hooks/useAuth";

import AccountGuard from "@/guard/auth-guard";
import InputField from "@/components/ui/input/InputField";

const MyAccountPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <AccountGuard>
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">My Account</h1>

          {/* Tabs Navigation */}
          <div className="w-full mb-8">
            <div className="grid grid-cols-2 bg-[theme(--muted)] rounded-md p-1">
              {[
                { id: "personal", label: "Personal Info" },
                { id: "shipping", label: "Shipping Details" },
                // { id: "payment", label: "Payment Method" },
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
            {activeTab === "personal" && (
              <div className="space-y-4 bg-[theme(--card)] p-5">
                {/* Header */}
                <div>
                  <h2 className="text-xl font-semibold">
                    Personal Information
                  </h2>
                  <p className="text-sm text-[theme(--muted-foreground)]">
                    Update your personal details here.
                  </p>
                </div>

                {/* Personal form content here */}
                <form action="" className="space-y-4">
                  <InputField
                    id="first_name"
                    name="first_name"
                    value={user!.first_name}
                    onChange={() => {}}
                    placeholder="John"
                  />
                  <InputField
                    id="last_name"
                    name="last_name"
                    value={user!.last_name}
                    onChange={() => {}}
                    placeholder="Doe"
                  />
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    value={user!.email}
                    onChange={() => {}}
                    autoComplete="email"
                    placeholder="example@email.com"
                  />
                  <InputField
                    id="phone_number"
                    name="phone_number"
                    type="number"
                    value={""}
                    onChange={() => {}}
                    autoComplete="email"
                    placeholder="123456789"
                  />
                  <InputField
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    value={""}
                    onChange={() => {}}
                    autoComplete="email"
                    placeholder="123456789"
                  />

                  <div className="flex justify-end">
                    <button className="inline-flex capitalize items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[theme(--background)] transition-colors disabled:pointer-events-none disabled:opacity-50 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 h-10 px-4 py-2 cursor-pointer">
                      save changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Shipping Details</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your shipping address here.
                </p>
                {/* Shipping form content here */}
              </div>
            )}

            {activeTab === "payment" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <p className="text-sm text-muted-foreground">
                  Update your payment details here.
                </p>
                {/* Payment form content here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </AccountGuard>
  );
};

export default MyAccountPage;
