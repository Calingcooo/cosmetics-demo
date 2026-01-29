// cart/components/CartItems/CartItem.tsx
import React from "react";
import { CartItem as CartItemType } from "@/app/types";
import { useCart } from "@/lib/hooks/cart/useCart";
import { LuTrash2 } from "react-icons/lu";
import QuantityControls from "./QuantityControls";

interface CartItemProps {
  item: CartItemType;
  selected: boolean;
  onSelect: (checked: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  selected,
  onSelect,
}) => {
  const { updateQuantityImmediate, removeFromCart } = useCart();

  const handleQuantityChange = (
    id: string,
    quantity: number,
    selected_variations: Record<string, string>
  ) => {
    // Immediate UI update for better UX
    updateQuantityImmediate({ id, quantity, selected_variations });
    // Debounced API call (handled in QuantityControls)
  };

  const handleRemove = () => {
    removeFromCart({
      id: item.id,
      selected_variations: item.selected_variations,
    });
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 border rounded-[theme(--radius)] transition-[theme(--transition-smooth)] ${
        selected
          ? "border-[theme(--primary)] bg-[theme(--primary)]/5 shadow-[theme(--shadow-soft)]"
          : "border-[theme(--border)] bg-[theme(--card)] hover:shadow-[theme(--shadow-soft)]"
      }`}
    >
      {/* Selection Checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onSelect(e.target.checked)}
        className="w-4 h-4 text-[theme(--primary)] bg-[theme(--background)] border-[theme(--border)] rounded focus:ring-[theme(--primary)] focus:ring-2 mt-4"
      />

      {/* Product Image */}
      <div className="w-20 h-20 bg-[theme(--muted)] rounded-[theme(--radius)] flex items-center justify-center flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-[theme(--radius)]"
          />
        ) : (
          <span className="text-[theme(--muted-foreground)] text-xs">
            No image
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-[theme(--foreground)] text-sm line-clamp-2">
          {item.name}
        </h3>

        {item.selected_variations &&
          Object.keys(item.selected_variations).length > 0 && (
            <div className="mt-1 space-y-1">
              {Object.entries(item.selected_variations).map(([key, value]) => (
                <p
                  key={key}
                  className="text-[theme(--muted-foreground)] text-xs"
                >
                  <span className="font-medium">{key}:</span> {value}
                </p>
              ))}
            </div>
          )}

        <p className="text-[theme(--primary)] font-bold mt-2">
          ₱{(item.price_at_add * item.quantity).toFixed(2)}
        </p>
        <p className="text-[theme(--muted-foreground)] text-xs">
          ₱{item.price_at_add} each
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-3">
        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-1 text-[theme(--muted-foreground)] hover:text-[theme(--destructive)] transition-colors"
          aria-label="Remove item"
        >
          <LuTrash2 className="w-4 h-4" />
        </button>

        {/* Quantity Controls */}
        <QuantityControls
          itemId={item.id}
          quantity={item.quantity}
          selectedVariations={item.selected_variations ?? {}}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
          minQuantity={1}
        />
      </div>
    </div>
  );
};

export default CartItem;