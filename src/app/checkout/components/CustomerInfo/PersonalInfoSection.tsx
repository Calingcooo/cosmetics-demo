// checkout/components/CustomerInfo/PersonalInfoSection.tsx
import React from "react";
import { User } from "@/app/types";
import Header from "../Header";
import { getMissingPersonalFields } from "../../utils/checkout.helper";

interface PersonalInfoSectionProps {
  user: User | null;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ user }) => {
  const missingPersonalFields = user ? getMissingPersonalFields(user) : [];

  return (
    <section className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
      <Header title="Customer Information" size="sm" />
      
      <div className="mt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-[theme(--muted-foreground)]">Name:</span>
          <span className="font-medium text-[theme(--foreground)]">
            {user?.first_name && user?.last_name 
              ? `${user.first_name} ${user.last_name}`
              : <span className="text-[theme(--destructive)]">Incomplete</span>
            }
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-[theme(--muted-foreground)]">Email:</span>
          <span className="font-medium text-[theme(--foreground)]">
            {user?.email || (
              <span className="text-[theme(--destructive)]">Not provided</span>
            )}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-[theme(--muted-foreground)]">Phone:</span>
          <span className="font-medium">
            {user?.phone || (
              <span className="text-[theme(--destructive)]">Not provided</span>
            )}
          </span>
        </div>
        
        {missingPersonalFields.length > 0 && (
          <div className="bg-[theme(--destructive)]/10 border border-[theme(--destructive)]/20 rounded-[theme(--radius)] p-3 mt-3">
            <p className="text-[theme(--destructive)] text-sm font-medium">
              Missing personal information
            </p>
            <p className="text-[theme(--muted-foreground)] text-xs mt-1">
              Please complete: {missingPersonalFields.join(', ')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonalInfoSection;