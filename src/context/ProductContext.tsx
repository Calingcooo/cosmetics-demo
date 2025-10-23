"use client";

import React, { createContext, useState } from "react";
import type { Product } from "@/app/types";

import { getAllProducts, getFeaturedProducts } from "@/services/productApi";

interface ProductContextType {
  products: Product[];
  featureProducts: Product[];
  handleFetchProducts: () => Promise<void>;
  handleFetchFeaturedProducts: () => Promise<void>;
}

// CONTEXT
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featureProducts, setFeaturedProducts] = useState<Product[]>([]);

  const handleFetchProducts = async () => {
    try {
      const productData = await getAllProducts();
      console.log(productData);
      setProducts(productData.data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchFeaturedProducts = async () => {
    try {
      const featuredData = await getFeaturedProducts()

      setFeaturedProducts(featuredData.data.products || [])
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProductContext.Provider value={{ products, featureProducts, handleFetchProducts, handleFetchFeaturedProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
