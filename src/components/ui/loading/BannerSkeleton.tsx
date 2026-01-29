import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg relative bg-(--muted) animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent "></div>
    </div>
  );
};

export default BannerSkeleton;
