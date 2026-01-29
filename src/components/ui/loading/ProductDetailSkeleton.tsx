import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col container mx-auto px-4 py-8 animate-pulse">
      {/* Back Button placeholder */}
      <div className="mb-6 h-10 w-32 bg-[theme(--muted)] rounded-md"></div>

      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left image skeleton */}
        <div className="w-full h-[400px] bg-[theme(--muted)] rounded-xl"></div>

        {/* Right content placeholder */}
        <div className="space-y-6">
          <div className="h-6 w-28 bg-[theme(--muted)] rounded-md"></div>
          <div className="h-8 w-64 bg-[theme(--muted)] rounded-md"></div>
          <div className="h-10 w-32 bg-[theme(--muted)] rounded-md"></div>
          <div className="h-24 w-full bg-[theme(--muted)] rounded-md"></div>

          {/* Variation placeholders */}
          <div className="space-y-4">
            <div className="h-4 w-20 bg-[theme(--muted)] rounded-md"></div>
            <div className="flex gap-2">
              <div className="h-10 w-16 bg-[theme(--muted)] rounded-md"></div>
              <div className="h-10 w-16 bg-[theme(--muted)] rounded-md"></div>
              <div className="h-10 w-16 bg-[theme(--muted)] rounded-md"></div>
            </div>
          </div>

          {/* Quantity skeleton */}
          <div className="flex items-center gap-4">
            <div className="h-4 w-20 bg-[theme(--muted)] rounded-md"></div>
            <div className="h-10 w-32 bg-[theme(--muted)] rounded-md"></div>
          </div>

          {/* Add to cart button */}
          <div className="h-12 w-40 bg-[theme(--muted)] rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
