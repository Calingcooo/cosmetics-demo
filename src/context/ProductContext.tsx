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
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  handleFetchProducts: (page?: number, category?: string, reset?: boolean) => Promise<void>;
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchProducts = useCallback(
    async (pageNumber = 1, category = "All", reset = false) => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      try {
        const res = await getAllProducts(pageNumber, category);
        const { products: newProducts, totalPages } = res.data;

        // If category changed (reset = true), replace products
        setProducts((prev) =>
          reset ? newProducts : [...prev, ...newProducts]
        );

        // Check if more pages exist
        setHasMore(pageNumber < totalPages);
        setPage(pageNumber);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMore]
  );

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
        page,
        hasMore,
        isLoading,
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
