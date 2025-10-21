import React from "react";
import type { LoginFormData } from "@/app/types";

import { useAuth } from "@/app/hooks/useAuth";

import InputField from "../../ui/input/InputField";

const LoginForm: React.FC<{
  formData: LoginFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ formData, handleChange }) => {
  const {authError} = useAuth()
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
        error={authError}
      />
      <InputField
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="current-password"
        placeholder="••••••••"
        error={authError}
      />
      {authError && <p role="alert" className="text-xs italic ml-1 text-[theme(--destructive)]">{authError}</p>}
    </div>
  );
};

export default LoginForm;
