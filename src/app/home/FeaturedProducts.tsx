import React from "react";
import { useContent } from "@/lib/hooks/content/useContent";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/ui/loading/ProducCardSkeleton";

const FeaturedProducts = () => {
  const { featuredProducts, fetchFeaturedLoading } = useContent();

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
        {fetchFeaturedLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
