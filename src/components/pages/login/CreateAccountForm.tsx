import React from "react";
import type { FormData } from "@/app/types";
import InputField from "../../ui/input/InputField";

const CreateAccountForm: React.FC<{
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4 mb-4">
      <InputField
        id="first_name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="John"
      />
      <InputField
        id="last_name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Doe"
      />
      <InputField
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        placeholder="example@email.com"
      />
      <InputField
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="new-password"
        placeholder="••••••••"
      />
      <InputField
        id="confirm_password"
        name="confirm_password"
        type="password"
        value={formData.confirm_password}
        onChange={handleChange}
        autoComplete="new-password"
        placeholder="••••••••"
      />
    </div>
  );
};

export default CreateAccountForm;
