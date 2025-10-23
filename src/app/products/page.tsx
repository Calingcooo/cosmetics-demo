"use client";

import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";

import { useProduct } from "../hooks/useProduct";

import ProductCard from "@/components/product/ProductCard";

const categories = ["all", "makeup", "skincare", "fragrance", "tools"];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { products, handleFetchProducts, page, hasMore, isLoading } =
    useProduct();

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      handleFetchProducts(page + 1, selectedCategory);
    }
  }, [isLoading, hasMore, page, selectedCategory, handleFetchProducts]);

  // Initial load
  useEffect(() => {
    handleFetchProducts(1, selectedCategory, true);
  }, [selectedCategory, handleFetchProducts]);

  // Scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
      {/* Page Header */}
      <div className="text-center mb-12 space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold">Our Products</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our complete collection of luxury cosmetics
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={clsx(
              "rounded-full capitalize h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-[theme(--background)] transition-colors cursor-pointer",
              selectedCategory === category
                ? "bg-[theme(--primary)] text-[theme(--primary-foreground )]hover:bg-[theme(--primary)]/90"
                : "border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)]"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Loading / End indicator */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        {isLoading && <p>Loading more products...</p>}
        {!hasMore && !isLoading && <p>No more products to load.</p>}
      </div>
    </div>
  );
};

export default Products;
