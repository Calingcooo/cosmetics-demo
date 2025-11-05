"use client";

import React, { useState, useEffect } from "react";
import { useOrders } from "@/lib/hooks/order/useOrders";
import OrdersList from "./OrderList/OrdersList";
import OrderDetails from "./OrderDetails/OrderDetails,";
import type { Order } from "@/app/types";

const OrdersPage: React.FC = () => {
  const { orders, loading, error, getOrders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
          <p>Error loading orders: {error}</p>
          <button
            onClick={() => getOrders()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[theme(--foreground)] mb-2">
          Your Orders
        </h1>
        <p className="text-[theme(--muted-foreground)]">
          Track and manage your orders
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div
          className={`lg:col-span-2 ${
            showDetails ? "lg:block hidden" : "block"
          }`}
        >
          <OrdersList
            orders={orders}
            loading={loading}
            onOrderClick={handleOrderClick}
          />
        </div>

        {/* Order Details Sidebar */}
        {showDetails && selectedOrder && (
          <div className="lg:col-span-1">
            <OrderDetails order={selectedOrder} onClose={handleCloseDetails} />
          </div>
        )}
      </div>

      {/* Mobile Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[theme(--background)] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <OrderDetails order={selectedOrder} onClose={handleCloseDetails} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
