import { StaticImageData } from "next/image";

import productLipstick from "../../../public/assets/products/product-lipstick.jpg";
import productSerum from "../../../public/assets/products/product-serum.jpg";
import productPalette from "../../../public/assets/products/product-palette.jpg";
import productCream from "../../../public/assets/products/product-cream.jpg";
import productPerfume from "../../../public/assets/products/product-perfume.jpg";
import productBrushes from "../../../public/assets/products/product-brushes.jpg";

export interface ProductVariationOption {
  name: string;
  color?: string;
}

export interface ProductVariation {
  name: string;
  options: ProductVariationOption[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  images: (string | StaticImageData)[];
  category: string;
  description: string;
  variations?: ProductVariation[];
}

// All possible product images
const allImages: StaticImageData[] = [
  productLipstick,
  productSerum,
  productPalette,
  productCream,
  productPerfume,
  productBrushes,
];

// Shuffle utility
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Get randomized images for each product (like Shopee's gallery)
const getRandomImages = (): StaticImageData[] => {
  const shuffled = shuffleArray(allImages);
  const randomLength = Math.floor(Math.random() * 4) + 3; // 3–6 images per product
  return shuffled.slice(0, randomLength);
};

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Velvet Rose Lipstick",
    price: 28.99,
    images: getRandomImages(),
    category: "Makeup",
    description:
      "A luxurious velvet-finish lipstick with rich color payoff that lasts all day. Infused with moisturizing ingredients for comfortable wear.",
    variations: [
      {
        name: "Shade",
        options: [
          { name: "Rose Pink", color: "#E88FB8" },
          { name: "Deep Rose", color: "#B04E6F" },
          { name: "Coral Rose", color: "#F88379" },
          { name: "Burgundy", color: "#800020" },
        ],
      },
      {
        name: "Finish",
        options: [{ name: "Matte" }, { name: "Satin" }, { name: "Velvet" }],
      },
    ],
  },
  {
    id: 2,
    name: "Radiance Face Serum",
    price: 45.99,
    images: getRandomImages(),
    category: "Skincare",
    description:
      "Transform your skin with our powerful radiance serum. Packed with vitamin C and hyaluronic acid for a glowing complexion.",
  },
  {
    id: 3,
    name: "Nude Dreams Palette",
    price: 52.99,
    images: getRandomImages(),
    category: "Makeup",
    description:
      "The ultimate eyeshadow palette featuring 12 stunning nude shades. From matte to shimmer, create endless looks with this versatile collection.",
    variations: [
      {
        name: "Palette Type",
        options: [
          { name: "Warm Nudes", color: "#C49E85" },
          { name: "Cool Nudes", color: "#B0A8B9" },
          { name: "Rose Nudes", color: "#D8A7A7" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Luxury Moisturizer",
    price: 38.99,
    images: getRandomImages(),
    category: "Skincare",
    description:
      "Indulge your skin with our rich, luxurious moisturizer. Deeply hydrating formula that leaves skin soft, supple, and radiant.",
  },
  {
    id: 5,
    name: "Rose Gold Perfume",
    price: 65.99,
    images: getRandomImages(),
    category: "Fragrance",
    description:
      "An enchanting floral fragrance with notes of rose, jasmine, and sandalwood. Elegant and long-lasting, perfect for any occasion.",
    variations: [
      {
        name: "Size",
        options: [{ name: "30ml" }, { name: "50ml" }, { name: "100ml" }],
      },
    ],
  },
  {
    id: 6,
    name: "Professional Brush Set",
    price: 42.99,
    images: getRandomImages(),
    category: "Tools",
    description:
      "Complete your makeup collection with this professional 10-piece brush set. Soft synthetic bristles for flawless application every time.",
  },
  {
    id: 7,
    name: "Coral Blush Lipstick",
    price: 26.99,
    images: getRandomImages(),
    category: "Makeup",
    description:
      "A beautiful coral shade that complements all skin tones. Creamy formula with a satin finish for natural-looking lips.",
  },
  {
    id: 8,
    name: "Hydrating Night Serum",
    price: 48.99,
    images: getRandomImages(),
    category: "Skincare",
    description:
      "Overnight renewal serum that works while you sleep. Wake up to refreshed, plump, and hydrated skin every morning.",
  },
  {
    id: 9,
    name: "Glow Perfecting Primer",
    price: 34.99,
    images: getRandomImages(),
    category: "Makeup",
    description:
      "Lightweight primer that blurs imperfections and enhances your natural glow. Perfect base for a flawless makeup finish.",
    variations: [
      {
        name: "Finish",
        options: [{ name: "Dewy" }, { name: "Matte" }, { name: "Luminous" }],
      },
    ],
  },
  {
    id: 10,
    name: "Blossom Essence Perfume",
    price: 72.99,
    images: getRandomImages(),
    category: "Fragrance",
    description:
      "A delicate blend of cherry blossom and vanilla musk. A timeless scent that captures the essence of elegance and freshness.",
    variations: [
      {
        name: "Bottle Color",
        options: [
          { name: "Pink Blossom", color: "#FFC0CB" },
          { name: "Soft Gold", color: "#EAD7A1" },
          { name: "Crystal Clear", color: "#F8F8F8" },
        ],
      },
    ],
  },
  {
    id: 11,
    name: "Luxe Foundation",
    price: 44.99,
    images: getRandomImages(),
    category: "Makeup",
    description:
      "Full coverage foundation that feels weightless on the skin. Long-wearing and buildable for a flawless complexion.",
    variations: [
      {
        name: "Shade",
        options: [
          { name: "Ivory", color: "#F8E2C8" },
          { name: "Beige", color: "#E3B778" },
          { name: "Honey", color: "#D6A85D" },
          { name: "Caramel", color: "#B77B48" },
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Gentle Foaming Cleanser",
    price: 27.99,
    images: getRandomImages(),
    category: "Skincare",
    description:
      "A gentle yet effective foaming cleanser that removes dirt, oil, and makeup without stripping skin of its natural moisture.",
  },
  {
    id: 13,
    name: "Soft Glow Highlighter",
    price: 33.49,
    images: getRandomImages(),
    category: "Makeup",
    description:
      "A silky powder highlighter that gives your skin a soft, radiant glow. Blendable formula perfect for any skin tone.",
  },
  {
    id: 14,
    name: "Rejuvenating Eye Cream",
    price: 39.99,
    images: getRandomImages(),
    category: "Skincare",
    description:
      "Nourishing eye cream that reduces puffiness and fine lines. Brightens the under-eye area for a youthful appearance.",
  },
  {
    id: 15,
    name: "Matte Finish Setting Spray",
    price: 29.99,
    images: getRandomImages(),
    category: "Makeup",
    description:
      "Lock in your makeup with a lightweight, oil-control setting spray. Keeps your look fresh and shine-free all day.",
  },
  {
    id: 16,
    name: "Ocean Breeze Perfume",
    price: 69.99,
    images: getRandomImages(),
    category: "Fragrance",
    description:
      "Refreshing aquatic fragrance with notes of sea salt, citrus, and driftwood. Perfect for daytime wear.",
  },
  {
    id: 17,
    name: "Silky Hair Serum",
    price: 32.99,
    images: getRandomImages(),
    category: "Haircare",
    description:
      "Lightweight serum that tames frizz and adds shine. Infused with argan oil for smooth, manageable hair.",
  },
  {
    id: 18,
    name: "Revive Clay Mask",
    price: 36.49,
    images: getRandomImages(),
    category: "Skincare",
    description:
      "Detoxifying clay mask that draws out impurities and tightens pores. Leaves your skin refreshed and rejuvenated.",
  },
  {
    id: 19,
    name: "Essential Eye Brush Set",
    price: 31.99,
    images: getRandomImages(),
    category: "Tools",
    description:
      "A 6-piece eye brush set for perfect blending, shading, and lining. Designed for both beginners and professionals.",
  },
  {
    id: 20,
    name: "Berry Bliss Lipstick",
    price: 27.99,
    images: getRandomImages(),
    category: "Makeup",
    description:
      "Rich berry-toned lipstick that provides intense color in one swipe. Creamy texture that nourishes and hydrates your lips.",
  },
];
