"use client";

import React, { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";

import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/ui/loading/ProducCardSkeleton";

const FeaturedProducts = () => {
  const { isLoading, featureProducts, handleFetchFeaturedProducts } =
    useProduct();

  useEffect(() => {
    handleFetchFeaturedProducts();
  }, [handleFetchFeaturedProducts]);
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our handpicked selection of luxury cosmetics and skincare
          essentials
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : featureProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
