// cart/components/CartItems/CartItemsList.tsx
import React from "react";
import { CartItem as CartItemType } from "@/app/types";
import CartItem from "./CartItem";
import SelectionHeader from "./SelectionHeader";

interface CartItemsListProps {
  items: CartItemType[];
  selectedItems: number[];
  onSelectedItemsChange: (selected: number[]) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ 
  items, 
  selectedItems, 
  onSelectedItemsChange 
}) => {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectedItemsChange(items.map((_, index) => index));
    } else {
      onSelectedItemsChange([]);
    }
  };

  const handleSelectItem = (index: number, checked: boolean) => {
    if (checked) {
      onSelectedItemsChange([...selectedItems, index]);
    } else {
      onSelectedItemsChange(selectedItems.filter(i => i !== index));
    }
  };

  return (
    <section className="space-y-6">
      {/* Selection Header */}
      <SelectionHeader 
        items={items}
        selectedItems={selectedItems}
        onSelectAll={handleSelectAll}
      />
      
      {/* Cart Items */}
      <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
        <div className="space-y-4">
          {items.map((item, index) => (
            <CartItem 
              key={`${item.id}-${index}`} 
              item={item} 
              index={index}
              selected={selectedItems.includes(index)}
              onSelect={(checked) => handleSelectItem(index, checked)}
            />
          ))}
        </div>
      </div>

      {/* Continue Shopping CTA */}
      <div className="bg-[theme(--muted)] p-4 rounded-[theme(--radius)] text-center">
        <p className="text-[theme(--muted-foreground)]">
          Need more items?{" "}
          <a 
            href="/products" 
            className="text-[theme(--primary)] hover:text-[theme(--primary-hover)] font-medium"
          >
            Continue Shopping →
          </a>
        </p>
      </div>
    </section>
  );
};

export default CartItemsList;