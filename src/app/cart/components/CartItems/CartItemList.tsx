// cart/components/CartItems/CartItemsList.tsx
import React from "react";
import { useCart } from "@/lib/hooks/cart/useCart";
import CartItem from "./CartItem";
import SelectionHeader from "./SelectionHeader";

const CartItemsList: React.FC = () => {
  const { 
    items, 
    selectedItems, 
    selectAllCartItems, 
    deselectAllCartItems,
    toggleCartItemSelection 
  } = useCart();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAllCartItems();
    } else {
      deselectAllCartItems();
    }
  };

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  return (
    <section className="space-y-6">
      <SelectionHeader 
        items={items}
        selectedItems={selectedItems}
        onSelectAll={handleSelectAll}
        allSelected={allSelected}
      />
      
      <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
        <div className="space-y-4">
          {items.map((item, index) => (
            <CartItem 
              key={`${item.id}-${JSON.stringify(item.selected_variations)}-${index}`} 
              item={item} 
              selected={selectedItems.some(selectedItem => 
                selectedItem.id === item.id && 
                JSON.stringify(selectedItem.selected_variations) === JSON.stringify(item.selected_variations)
              )}
              onSelect={(checked) => toggleCartItemSelection(item)}
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