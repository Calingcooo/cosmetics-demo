import React from "react";

const BenefitsSection = () => {
  return (
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
  );
};

export default BenefitsSection;
