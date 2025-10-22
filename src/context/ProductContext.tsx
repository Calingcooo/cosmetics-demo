"use client";

import React, { createContext, useState } from "react";
import type { Product } from "@/app/types";

import { getAllProducts } from "@/services/productApi";

interface ProductContextType {
  products: Product[];
  handleFetchProducts: () => Promise<void>;
}

// CONTEXT
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleFetchProducts = async () => {
    try {
      const productData = await getAllProducts();
      console.log(productData);
      setProducts(productData.data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, handleFetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
