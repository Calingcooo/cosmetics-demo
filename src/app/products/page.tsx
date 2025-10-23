"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { useProduct } from "../hooks/useProduct";

import ProductCard from "@/components/product/ProductCard";

const categories = ["All", "Makeup", "Skincare", "Fragrance", "Tools"];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { products, handleFetchProducts } = useProduct();

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  
  useEffect(() => {
    handleFetchProducts();
  }, [products, handleFetchProducts]);

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
              "rounded-full h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-[theme(--background)] transition-colors cursor-pointer",
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
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
