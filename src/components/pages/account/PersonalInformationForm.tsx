import React from "react";

import { useAuth } from "@/app/hooks/useAuth";

import Header from "./Header";
import InputField from "@/components/ui/input/InputField";

const PersonalInformationForm = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-4 bg-[theme(--card)] p-5">
      {/* Header */}
      <Header
        title="Personal Information"
        subtitle="Update your personal details here."
      />

      {/* Personal form content here */}
      <form action="" className="space-y-4">
        <InputField
          id="first_name"
          name="first_name"
          value={user!.first_name ?? ""}
          onChange={() => {}}
          placeholder="John"
        />
        <InputField
          id="last_name"
          name="last_name"
          value={user!.last_name ?? ""}
          onChange={() => {}}
          placeholder="Doe"
        />
        <InputField
          id="email"
          name="email"
          type="email"
          value={user!.email ?? ""}
          onChange={() => {}}
          autoComplete="email"
          placeholder="example@email.com"
        />
        <InputField
          id="phone_number"
          name="phone_number"
          type="tel"
          inputMode="numeric"
          pattern="[0-9+ ]*"
          value={user?.phone ?? ""}
          onChange={() => {}}
          placeholder="+63 917 123 4567"
        />
        <InputField
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          value={
            user?.dob
              ? new Date(String(user.dob)).toISOString().split("T")[0]
              : ""
          }
          onChange={() => {}}
          placeholder="Select your birth date"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex capitalize items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[theme(--background)] transition-colors disabled:pointer-events-none disabled:opacity-50 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 h-10 px-4 py-2 cursor-pointer"
          >
            save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationForm;
