import React from "react";
import { User } from "@/app/types";
import PersonalInfoSection from "./PersonalInfoSection";
import ShippingAddressSection from "./ShippingAddressSection";

interface CustomerInfoProps {
  user: User | null;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <PersonalInfoSection user={user} />
      <ShippingAddressSection user={user} />
    </div>
  );
};

export default CustomerInfo;