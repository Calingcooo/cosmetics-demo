"use client";

import React, { useState, useEffect } from "react";

import { User } from "@/app/types";

import { useUser } from "@/app/hooks/useUser";

import Header from "./Header";
import InputField from "@/components/ui/input/InputField";

type PersonalUser = Pick<
  User,
  "first_name" | "last_name" | "email" | "phone" | "dob"
>;

type PersonalInformationFormProps = {
  user: PersonalUser;
};

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
  user,
}) => {
  const { updateMe } = useUser();
  const [formData, setFormData] = useState<PersonalUser>({
    first_name: user.first_name ?? "",
    last_name: user.last_name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    dob: user.dob ?? undefined,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        dob: user.dob ?? undefined,
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "dob" && value ? new Date(value) : value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateMe(formData);
  };

  return (
    <div className="space-y-4 bg-[theme(--card)] p-5">
      {/* Header */}
      <Header
        title="Personal Information"
        subtitle="Update your personal details here."
      />

      {/* Personal form content here */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="first_name"
          name="first_name"
          value={formData.first_name ?? ""}
          onChange={handleChange}
          placeholder="John"
        />
        <InputField
          id="last_name"
          name="last_name"
          value={formData.last_name ?? ""}
          onChange={handleChange}
          placeholder="Doe"
        />
        <InputField
          id="email"
          name="email"
          type="email"
          value={formData.email ?? ""}
          onChange={handleChange}
          autoComplete="email"
          placeholder="example@email.com"
        />
        <InputField
          id="phone_number"
          name="phone_number"
          type="tel"
          inputMode="numeric"
          pattern="[0-9+ ]*"
          value={formData.phone ?? ""}
          onChange={handleChange}
          placeholder="+63 917 123 4567"
        />
        <InputField
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          value={
            formData?.dob
              ? new Date(String(user.dob)).toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
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
