// cart/components/CartItems/SelectionHeader.tsx
import React from "react";
import { CartItem } from "@/app/types";

interface SelectionHeaderProps {
  items: CartItem[];
  selectedItems: CartItem[];
  onSelectAll: (checked: boolean) => void;
  allSelected: boolean;
}

const SelectionHeader: React.FC<SelectionHeaderProps> = ({
  items,
  selectedItems,
  onSelectAll,
  allSelected,
}) => {
  const selectedCount = selectedItems.length;

  // FIX: Only calculate totalPrice if there are selected items
  const totalPrice =
    selectedItems?.reduce(
      (total, item) =>
        total + (item?.price_at_add || 0) * (item?.quantity || 0),
      0
    ) || 0;

  return (
    <div className="flex items-center justify-between bg-[theme(--card)] p-4 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="w-4 h-4 text-[theme(--primary)] bg-[theme(--background)] border-[theme(--border)] rounded focus:ring-[theme(--primary)]"
          />
          <span className="text-sm font-medium text-[theme(--foreground)]">
            Select All ({selectedCount}/{items.length})
          </span>
        </label>
      </div>

      {selectedCount > 0 && (
        <div className="text-right">
          <p className="text-sm text-[theme(--muted-foreground)]">
            Selected items total:
          </p>
          <p className="text-lg font-semibold text-[theme(--primary)]">
            ₱{totalPrice.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectionHeader;
