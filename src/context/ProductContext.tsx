"use client";

import React, { createContext, useState, useCallback } from "react";
import type { Product, Category } from "@/app/types";

import {
  getProductCategories,
  getAllProducts,
  getFeaturedProducts,
  getSingleProduct,
} from "@/services/productApi";

import { productService } from "@/lib/api/productService";

interface ProductContextType {
  categories: Category[];
  products: Product[];
  featureProducts: Product[];
  product: Product | null;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  handleFetchCategories: () => Promise<void>;
  handleFetchProducts: (
    page?: number,
    category?: string,
    reset?: boolean
  ) => Promise<void>;
  handleFetchFeaturedProducts: () => Promise<void>;
  handleFetchSingleProduct: (id: string | null) => Promise<void>;
}

// CONTEXT
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [featureProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchCategories = useCallback(async () => {
    try {
      const res = await getProductCategories();

      setCategories(res.data.categories || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleFetchProducts = useCallback(
    async (pageNumber = 1, category = "all", reset = false) => {
      // ⚙️ Always allow reset calls even if isLoading or hasMore are false
      if (!reset && (isLoading || !hasMore)) return;

      // If resetting (new category), clear pagination state
      if (reset) {
        setProducts([]);
        setPage(1);
        setHasMore(true);
      }

      setIsLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const { data } = await productService.getProducts(
          "/api/product/products",
          pageNumber,
          category
        );

        const { products: newProducts, totalPages } = data;

        // If category changed, replace; otherwise append
        setProducts((prev) =>
          reset ? newProducts : [...prev, ...newProducts]
        );

        // Update pagination
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
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const featuredData = await productService.getFeatured(
        "/api/product/featured"
      );

      setFeaturedProducts(featuredData.data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFetchSingleProduct = useCallback(async (slug: string | null) => {
    try {
      const {data} = await productService.getProduct(
        "/api/product/product",
        slug
      );
      
      setProduct(data.product || null);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        categories,
        products,
        featureProducts,
        product,
        page,
        hasMore,
        isLoading,
        handleFetchCategories,
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
