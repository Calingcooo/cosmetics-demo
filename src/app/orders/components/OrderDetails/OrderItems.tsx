// checkout/components/OrderSummary/OrderItems.tsx
import React from "react";

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  selected_variations: Record<string, string>;
  subtotal: number;
}

interface OrderItemsProps {
  items: OrderItem[];
}

const OrderItems: React.FC<OrderItemsProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
        <h3 className="text-lg font-semibold text-[theme(--foreground)] mb-4">
          Order Items
        </h3>
        <p className="text-[theme(--muted-foreground)] text-center py-4">
          No items found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
      <h3 className="text-lg font-semibold text-[theme(--foreground)] mb-4">
        Order Items
      </h3>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-4 py-3 border-b border-[theme(--border)] last:border-b-0"
          >
            {/* Product Image */}
            <div className="w-16 h-16 bg-[theme(--muted)] rounded-[theme(--radius)] flex items-center justify-center flex-shrink-0">
              {item.product_image ? (
                <img 
                  src={item.product_image} 
                  alt={item.product_name}
                  className="w-full h-full object-cover rounded-[theme(--radius)]"
                />
              ) : (
                <span className="text-[theme(--muted-foreground)] text-xs">No image</span>
              )}
            </div>
            
            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[theme(--foreground)] truncate">
                {item.product_name}
              </h3>
              {item.selected_variations && Object.keys(item.selected_variations).length > 0 && (
                <p className="text-[theme(--muted-foreground)] text-sm mt-1">
                  {Object.values(item.selected_variations).join(', ')}
                </p>
              )}
              <p className="text-[theme(--muted-foreground)] text-sm mt-1">
                Qty: {item.quantity}
              </p>
            </div>
            
            {/* Price */}
            <div className="text-right flex-shrink-0">
              <p className="font-medium text-[theme(--foreground)]">
                ₱{item.subtotal.toFixed(2)}
              </p>
              <p className="text-[theme(--muted-foreground)] text-sm">
                ₱{item.price.toFixed(2)} each
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;