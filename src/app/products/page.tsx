"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

import type { Category } from "@/app/types";

import { useProduct } from "@/app/hooks/useProduct";

import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/ui/loading/ProducCardSkeleton";
import CategorySkeleton from "@/components/ui/loading/CategorySkeleton";
import Pagination from "@/components/ui/pagination/Pagination";

const Products = () => {
  const {
    categories,
    products,
    handleFetchCategories,
    handleFetchProducts,
    totalPages,
    page,
    setPage,
    isLoading,
  } = useProduct();

  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🧭 Read initial state from URL
  const initialCategory = searchParams.get("category") || "all";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      setIsCategoryLoading(true);
      await handleFetchCategories();
      setIsCategoryLoading(false);
    };
    loadCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    handleFetchProducts(1, selectedCategory);
  }, [selectedCategory]);

  // Update URL whenever state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (page > 1) params.set("page", String(page));

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedCategory, page]);

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
      <div className="mb-8 flex flex-wrap gap-2 justify-center min-h-[48px]">
        {isCategoryLoading ? (
          // Show category skeletons
          Array.from({ length: 5 }).map((_, i) => <CategorySkeleton key={i} />)
        ) : (
          <>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setPage(1);
              }}
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
                onClick={() => {
                  setSelectedCategory(category.slug);
                  setPage(1);
                }}
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
          </>
        )}
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

      {page === totalPages && !isLoading && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-3 text-[theme(--muted-foreground)] text-sm">
            <span className="h-px w-8 bg-[theme(--primary)]"></span>
            <span className="uppercase tracking-wider">End of Results</span>
            <span className="h-px w-8 bg-[theme(--primary)]"></span>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);
            handleFetchProducts(newPage, selectedCategory, false);
          }}
        />
      )}
    </div>
  );
};

export default Products;
