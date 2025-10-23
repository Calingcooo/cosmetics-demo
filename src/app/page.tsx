"use client";

import { useEffect } from "react";

import { useProduct } from "./hooks/useProduct";

import HeroCarousel from "@/components/pages/home/HeroCarousel";
import ProductCard from "@/components/product/ProductCard";

export default function Home() {
  const { featureProducts, handleFetchFeaturedProducts } = useProduct();

  useEffect(() => {
    handleFetchFeaturedProducts();
  }, [handleFetchFeaturedProducts]);

  return (
    <div className="flex-1 flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <HeroCarousel />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of luxury cosmetics and skincare
            essentials
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {featureProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Highlights */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Shop by Category
          </h2>
          <p className="text-muted-foreground">Find exactly what you need</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Skincare", icon: "✨", filter: "Skincare" },
            { name: "Makeup", icon: "💄", filter: "Makeup" },
            { name: "Fragrance", icon: "🌸", filter: "Fragrance" },
            { name: "Tools", icon: "🖌️", filter: "Tools" },
          ].map((category) => (
            <a
              key={category.name}
              href={`/products?category=${category.filter}`}
              className="group p-6 rounded-lg hover:shadow-[theme(--card)] transition-all duration-300 text-center"
              style={{ backgroundImage: "var(--gradient-subtle)" }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="font-semibold">{category.name}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="bg-[theme(--muted)]/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              What Our Customers Say
            </h2>
            <p className="text-[theme(--muted-foreground)]">
              Real reviews from real people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                text: "Best lipstick I've ever used! The color stays all day and feels amazing.",
                name: "Jane D.",
              },
              {
                text: "This serum transformed my skin in just 2 weeks. Absolutely love it!",
                name: "Sarah M.",
              },
              {
                text: "Premium quality products at great prices. Will definitely order again!",
                name: "Emily R.",
              },
            ].map((review, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                <div className="text-primary mb-3">★★★★★</div>
                <p className="text-sm mb-4 italic">&quot;{review.text}&quot;</p>
                <p className="font-semibold text-sm">&ndash; {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto px-4 py-16">
        <div
          className="max-w-2xl mx-auto text-center bg-[theme(--gradient-hero)] p-8 rounded-lg"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Stay in the Glow
          </h2>
          <p className="text-[theme(--muted-foreground)] mb-6">
            Subscribe to get exclusive offers and beauty tips delivered to your
            inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className=" bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] file:border-0 file:bg-transparent placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
            />
            <button className="px-6 py-2 bg-[theme(--primary)] text-[theme(--primary-foreground)] rounded-md hover:bg-[theme(--primary)]/90 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="py-16"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-[theme(--primary)]/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🌸</span>
              </div>
              <h3 className="font-semibold">Natural Ingredients</h3>
              <p className="text-sm text-[theme(--muted-foreground)]">
                Pure, cruelty-free formulations
              </p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-[theme(--primary)]/20 flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold">Premium Quality</h3>
              <p className="text-sm text-[theme(--muted-foreground)]">
                Luxury products that deliver results
              </p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-[theme(--primary)]/20 flex items-center justify-center mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-[theme(--muted-foreground)]">
                On orders over $50
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
