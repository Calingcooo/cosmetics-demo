import React from "react";
import type { LoginFormData } from "@/app/types";
import InputField from "../../ui/input/InputField";

const LoginForm: React.FC<{
  formData: LoginFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
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
        autoComplete="current-password"
        placeholder="••••••••"
      />
    </div>
  );
};

export default LoginForm;
