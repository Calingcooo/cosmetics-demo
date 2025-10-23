"use client";

import { useEffect, useState, useRef } from "react";
import clsx from "clsx";

import type { Category } from "@/app/types";

import { useProduct } from "@/app/hooks/useProduct";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/ui/loading/ProducCardSkeleton";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {
    categories,
    products,
    handleFetchCategories,
    handleFetchProducts,
    page,
    hasMore,
    isLoading,
  } = useProduct();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    handleFetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    let isFirstLoad = true;
    if (isFirstLoad) {
      handleFetchProducts(1, selectedCategory, true);
      isFirstLoad = false;
    }
  }, [selectedCategory]);

  // Infinite scroll
  useEffect(() => {
    if (page === 1 && products.length === 0) return;
    if (!sentinelRef.current) return;

    // Disconnect previous observer
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          handleFetchProducts(page + 1, selectedCategory);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinelRef.current);
    observerRef.current = observer;

    // Cleanup
    return () => observer.disconnect();
  }, [page, selectedCategory, hasMore, isLoading]);

  return (
    <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
      {/* Header */}
      <div className="text-center mb-12 space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold">Our Products</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our complete collection of luxury cosmetics
        </p>
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory("all")}
          className={clsx(
            "rounded-full capitalize h-10 px-4 py-2 inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors cursor-pointer",
            selectedCategory === "all"
              ? "bg-[theme(--primary)] text-[theme(--primary-foreground)]"
              : "border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)]"
          )}
        >
          all
        </button>
        {categories.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.slug)}
            className={clsx(
              "rounded-full capitalize h-10 px-4 py-2 inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors cursor-pointer",
              selectedCategory === category.slug
                ? "bg-[theme(--primary)] text-[theme(--primary-foreground)]"
                : "border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)]"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {isLoading && products.length === 0
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* Sentinel */}
      <div ref={sentinelRef} className="h-10 w-full"></div>

      {/* Status */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}
        {!hasMore && !isLoading && <p>No more products to load.</p>}
      </div>
    </div>
  );
};

export default Products;
