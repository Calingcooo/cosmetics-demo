"use client";

import { useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import type { ProductImage } from "@/app/types";

type ProductImagePreviewProps = {
  images: ProductImage[];
  threshold?: number;
};

const ProductPreview: React.FC<ProductImagePreviewProps> = ({
  images,
  threshold = 3,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0].url);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleImages = images.slice(0, threshold);
  const remainingCount = images.length - threshold;

  return (
    <>
      {/* --- Main Image Preview --- */}
      <div
        className="relative w-full aspect-square rounded-xl overflow-hidden border border-[theme(--border)] bg-[theme(--card)] cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={`${selectedImage}`}
          alt="Selected product image"
          loading="lazy"
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* --- Thumbnails --- */}
      <div className="flex justify-center gap-2 mt-3">
        {visibleImages.map((img, idx) => (
          <button
            key={idx}
            className={`relative w-16 h-16 rounded-md border overflow-hidden transition-all ${
              selectedImage === img.url
                ? "ring-2 ring-[theme(--ring)]"
                : "hover:opacity-80"
            }`}
            onClick={() => setSelectedImage(img.url)}
          >
            <Image
              src={`${img.url}`}
              alt={`product-thumb-${idx}`}
              loading="lazy"
              fill
              className="object-cover"
            />
          </button>
        ))}

        {remainingCount > 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative w-16 h-16 rounded-md border bg-black/60 text-white text-sm font-medium flex items-center justify-center"
          >
            +{remainingCount} more
          </button>
        )}
      </div>

      {/* --- Fullscreen Gallery Modal --- */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-8 text-white text-4xl font-light hover:opacity-80 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            {/* Large Main Image */}
            <div
              className="relative w-full max-w-4xl aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
            >
              <Image
                src={`${selectedImage}`}
                alt="Expanded product image"
                loading="lazy"
                fill
                className="object-contain bg-black"
              />
            </div>

            {/* Thumbnail strip below the main image */}
            <div
              className="flex gap-3 mt-6 overflow-x-auto max-w-4xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-md border overflow-hidden transition-all ${
                    selectedImage === img.url
                      ? "ring-2 ring-[theme(--ring)]"
                      : "hover:opacity-80"
                  }`}
                  onClick={() => setSelectedImage(img.url)}
                >
                  <Image
                    src={`${img}`}
                    alt={`thumb-${idx}`}
                    loading="lazy"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ProductPreview;
