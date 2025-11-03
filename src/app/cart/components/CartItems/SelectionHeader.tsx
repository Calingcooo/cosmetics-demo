// cart/components/CartItems/SelectionHeader.tsx
import React from "react";
import { CartItem as CartItemType } from "@/app/types";

interface SelectionHeaderProps {
  items: CartItemType[];
  selectedItems: number[];
  onSelectAll: (checked: boolean) => void;
}

const SelectionHeader: React.FC<SelectionHeaderProps> = ({
  items,
  selectedItems,
  onSelectAll,
}) => {
  const allSelected = selectedItems.length === items.length && items.length > 0;
  const indeterminate = selectedItems.length > 0 && selectedItems.length < items.length;

  return (
    <div className="bg-[theme(--card)] p-4 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="select-all"
          checked={allSelected}
          ref={(input) => {
            if (input) {
              input.indeterminate = indeterminate;
            }
          }}
          onChange={(e) => onSelectAll(e.target.checked)}
          className="w-4 h-4 text-[theme(--primary)] bg-[theme(--background)] border-[theme(--border)] rounded focus:ring-[theme(--primary)] focus:ring-2"
        />
        <label 
          htmlFor="select-all" 
          className="font-medium text-[theme(--foreground)] cursor-pointer select-none"
        >
          Select All ({items.length} items)
        </label>
        
        {selectedItems.length > 0 && (
          <span className="ml-auto text-[theme(--primary)] font-medium">
            {selectedItems.length} selected
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectionHeader;