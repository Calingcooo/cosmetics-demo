import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";

interface QuantityControlsProps {
  item: any;
  onQuantityChange: (id: string, quantity: number, variations: Record<string, string>) => void;
  onRemove: () => void;
}

export const QuantityControls = ({ item, onQuantityChange, onRemove }: QuantityControlsProps) => {
  return (
    <div className="flex items-center gap-3 mt-2">
      <button
        onClick={() => onQuantityChange(
          item.id,
          Math.max(0, item.quantity - 1),
          item.selected_variations || {}
        )}
        className="w-8 h-8 rounded-full border border-[theme(--border)] inline-flex items-center justify-center hover:bg-[theme(--accent)] cursor-pointer"
      >
        <LuMinus className="h-3 w-3" />
      </button>

      <span className="text-sm font-medium w-8 text-center">
        {item.quantity}
      </span>

      <button
        onClick={() => onQuantityChange(
          item.id,
          item.quantity + 1,
          item.selected_variations || {}
        )}
        className="w-8 h-8 rounded-full border border-[theme(--border)] inline-flex items-center justify-center hover:bg-[theme(--accent)] cursor-pointer"
      >
        <LuPlus className="h-3 w-3" />
      </button>

      <button
        onClick={onRemove}
        className="ml-4 text-[theme(--destructive)] hover:text-[theme(--primary)] inline-flex items-center gap-1 text-sm cursor-pointer"
      >
        <LuTrash2 className="h-4 w-4" />
        Remove
      </button>
    </div>
  );
};