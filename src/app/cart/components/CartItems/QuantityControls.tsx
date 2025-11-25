// cart/components/CartItems/QuantityControls.tsx (Alternative - Simplified)
import React from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useCart } from "@/lib/hooks/cart/useCart";
import { useDebounce } from "@/lib/hooks/debounce/useDebounce";

interface QuantityControlsProps {
  itemId: string;
  quantity: number;
  selectedVariations: Record<string, string>;
  onQuantityChange: (
    id: string,
    quantity: number,
    selectedVariations: Record<string, string>
  ) => void;
  onRemove: () => void;
  minQuantity?: number;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({
  itemId,
  quantity,
  selectedVariations,
  onQuantityChange,
  onRemove,
  minQuantity = 1,
}) => {
  const { updateItemCart } = useCart();

  const debouncedUpdate = useDebounce(
    (
      id: string,
      quantity: number,
      selected_variations: Record<string, string>
    ) => {
      updateItemCart({ id, quantity, selected_variations });
    },
    400
  );

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity < minQuantity) {
      onRemove();
    } else {
      onQuantityChange(itemId, newQuantity, selectedVariations);
      debouncedUpdate(itemId, newQuantity, selectedVariations);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    onQuantityChange(itemId, quantity + 1, selectedVariations);
    debouncedUpdate(itemId, newQuantity, selectedVariations);
  };

  const handleDirectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") return;

    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity >= minQuantity) {
      onQuantityChange(itemId, newQuantity, selectedVariations);
      debouncedUpdate(itemId, newQuantity, selectedVariations);
    }
  };

  return (
    <div className="flex flex-col items-end gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          disabled={quantity <= minQuantity}
          className="w-8 h-8 flex items-center justify-center border border-[theme(--border)] rounded-[theme(--radius)] text-[theme(--muted-foreground)] hover:bg-[theme(--muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease quantity"
        >
          <LuMinus className="w-3 h-3" />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleDirectInput}
          min={minQuantity}
          className="w-12 text-center text-sm font-medium text-[theme(--foreground)] border border-[theme(--border)] rounded-[theme(--radius)] py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[theme(--primary)] focus:border-transparent"
        />

        <button
          onClick={handleIncrement}
          className="w-8 h-8 flex items-center justify-center border border-[theme(--border)] rounded-[theme(--radius)] text-[theme(--muted-foreground)] hover:bg-[theme(--muted)] transition-colors"
          aria-label="Increase quantity"
        >
          <LuPlus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default QuantityControls;
