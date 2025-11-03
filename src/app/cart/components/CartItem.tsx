import Image from "next/image";
import { QuantityControls } from "./QuantityControls";
import { useCart } from "@/lib/hooks/cart/useCart";
import { useDebounce } from "@/lib/hooks/debounce/useDebounce";
import type { CartItem as CartItemType } from "@/app/types";

interface CartItemProps {
  item: CartItemType;
  index: number;
}

export const CartItem = ({ item, index }: CartItemProps) => {
  const { updateItemCart, updateQuantityImmediate, removeFromCart } = useCart();

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

  const handleQuantityChange = (
    id: string,
    quantity: number,
    selected_variations: Record<string, string>
  ) => {
    updateQuantityImmediate({ id, quantity, selected_variations });
    debouncedUpdate(id, quantity, selected_variations);
  };

  const handleRemove = () => {
    removeFromCart({
      id: item.id,
      selected_variations: item.selected_variations,
    });
  };

  return (
    <div
      key={`${item.id}-${index}`}
      className="flex gap-1 lg:gap-4 bg-[theme(--card)] p-4 rounded-lg border border-[theme(--border)]/40 shadow-sm"
    >
      {/* Item Image */}
      <div className="flex-shrink-0 w-24 h-24 relative">
        <Image
          src={item.image || "/placeholder-product.jpg"}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 ml-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-[theme(--muted-foreground)] text-sm">
          ₱{item.price_at_add}
        </p>

        <QuantityControls
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="font-semibold">
          ₱{(item.price_at_add * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
