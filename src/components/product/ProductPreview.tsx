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
  const [modalSelectedImage, setModalSelectedImage] = useState(images[0].url);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setModalSelectedImage(selectedImage); // sync current preview to modal
    setIsModalOpen(true);
  };

  const visibleImages = images.slice(0, threshold);
  const remainingCount = images.length - threshold;

  return (
    <>
      {/* Main Image */}
      <div
        className="relative w-full aspect-square rounded-xl overflow-hidden border border-[theme(--border)] bg-[theme(--card)] cursor-pointer"
        onClick={openModal}
      >
        <Image
          src={selectedImage}
          alt="Selected product image"
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
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
            <Image src={img.url} fill alt="" className="object-cover" />
          </button>
        ))}

        {remainingCount > 0 && (
          <button
            onClick={openModal}
            className="relative w-16 h-16 rounded-md border bg-black/60 text-white text-sm font-medium flex items-center justify-center"
          >
            +{remainingCount} more
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              className="absolute top-6 right-8 text-white text-4xl font-light hover:opacity-80 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            {/* Modal Main Image */}
            <div
              className="relative w-full max-w-4xl aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={modalSelectedImage}
                alt="Modal product image"
                fill
                className="object-contain bg-black"
              />
            </div>

            {/* Modal Thumbnails */}
            <div
              className="flex gap-3 mt-6 overflow-x-auto max-w-4xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-md border overflow-hidden transition-all ${
                    modalSelectedImage === img.url
                      ? "ring-2 ring-[theme(--ring)]"
                      : "hover:opacity-80"
                  }`}
                  onClick={() => setModalSelectedImage(img.url)}
                >
                  <Image src={img.url} alt="" fill className="object-cover" />
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
