"use client";

import HeroSection from "./home/HeroSection";
import FeaturedProducts from "./home/FeaturedProducts";
import CategoryHighlights from "./home/CategoryHighlights";
import Testimonials from "./home/Testimonials";
import NewsLetter from "./home/NewsLetter";
import BenefitsSection from "./home/BenefitsSection";

export default function Home() {
  return (
    <div className="flex-1 flex-col">
      <HeroSection />
      <FeaturedProducts />
      <CategoryHighlights />
      <Testimonials />
      <NewsLetter />
      <BenefitsSection />
    </div>
  );
}
