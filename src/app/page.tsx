"use client";

import { useEffect } from "react";
import { useContent } from "@/lib/hooks/content/useContent";
import HeroSection from "./home/HeroSection";
import FeaturedProducts from "./home/FeaturedProducts";
import CategoryHighlights from "./home/CategoryHighlights";
import Testimonials from "./home/Testimonials";
import NewsLetter from "./home/NewsLetter";
import BenefitsSection from "./home/BenefitsSection";

export default function Home() {
  const { featuredProducts, fetchFeaturedproducts, fetchBanners } = useContent();

  useEffect(() => {
    fetchFeaturedproducts();
    fetchBanners()
  }, []);

  return (
    <div className="flex-1 flex-col">
      <HeroSection />
      {featuredProducts.length > 0 && <FeaturedProducts />}
      <CategoryHighlights />
      <Testimonials />
      <NewsLetter />
      <BenefitsSection />
    </div>
  );
}
