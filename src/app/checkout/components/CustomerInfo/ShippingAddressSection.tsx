// checkout/components/CustomerInfo/ShippingAddressSection.tsx
import React from "react";
import { User } from "@/app/types";
import Header from "../Header";
import ProfileRedirect from "../CheckoutActions/ProfileRedirect";
import { 
  getFormattedAddress, 
  isAddressComplete, 
  getMissingShippingFields 
} from "../../utils/checkout.helper";

interface ShippingAddressSectionProps {
  user: User | null;
}

const ShippingAddressSection: React.FC<ShippingAddressSectionProps> = ({ user }) => {
  const hasCompleteAddress = user ? isAddressComplete(user) : false;
  const missingShippingFields = user ? getMissingShippingFields(user) : [];
  const formattedAddress = getFormattedAddress(user);

  return (
    <section className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
      <Header title="Shipping Address" size="sm" />
      
      {hasCompleteAddress ? (
        <div className="mt-4">
          <p className="text-[theme(--foreground)] font-medium">{formattedAddress}</p>
          {user?.landmark && (
            <p className="text-[theme(--muted-foreground)] mt-2">
              <span className="font-medium">Landmark:</span> {user.landmark}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <div className="bg-[theme(--destructive)]/10 border border-[theme(--destructive)]/20 rounded-[theme(--radius)] p-4">
            <p className="text-[theme(--destructive)] font-medium mb-2">
              Incomplete Shipping Address
            </p>
            <p className="text-[theme(--muted-foreground)] text-sm mb-3">
              Missing: {missingShippingFields.join(', ')}
            </p>
            <ProfileRedirect 
              tab="shipping" 
              missingFields={missingShippingFields} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ShippingAddressSection;