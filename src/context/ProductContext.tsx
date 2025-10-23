"use client";

import React, { createContext, useState, useCallback } from "react";
import type { Product } from "@/app/types";

import {
  getAllProducts,
  getFeaturedProducts,
  getSingleProduct,
} from "@/services/productApi";

interface ProductContextType {
  products: Product[];
  featureProducts: Product[];
  product: Product | null;
  handleFetchProducts: () => Promise<void>;
  handleFetchFeaturedProducts: () => Promise<void>;
  handleFetchSingleProduct: (id: string | undefined) => Promise<void>;
}

// CONTEXT
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [featureProducts, setFeaturedProducts] = useState<Product[]>([]);

  const handleFetchProducts = useCallback(async () => {
    try {
      const productData = await getAllProducts();
      setProducts(productData.data.products || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleFetchFeaturedProducts = useCallback(async () => {
    try {
      const featuredData = await getFeaturedProducts();
      setFeaturedProducts(featuredData.data.products || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleFetchSingleProduct = useCallback(
    async (id: string | undefined) => {
      try {
        const singleData = await getSingleProduct(id);
        setProduct(singleData.data.product || null);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        featureProducts,
        product,
        handleFetchProducts,
        handleFetchFeaturedProducts,
        handleFetchSingleProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
